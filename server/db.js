// server/db.js — SQLite 数据层：建表 + 种子数据 + 轻量迁移
// 把原型里写死的后台假数据迁进数据库；知识库 audit_status 只有「已通过」会喂给 AI。
import Database from 'better-sqlite3';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { hashPassword } from './auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'data.db'));
db.pragma('journal_mode = WAL');

db.exec(`
CREATE TABLE IF NOT EXISTS kb (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL, title TEXT NOT NULL, body TEXT NOT NULL,
  source TEXT, audit_status TEXT NOT NULL DEFAULT '待审核',
  updated_at TEXT NOT NULL DEFAULT (date('now'))
);
CREATE TABLE IF NOT EXISTS coupons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT, title TEXT NOT NULL, desc TEXT, value TEXT, unit TEXT, type TEXT,
  merchant TEXT, sub TEXT, total INTEGER DEFAULT 0, claimed INTEGER DEFAULT 0,
  status TEXT DEFAULT '进行中'
);
CREATE TABLE IF NOT EXISTS points_goods (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL, sub TEXT, points INTEGER, tab TEXT
);
CREATE TABLE IF NOT EXISTS activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL, season TEXT, type TEXT, status TEXT DEFAULT '草稿',
  date TEXT, joined TEXT, badge TEXT
);
CREATE TABLE IF NOT EXISTS pushes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL, type TEXT, audience TEXT, status TEXT DEFAULT '草稿',
  reach TEXT, ctr TEXT, send_at TEXT
);
CREATE TABLE IF NOT EXISTS routes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL, theme TEXT, stations TEXT, stops INTEGER,
  price TEXT, status TEXT DEFAULT '待上架', trips TEXT
);
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL, phone TEXT, role TEXT, persona TEXT,
  points INTEGER DEFAULT 0, coupons INTEGER DEFAULT 0, trips INTEGER DEFAULT 0,
  joined TEXT, realname TEXT DEFAULT '未实名'
);
CREATE TABLE IF NOT EXISTS roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL, members INTEGER DEFAULT 0, color TEXT, color_bg TEXT,
  descr TEXT, perms TEXT, access TEXT
);
CREATE TABLE IF NOT EXISTS hot_questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  q TEXT NOT NULL, hits INTEGER, coverage TEXT
);
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL, name TEXT, pass TEXT NOT NULL, role_name TEXT
);
CREATE TABLE IF NOT EXISTS accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT UNIQUE NOT NULL, name TEXT, realname TEXT DEFAULT '未实名',
  points INTEGER DEFAULT 0, created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS user_coupons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER NOT NULL, coupon_id INTEGER NOT NULL,
  used INTEGER DEFAULT 0, claimed_at TEXT DEFAULT (datetime('now')),
  UNIQUE(account_id, coupon_id)
);
CREATE TABLE IF NOT EXISTS redemptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER NOT NULL, goods_id INTEGER, goods_name TEXT,
  points_spent INTEGER, created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS stamps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER NOT NULL, station TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(account_id, station)
);
`);

// 轻量迁移：给已存在的旧表补列（老版本 coupons 没有 code/merchant/status）
function ensureCol(table, col, type, def) {
  const cols = db.prepare(`PRAGMA table_info(${table})`).all().map(c => c.name);
  if (!cols.includes(col)) db.exec(`ALTER TABLE ${table} ADD COLUMN ${col} ${type} DEFAULT ${def}`);
}
ensureCol('coupons', 'code', 'TEXT', "''");
ensureCol('coupons', 'merchant', 'TEXT', "''");
ensureCol('coupons', 'status', 'TEXT', "'进行中'");

// 旧版 coupons 没有 code（升级时检测到则清空，下面的种子会重新灌入完整数据）
{
  const total = db.prepare(`SELECT COUNT(*) n FROM coupons`).get().n;
  const withCode = db.prepare(`SELECT COUNT(*) n FROM coupons WHERE code IS NOT NULL AND code<>''`).get().n;
  if (total > 0 && withCode === 0) db.exec(`DELETE FROM coupons`);
}

const seedIfEmpty = (table, cols, rows) => {
  if (db.prepare(`SELECT COUNT(*) n FROM ${table}`).get().n > 0) return;
  const ph = cols.map(() => '?').join(',');
  const stmt = db.prepare(`INSERT INTO ${table} (${cols.join(',')}) VALUES (${ph})`);
  db.transaction(() => rows.forEach(r => stmt.run(...r)))();
};

