// server/auth.js — 轻量认证：HMAC 签名 token + scrypt 密码哈希 + 手机验证码（无第三方依赖）
import crypto from 'node:crypto';

const SECRET = process.env.AUTH_SECRET || 'suxiaot-dev-secret-change-me-in-prod';

// ---- 密码哈希（scrypt，Node 内置）----
export function hashPassword(pw) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(pw, salt, 32).toString('hex');
  return `${salt}:${hash}`;
}
export function verifyPassword(pw, stored) {
  if (!stored || !stored.includes(':')) return false;
  const [salt, hash] = stored.split(':');
  const h = crypto.scryptSync(pw, salt, 32).toString('hex');
  const a = Buffer.from(h), b = Buffer.from(hash);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// ---- token：payload.signature（HMAC-SHA256）----
const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
export function signToken(payload, ttlSec = 7 * 24 * 3600) {
  const body = { ...payload, exp: Math.floor(Date.now() / 1000) + ttlSec };
  const data = b64(body);
  const sig = crypto.createHmac('sha256', SECRET).update(data).digest('base64url');
  return `${data}.${sig}`;
}
export function verifyToken(token) {
  if (!token) return null;
  const [data, sig] = token.split('.');
  if (!data || !sig) return null;
  const expect = crypto.createHmac('sha256', SECRET).update(data).digest('base64url');
  if (sig.length !== expect.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expect))) return null;
  try {
    const body = JSON.parse(Buffer.from(data, 'base64url').toString());
    if (body.exp && body.exp < Math.floor(Date.now() / 1000)) return null;
    return body;
  } catch { return null; }
}

// Express 中间件：要求登录（可限定角色）
export function requireAuth(role) {
  return (req, res, next) => {
    const t = (req.headers.authorization || '').replace('Bearer ', '');
    const u = verifyToken(t);
    if (!u || (role && u.role !== role)) return res.status(401).json({ error: 'unauthorized' });
    req.user = u;
    next();
  };
}

// ---- 手机验证码（内存存储；生产换真短信）----
const codes = new Map();
export function genCode(phone) {
  const code = String(Math.floor(1000 + Math.random() * 9000));
  codes.set(phone, { code, exp: Date.now() + 5 * 60 * 1000 });
  return code;
}
export function checkCode(phone, code) {
  const e = codes.get(phone);
  if (!e || e.exp < Date.now()) return false;
  const ok = e.code === String(code);
  if (ok) codes.delete(phone);
  return ok;
}
