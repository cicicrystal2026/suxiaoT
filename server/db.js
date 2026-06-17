// server/db.js — SQLite 数据层：建表 + 种子数据
// 把原型里写死的假数据迁进数据库；知识库条目带 audit_status，只有「已通过」才会喂给 AI。
import Database from 'better-sqlite3';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'data.db'));
db.pragma('journal_mode = WAL');

db.exec(`
CREATE TABLE IF NOT EXISTS kb (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  source TEXT,
  audit_status TEXT NOT NULL DEFAULT '待审核',  -- 待审核 / 已通过 / 已驳回
  updated_at TEXT NOT NULL DEFAULT (date('now'))
);
CREATE TABLE IF NOT EXISTS coupons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL, desc TEXT, value TEXT, unit TEXT, type TEXT, sub TEXT,
  total INTEGER DEFAULT 0, claimed INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS points_goods (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL, sub TEXT, points INTEGER, tab TEXT
);
`);

// ---- 种子：仅首次（空表）写入 ----
const seedKB = db.prepare(`INSERT INTO kb (category,title,body,source,audit_status,updated_at) VALUES (?,?,?,?,?,?)`);
if (db.prepare(`SELECT COUNT(*) n FROM kb`).get().n === 0) {
  const rows = [
    ['运营数据', '线路与运营时间', '苏州高新有轨电车目前运营 1 号线与 2 号线。1 号线主要方向为「往西洋山」与「往龙康路」。日常运营时间约为 06:30–22:00，末班车约 22:00。', '我方建设', '已通过', '2026-06-12'],
    ['运营数据', '票价说明', '有轨电车按里程计价，单程约 ¥2 起、全程封顶约 ¥4。可使用苏州交通卡、手机扫码乘车。', '我方建设', '已通过', '2026-06-12'],
    ['文旅内容', '樱花专列', '春季樱花专列由龙康路站开往秀岸站，沿线约 6.5km 樱花长廊，途经 6 站，首班约 7:30，高峰每 7.5 分钟一班。', '我方建设', '已通过', '2026-06-11'],
    ['文旅内容', '秀岸站周边', '秀岸站下车沿樱花大道步行约 500m 即到太湖湿地公园；萌宠乐园距站约 650m，适合亲子。', '我方建设', '已通过', '2026-06-12'],
    ['客服FAQ', '换乘地铁', '在狮子山站下车后步行约 300m 可换乘地铁 1 号线，跟随「换乘地铁」指示牌即可。', '双轨建库', '已通过', '2026-06-11'],
    ['客服FAQ', '宠物乘车', '导盲犬可随行；其他宠物需装入符合规定的笼具方可乘车。', '双轨建库', '已通过', '2026-06-09'],
    ['客服FAQ', '电子发票', '可在乘车后通过官方小程序「我的行程」申请开具电子发票。', '双轨建库', '已通过', '2026-06-09'],
    ['运营数据', '站台失物招领联系方式', '失物招领请联系站台工作人员或拨打客服热线（内容待客户提供核实）。', '客户提供', '待审核', '2026-06-15'],
  ];
  const tx = db.transaction(() => rows.forEach(r => seedKB.run(...r)));
  tx();
}

const seedCoupon = db.prepare(`INSERT INTO coupons (title,desc,value,unit,type,sub,total,claimed) VALUES (?,?,?,?,?,?,?,?)`);
if (db.prepare(`SELECT COUNT(*) n FROM coupons`).get().n === 0) {
  [
    ['湿地公园咖啡', '满30减10 · 当日电车票核销', '10', '¥', '商户券', '剩 320 张', 5000, 4680],
    ['太湖湿地公园门票', '景区门票 · 立减优惠', '8.5', '折', '票务券', '限本周末', 3000, 2140],
    ['苏小T文创周边', '积分商城通用 · 满100可用', '20', '¥', '文创券', '剩 88 张', 2000, 1912],
    ['樱花季旅拍', 'AI合影海报高清版 · 免费', 'FREE', '', '活动券', '人人可领', 999999, 6204],
  ].forEach(r => seedCoupon.run(...r));
}

const seedGoods = db.prepare(`INSERT INTO points_goods (name,sub,points,tab) VALUES (?,?,?,?)`);
if (db.prepare(`SELECT COUNT(*) n FROM points_goods`).get().n === 0) {
  [
    ['苏小T徽章', '限量金属徽章', 800, '文创'],
    ['电车次卡', '10次乘车券', 1200, '票卡'],
    ['樱花帆布袋', '樱花季文创', 600, '文创'],
    ['湿地门票', '太湖湿地公园', 1500, '票卡'],
  ].forEach(r => seedGoods.run(...r));
}

export default db;
