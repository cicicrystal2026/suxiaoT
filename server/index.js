// server/index.js — Express 后端：AI 问答代理 + 业务数据接口 +（生产环境）托管前端
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { existsSync } from 'node:fs';
import db from './db.js';
import { client, CHAT_MODEL, buildSystemPrompt } from './llm.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// ---- 健康检查 ----
app.get('/api/health', (req, res) => {
  res.json({ ok: true, model: CHAT_MODEL, hasKey: !!process.env.ANTHROPIC_API_KEY });
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

// ---- AI 问答：流式（SSE）----
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) return res.status(400).json({ error: 'messages required' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(503).json({ error: 'no_api_key', message: '后端未配置 ANTHROPIC_API_KEY' });

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  const send = (event, data) => res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);

  try {
    const clean = messages.slice(-12).map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: String(m.content || '') }));
    const stream = await client.messages.stream({
      model: CHAT_MODEL,
      max_tokens: 1024,
      system: buildSystemPrompt(),
      messages: clean,
    });
    stream.on('text', (t) => send('delta', { text: t }));
    await stream.finalMessage();
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
app.listen(PORT, () => console.log(`✅ 苏小T 后端运行中  http://localhost:${PORT}  (model: ${CHAT_MODEL}, key: ${process.env.ANTHROPIC_API_KEY ? '已配置' : '未配置'})`));
