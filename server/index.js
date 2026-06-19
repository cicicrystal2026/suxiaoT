// server/index.js — Express 后端：AI 问答代理 + 业务数据接口 +（生产环境）托管前端
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { existsSync } from 'node:fs';
import db from './db.js';
import { streamCompletion, hasProvider, MODEL, PROVIDER_NAME } from './llm.js';
import { signToken, verifyToken, verifyPassword, requireAuth, genCode, checkCode } from './auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// ---- 健康检查 ----
app.get('/api/health', (req, res) => {
  res.json({ ok: true, provider: PROVIDER_NAME, model: MODEL, hasKey: hasProvider });
});

// ---- 认证 ----
// 后台登录：账号 + 密码
app.post('/api/auth/admin/login', (req, res) => {
  const { username, password } = req.body || {};
  const admin = db.prepare(`SELECT * FROM admins WHERE username=?`).get(username);
  if (!admin || !verifyPassword(password || '', admin.pass)) return res.status(401).json({ error: '账号或密码错误' });
  const token = signToken({ sub: admin.id, role: 'admin', name: admin.name, username: admin.username });
  res.json({ token, user: { id: admin.id, name: admin.name, username: admin.username, role_name: admin.role_name, role: 'admin' } });
});

// 手机端：发送验证码（开发模式直接返回 devCode；生产换真短信）
app.post('/api/auth/send-code', (req, res) => {
  const { phone } = req.body || {};
  if (!/^1\d{10}$/.test(phone || '')) return res.status(400).json({ error: '请输入正确的手机号' });
  const code = genCode(phone);
  res.json({ ok: true, devCode: code, note: '开发模式：验证码直接返回，生产环境改为短信下发' });
});

// 手机端：验证码登录 / 实名（带 name 即视为实名）
app.post('/api/auth/login', (req, res) => {
  const { phone, code, name } = req.body || {};
  if (!checkCode(phone, code)) return res.status(401).json({ error: '验证码错误或已过期' });
  let acc = db.prepare(`SELECT * FROM accounts WHERE phone=?`).get(phone);
  if (!acc) {
    const info = db.prepare(`INSERT INTO accounts (phone,name,realname,points) VALUES (?,?,?,?)`)
      .run(phone, name || '苏州出行用户', name ? '已实名' : '未实名', 1280); // 新会员赠送 1280 积分
    acc = db.prepare(`SELECT * FROM accounts WHERE id=?`).get(info.lastInsertRowid);
  } else if (name) {
    db.prepare(`UPDATE accounts SET name=?, realname='已实名' WHERE id=?`).run(name, acc.id);
    acc = db.prepare(`SELECT * FROM accounts WHERE id=?`).get(acc.id);
  }
  const token = signToken({ sub: acc.id, role: 'member', name: acc.name });
  res.json({ token, user: { ...acc, role: 'member' } });
});

// 当前登录者
app.get('/api/auth/me', requireAuth(), (req, res) => {
  if (req.user.role === 'admin') {
    const a = db.prepare(`SELECT id,username,name,role_name FROM admins WHERE id=?`).get(req.user.sub);
    return res.json(a ? { ...a, role: 'admin' } : null);
  }
  const acc = db.prepare(`SELECT * FROM accounts WHERE id=?`).get(req.user.sub);
  res.json(acc ? { ...acc, role: 'member' } : null);
});

// ---- 会员业务写操作（需登录）----
const memberAuth = requireAuth('member');

// 我的汇总（积分 / 持券 / 集章 / 兑换）
app.get('/api/me/summary', memberAuth, (req, res) => {
  const uid = req.user.sub;
  const acc = db.prepare(`SELECT * FROM accounts WHERE id=?`).get(uid);
  const coupons = db.prepare(`SELECT COUNT(*) n FROM user_coupons WHERE account_id=?`).get(uid).n;
  const stamps = db.prepare(`SELECT COUNT(*) n FROM stamps WHERE account_id=?`).get(uid).n;
  const redemptions = db.prepare(`SELECT COUNT(*) n FROM redemptions WHERE account_id=?`).get(uid).n;
  res.json({ points: acc?.points ?? 0, coupons, stamps, redemptions, name: acc?.name, realname: acc?.realname });
});

