// server/index.js — Express 后端：AI 问答代理 + 业务数据接口 +（生产环境）托管前端
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { existsSync } from 'node:fs';
import db from './db.js';
import { streamCompletion, hasProvider, MODEL, PROVIDER_NAME } from './llm.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// ---- 健康检查 ----
app.get('/api/health', (req, res) => {
  res.json({ ok: true, provider: PROVIDER_NAME, model: MODEL, hasKey: hasProvider });
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
