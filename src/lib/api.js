// src/lib/api.js — 前端调用后端的封装
// 开发环境：留空，走 Vite 代理 /api → 本地后端
// 生产环境（前端单独部署，如 GitHub Pages）：设 VITE_API_BASE 指向你部署的后端地址
const API_BASE = import.meta.env.VITE_API_BASE || '';

export async function getJSON(path) {
  const r = await fetch(`${API_BASE}${path}`);
  if (!r.ok) throw new Error(`请求失败 ${r.status}`);
  return r.json();
}

export async function patchJSON(path, body) {
  const r = await fetch(`${API_BASE}${path}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`请求失败 ${r.status}`);
  return r.json();
}

// 流式对话：解析后端的 SSE，逐段回调
export async function streamChat(messages, { onDelta, onDone, onError, signal } = {}) {
  try {
    const r = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
      signal,
    });
    if (!r.ok || !r.body) {
      let msg = `AI 服务不可用 (${r.status})`;
      try { const j = await r.json(); if (j.message) msg = j.message; } catch {}
      onError?.(msg);
      return;
    }
    const reader = r.body.getReader();
    const decoder = new TextDecoder();
    let buf = '';
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const chunks = buf.split('\n\n');
      buf = chunks.pop() || '';
      for (const chunk of chunks) {
        const ev = /event: (.*)/.exec(chunk)?.[1];
        const dataLine = /data: (.*)/s.exec(chunk)?.[1];
        if (!ev || !dataLine) continue;
        const data = JSON.parse(dataLine);
        if (ev === 'delta') onDelta?.(data.text);
        else if (ev === 'done') onDone?.();
        else if (ev === 'error') onError?.(data.message);
      }
    }
  } catch (e) {
    if (e.name !== 'AbortError') onError?.(e.message || '网络错误');
  }
}