seedIfEmpty('kb', ['category', 'title', 'body', 'source', 'audit_status', 'updated_at'], [
  ['运营数据', '线路与运营时间', '苏州高新有轨电车目前运营 1 号线与 2 号线。1 号线主要方向为「往西洋山」与「往龙康路」。日常运营时间约为 06:30–22:00，末班车约 22:00。', '我方建设', '已通过', '2026-06-12'],
  ['运营数据', '票价说明', '有轨电车按里程计价，单程约 ¥2 起、全程封顶约 ¥4。可使用苏州交通卡、手机扫码乘车。', '我方建设', '已通过', '2026-06-12'],
  ['文旅内容', '樱花专列', '春季樱花专列由龙康路站开往秀岸站，沿线约 6.5km 樱花长廊，途经 6 站，首班约 7:30，高峰每 7.5 分钟一班。', '我方建设', '已通过', '2026-06-11'],
  ['文旅内容', '秀岸站周边', '秀岸站下车沿樱花大道步行约 500m 即到太湖湿地公园；萌宠乐园距站约 650m，适合亲子。', '我方建设', '已通过', '2026-06-12'],
  ['客服FAQ', '换乘地铁', '在狮子山站下车后步行约 300m 可换乘地铁 1 号线，跟随「换乘地铁」指示牌即可。', '双轨建库', '已通过', '2026-06-11'],
  ['客服FAQ', '宠物乘车', '导盲犬可随行；其他宠物需装入符合规定的笼具方可乘车。', '双轨建库', '已通过', '2026-06-09'],
  ['客服FAQ', '电子发票', '可在乘车后通过官方小程序「我的行程」申请开具电子发票。', '双轨建库', '已通过', '2026-06-09'],
  ['运营数据', '站台失物招领联系方式', '失物招领请联系站台工作人员或拨打客服热线（内容待客户提供核实）。', '客户提供', '待审核', '2026-06-15'],
]);

seedIfEmpty('coupons', ['code', 'title', 'desc', 'value', 'unit', 'type', 'merchant', 'sub', 'total', 'claimed', 'status'], [
  ['CPN-2026-0312', '湿地公园咖啡', '满30减10 · 当日电车票核销', '10', '¥', '满减券', '湿地咖啡馆', '剩 320 张', 5000, 4680, '进行中'],
  ['CPN-2026-0298', '太湖湿地公园门票', '景区门票 · 8.5折', '8.5', '折', '折扣券', '太湖湿地公园', '限本周末', 3000, 2140, '进行中'],
  ['CPN-2026-0305', '苏小T文创周边', '积分商城通用 · 满100可用', '20', '¥', '文创券', '官方商城', '剩 88 张', 2000, 1912, '进行中'],
  ['CPN-2026-0277', '萌宠乐园亲子套票', '亲子套票 · 立减', '58', '¥', '套票券', '萌宠乐园', '已抢光', 1500, 1500, '已抢光'],
  ['CPN-2026-0260', '樱花季旅拍', 'AI合影海报高清版 · 免费', 'FREE', '', '活动券', '官方', '人人可领', 999999, 6204, '进行中'],
  ['CPN-2026-0231', '贡山岛骑行立减15', '骑行立减 · 限景区', '15', '¥', '满减券', '贡山岛景区', '剩 680 张', 800, 120, '已暂停'],
]);

seedIfEmpty('points_goods', ['name', 'sub', 'points', 'tab'], [
  ['苏小T徽章', '限量金属徽章', 800, '文创'],
  ['电车次卡', '10次乘车券', 1200, '票卡'],
  ['樱花帆布袋', '樱花季文创', 600, '文创'],
  ['湿地门票', '太湖湿地公园', 1500, '票卡'],
]);

seedIfEmpty('activities', ['title', 'season', 'type', 'status', 'date', 'joined', 'badge'], [
  ['樱花季 · 集章打卡赢徽章', '春樱', '集章活动', '进行中', '03.15 – 04.15', '8,420', '🌸'],
  ['AI合影旅拍 · 樱花限定模板', '春樱', 'AIGC活动', '进行中', '03.01 – 04.30', '3,156', '📸'],
  ['太湖亲子游 · 套票立减', '通用', '券活动', '进行中', '长期', '1,902', '🎟️'],
  ['夏荷季 · 湿地骑行打卡', '夏荷', '集章活动', '待发布', '06.20 – 08.31', '—', '🪷'],
  ['秋桂季 · 园林文化专线', '秋桂', '专线活动', '草稿', '未设置', '—', '🍂'],
]);