// 领券
app.post('/api/coupons/:id/claim', memberAuth, (req, res) => {
  const uid = req.user.sub;
  const c = db.prepare(`SELECT * FROM coupons WHERE id=?`).get(req.params.id);
  if (!c) return res.status(404).json({ error: '券不存在' });
  if (c.status !== '进行中') return res.status(400).json({ error: '该券暂不可领' });
  const unlimited = c.total >= 999999;
  if (!unlimited && c.total - c.claimed <= 0) return res.status(400).json({ error: '已被抢光' });
  const dup = db.prepare(`SELECT 1 FROM user_coupons WHERE account_id=? AND coupon_id=?`).get(uid, c.id);
  if (dup) return res.status(400).json({ error: '你已领取过该券' });
  db.prepare(`INSERT INTO user_coupons (account_id, coupon_id) VALUES (?,?)`).run(uid, c.id);
  db.prepare(`UPDATE coupons SET claimed=claimed+1 WHERE id=?`).run(c.id);
  res.json({ ok: true, coupon: db.prepare(`SELECT * FROM coupons WHERE id=?`).get(c.id) });
});

// 我的券包
app.get('/api/me/coupons', memberAuth, (req, res) => {
  const rows = db.prepare(`SELECT c.*, uc.used, uc.claimed_at FROM user_coupons uc JOIN coupons c ON c.id=uc.coupon_id WHERE uc.account_id=? ORDER BY uc.claimed_at DESC`).all(req.user.sub);
  res.json(rows);
});

// 兑换积分商品
app.post('/api/points/redeem/:goodsId', memberAuth, (req, res) => {
  const uid = req.user.sub;
  const g = db.prepare(`SELECT * FROM points_goods WHERE id=?`).get(req.params.goodsId);
  if (!g) return res.status(404).json({ error: '商品不存在' });
  const acc = db.prepare(`SELECT * FROM accounts WHERE id=?`).get(uid);
  if (acc.points < g.points) return res.status(400).json({ error: `积分不足，还差 ${g.points - acc.points} 分` });
  db.prepare(`UPDATE accounts SET points=points-? WHERE id=?`).run(g.points, uid);
  db.prepare(`INSERT INTO redemptions (account_id, goods_id, goods_name, points_spent) VALUES (?,?,?,?)`).run(uid, g.id, g.name, g.points);
  res.json({ ok: true, balance: acc.points - g.points, goods: g.name });
});

// 集章打卡（同一站点幂等）
app.post('/api/stamps/:station/collect', memberAuth, (req, res) => {
  const uid = req.user.sub;
  const station = decodeURIComponent(req.params.station);
  const exists = db.prepare(`SELECT 1 FROM stamps WHERE account_id=? AND station=?`).get(uid, station);
  let awarded = 0;
  if (!exists) {
    db.prepare(`INSERT INTO stamps (account_id, station) VALUES (?,?)`).run(uid, station);
    db.prepare(`UPDATE accounts SET points=points+10 WHERE id=?`).run(uid); // 集章奖励 +10
    awarded = 10;
  }
  const count = db.prepare(`SELECT COUNT(*) n FROM stamps WHERE account_id=?`).get(uid).n;
  res.json({ ok: true, count, awarded, already: !!exists });
});

// 我的集章
app.get('/api/me/stamps', memberAuth, (req, res) => {
  const rows = db.prepare(`SELECT station, created_at FROM stamps WHERE account_id=? ORDER BY created_at`).all(req.user.sub);
  res.json({ count: rows.length, stations: rows.map(r => r.station) });
});