seedIfEmpty('pushes', ['title', 'type', 'audience', 'status', 'reach', 'ctr', 'send_at'], [
  ['樱花专列今日发车提醒', '出行提醒', '通勤族 · 订阅用户', '已发送', '12,840', '38.2%', '06-15 07:00'],
  ['太湖亲子游 · 周末套票上新', '活动推广', '亲子/家庭游客', '已发送', '8,210', '24.6%', '06-14 10:00'],
  ['夏荷季集章活动预告', '活动推广', '全部会员', '待发送', '—', '—', '06-20 09:00'],
  ['苏州话语音导览上线', '功能通知', '银发用户', '草稿', '—', '—', '未设置'],
  ['末班车时刻调整通知', '出行提醒', '一号线订阅', '已发送', '5,602', '41.0%', '06-12 21:30'],
]);

seedIfEmpty('routes', ['name', 'theme', 'stations', 'stops', 'price', 'status', 'trips'], [
  ['樱花专列', '春樱', '龙康路 · 文昌路 · 秀岸 · 何山桥 · 长江路 · 西洋山', 6, '¥4 起', '上架', '9,284'],
  ['太湖亲子线', '通用', '狮子山 · 龙康路 · 秀岸 · 太湖湿地', 4, '¥40 套票', '上架', '3,150'],
  ['沿线美食探店', '通用', '狮子山 · 文昌路 · 何山桥 · 长江路 · 西洋山', 5, '含5张券', '上架', '1,860'],
  ['园林文化线', '秋桂', '狮子山 · 何山桥 · 长江路', 3, '¥80 联票', '上架', '920'],
  ['夏荷骑行线', '夏荷', '秀岸 · 太湖湿地 · 贡山岛', 3, '¥30 起', '待上架', '—'],
]);

seedIfEmpty('users', ['name', 'phone', 'role', 'persona', 'points', 'coupons', 'trips', 'joined', 'realname'], [
  ['苏游游', '138****8866', '会员', '通勤族', 1280, 3, 86, '2026-06-15', '已实名'],
  ['Lina_W', '159****2031', '会员', '亲子游客', 2460, 5, 42, '2026-06-15', '已实名'],
  ['游客_8f2a', '—', '游客', '—', 0, 0, 2, '2026-06-14', '未实名'],
  ['老周', '136****7745', '会员', '银发用户', 620, 1, 158, '2026-06-13', '已实名'],
  ['苏州小赵', '187****9920', '会员', '青年探店', 3150, 8, 64, '2026-06-13', '已实名'],
  ['游客_3c91', '—', '游客', '—', 0, 0, 1, '2026-06-12', '未实名'],
  ['Amy陈', '152****4408', '会员', '外地游客', 880, 2, 12, '2026-06-11', '已实名'],
]);

seedIfEmpty('roles', ['name', 'members', 'color', 'color_bg', 'descr', 'perms', 'access'], [
  ['超级管理员', 2, 'var(--sakura-deep)', 'var(--sakura-soft)', '全部模块 + 系统设置 + 权限分配', JSON.stringify(['数据看板', '知识库', '活动', '券码', '推送', '专线', '用户', '权限']), JSON.stringify([1, 1, 1, 1, 1, 1, 1, 1])],
  ['内容运营', 5, '#5C7E2A', 'var(--leaf-soft)', '知识库 / 活动 / 专线 内容配置与审核', JSON.stringify(['数据看板', '知识库', '活动', '专线']), JSON.stringify([1, 2, 1, 0, 0, 1, 0, 0])],
  ['商业运营', 3, 'var(--blue)', 'var(--blue-soft)', '券码 / 推送 / 商户与转化运营', JSON.stringify(['数据看板', '券码', '推送', '用户']), JSON.stringify([1, 0, 0, 1, 1, 0, 2, 0])],
  ['客服专员', 8, '#A9772A', 'var(--sun-soft)', '查看会话 / 转人工处理 / FAQ反馈', JSON.stringify(['数据看板', '知识库']), JSON.stringify([1, 3, 0, 0, 0, 0, 0, 0])],
]);

seedIfEmpty('hot_questions', ['q', 'hits', 'coverage'], [
  ['樱花专列几点有？', 312, '已覆盖'],
  ['末班车时间', 268, '已覆盖'],
  ['到太湖怎么坐', 201, '已覆盖'],
  ['站台失物招领', 142, '转人工'],
  ['宠物能否乘车', 98, '待补充'],
]);

// 后台默认管理员（开发账号；生产请改密码）：operator@sztram / sztram2026
if (db.prepare(`SELECT COUNT(*) n FROM admins`).get().n === 0) {
  db.prepare(`INSERT INTO admins (username,name,pass,role_name) VALUES (?,?,?,?)`)
    .run('operator@sztram', '运营管理员', hashPassword('sztram2026'), '超级管理员');
}

export default db;