// ---- 业务数据（读）----
app.get('/api/coupons', (req, res) => res.json(db.prepare(`SELECT * FROM coupons`).all()));
app.get('/api/points/goods', (req, res) => {
  const { tab } = req.query;
  const rows = tab ? db.prepare(`SELECT * FROM points_goods WHERE tab=?`).all(tab)
                   : db.prepare(`SELECT * FROM points_goods`).all();
  res.json(rows);
});
app.get('/api/kb', (req, res) => {
  const { status } = req.query;
  const rows = status ? db.prepare(`SELECT * FROM kb WHERE audit_status=? ORDER BY updated_at DESC`).all(status)
                      : db.prepare(`SELECT * FROM kb ORDER BY updated_at DESC`).all();
  res.json(rows);
});
// 后台审核：改变知识条目状态（会立即影响 AI 的可用依据）
app.patch('/api/kb/:id', (req, res) => {
  const { audit_status } = req.body || {};
  if (!['待审核', '已通过', '已驳回'].includes(audit_status)) return res.status(400).json({ error: 'bad status' });
  db.prepare(`UPDATE kb SET audit_status=?, updated_at=date('now') WHERE id=?`).run(audit_status, req.params.id);
  res.json(db.prepare(`SELECT * FROM kb WHERE id=?`).get(req.params.id));
});

// 通用：按表名做「改状态」更新（白名单防注入）
const STATUS_TABLES = { coupons: 'status', activities: 'status', routes: 'status' };
function statusPatchHandler(table) {
  return (req, res) => {
    const col = STATUS_TABLES[table];
    const status = req.body?.status;
    if (!status) return res.status(400).json({ error: 'status required' });
    db.prepare(`UPDATE ${table} SET ${col}=? WHERE id=?`).run(status, req.params.id);
    res.json(db.prepare(`SELECT * FROM ${table} WHERE id=?`).get(req.params.id));
  };
}

// 各后台模块（读）
app.get('/api/activities', (req, res) => res.json(db.prepare(`SELECT * FROM activities`).all()));
app.patch('/api/activities/:id', statusPatchHandler('activities'));
app.get('/api/pushes', (req, res) => res.json(db.prepare(`SELECT * FROM pushes`).all()));
app.get('/api/routes', (req, res) => res.json(db.prepare(`SELECT * FROM routes`).all()));
app.patch('/api/routes/:id', statusPatchHandler('routes'));
app.patch('/api/coupons/:id', statusPatchHandler('coupons'));
app.get('/api/users', (req, res) => res.json(db.prepare(`SELECT * FROM users`).all()));
app.get('/api/roles', (req, res) => res.json(db.prepare(`SELECT * FROM roles`).all().map(r => ({
  ...r, perms: JSON.parse(r.perms || '[]'), access: JSON.parse(r.access || '[]'),
}))));

// ---- 通用增删改（POST 新建 / PUT 编辑 / DELETE 删除），仅管理员，字段白名单防注入 ----
const RESOURCES = {
  kb: { table: 'kb', fields: ['category', 'title', 'body', 'source', 'audit_status'], touch: 'updated_at' },
  coupons: { table: 'coupons', fields: ['code', 'title', 'desc', 'value', 'unit', 'type', 'merchant', 'sub', 'total', 'claimed', 'status'] },
  activities: { table: 'activities', fields: ['title', 'season', 'type', 'status', 'date', 'joined', 'badge'] },
  routes: { table: 'routes', fields: ['name', 'theme', 'stations', 'stops', 'price', 'status', 'trips'] },
  pushes: { table: 'pushes', fields: ['title', 'type', 'audience', 'status', 'reach', 'ctr', 'send_at'] },
};
const pick = (fields, body) => Object.fromEntries(fields.filter(f => body[f] !== undefined).map(f => [f, body[f]]));
const touch = (cfg, id) => { if (cfg.touch) db.prepare(`UPDATE ${cfg.table} SET ${cfg.touch}=date('now') WHERE id=?`).run(id); };

for (const [res, cfg] of Object.entries(RESOURCES)) {
  app.post(`/api/${res}`, requireAuth('admin'), (req, resp) => {
    const data = pick(cfg.fields, req.body || {});
    const cols = Object.keys(data);
    if (!cols.length) return resp.status(400).json({ error: '缺少字段' });
    const info = db.prepare(`INSERT INTO ${cfg.table} (${cols.join(',')}) VALUES (${cols.map(() => '?').join(',')})`).run(...cols.map(c => data[c]));
    touch(cfg, info.lastInsertRowid);
    resp.json(db.prepare(`SELECT * FROM ${cfg.table} WHERE id=?`).get(info.lastInsertRowid));
  });
  app.put(`/api/${res}/:id`, requireAuth('admin'), (req, resp) => {
    const data = pick(cfg.fields, req.body || {});
    const cols = Object.keys(data);
    if (cols.length) db.prepare(`UPDATE ${cfg.table} SET ${cols.map(c => c + '=?').join(',')} WHERE id=?`).run(...cols.map(c => data[c]), req.params.id);
    touch(cfg, req.params.id);
    resp.json(db.prepare(`SELECT * FROM ${cfg.table} WHERE id=?`).get(req.params.id));
  });
  app.delete(`/api/${res}/:id`, requireAuth('admin'), (req, resp) => {
    db.prepare(`DELETE FROM ${cfg.table} WHERE id=?`).run(req.params.id);
    resp.json({ ok: true });
  });
}

// 数据看板：部分指标实时从库里算（如知识库待审数），其余为运营指标
app.get('/api/dashboard', (req, res) => {
  const kbPending = db.prepare(`SELECT COUNT(*) n FROM kb WHERE audit_status='待审核'`).get().n;
  const activeActs = db.prepare(`SELECT COUNT(*) n FROM activities WHERE status='进行中'`).get().n;
  const totalUsers = db.prepare(`SELECT COUNT(*) n FROM users`).get().n;
  res.json({
    kpis: [
      { label: '今日咨询量', value: '1,284', unit: '次', delta: '12.4%', up: true, icon: 'headset', color: 'var(--sakura-deep)', bg: 'var(--sakura-soft)' },
      { label: '问答自主解决率', value: '87.6', unit: '%', delta: '2.1%', up: true, icon: 'check', color: '#5C7E2A', bg: 'var(--leaf-soft)' },
      { label: '进行中活动', value: String(activeActs), unit: '个', icon: 'route', color: 'var(--blue)', bg: 'var(--blue-soft)' },
      { label: '券核销 GMV', value: '¥38.2k', delta: '1.2%', up: false, icon: 'ticket', color: '#A9772A', bg: 'var(--sun-soft)' },
    ],
    intents: [['出行查询', '46%', 46, 'var(--sakura)'], ['文旅问答', '28%', 28, 'var(--leaf)'], ['客服工单', '18%', 18, 'var(--blue)'], ['转人工', '8%', 8, 'var(--sun)']],
    trend: [42, 58, 51, 73, 66, 88, 95],
    hotQuestions: db.prepare(`SELECT q, hits, coverage FROM hot_questions ORDER BY hits DESC`).all(),
    kbPending, totalUsers,
  });
});

// ---- AI 问答：流式（SSE）----
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) return res.status(400).json({ error: 'messages required' });
  if (!hasProvider) return res.status(503).json({ error: 'no_api_key', message: '后端未配置 LLM 密钥（DEEPSEEK_API_KEY / OPENAI_API_KEY / ANTHROPIC_API_KEY 任一）' });

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  const send = (event, data) => res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);

  try {
    await streamCompletion({ messages, onText: (t) => send('delta', { text: t }) });
    send('done', {});
    res.end();
  } catch (err) {
    console.error('chat error:', err?.message);
    send('error', { message: err?.message || 'AI 服务出错，请稍后再试或转人工客服' });
    res.end();
  }
});

// ---- 生产环境：托管前端构建产物 ----
const dist = join(__dirname, '..', 'dist');
if (existsSync(dist)) {
  app.use(express.static(dist));
  app.get(/.*/, (req, res) => res.sendFile(join(dist, 'index.html')));
}

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => console.log(`✅ 苏小T 后端运行中  http://localhost:${PORT}  (provider: ${PROVIDER_NAME}, model: ${MODEL}, key: ${hasProvider ? '已配置' : '未配置'})`));
