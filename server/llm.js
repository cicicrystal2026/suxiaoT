// server/llm.js — Claude 客户端 + 苏小T 人设 + 知识库依据（迷你 RAG）
import Anthropic from '@anthropic-ai/sdk';
import db from './db.js';

// 密钥只在后端读取，绝不下发前端
export const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// 默认用 Haiku（快 + 便宜，适合客服问答）；可用 CHAT_MODEL 覆盖
export const CHAT_MODEL = process.env.CHAT_MODEL || 'claude-haiku-4-5-20251001';

// 取「已通过」审核的知识条目，拼成 AI 的事实依据
export function buildSystemPrompt() {
  const rows = db.prepare(`SELECT category,title,body FROM kb WHERE audit_status='已通过' ORDER BY category`).all();
  const knowledge = rows.map(r => `【${r.category}·${r.title}】${r.body}`).join('\n');
  return `你是「苏小T」，苏州高新有轨电车的 AI 出行导览管家，性格亲切、活泼、简洁。用中文回答，语气像热心的本地向导，可以适度用 emoji（🚋🌸），但不要啰嗦。

回答规则（很重要）：
1. 只能依据下面【知识依据】里的内容回答出行、票价、线路、文旅相关问题，不要编造时刻、价格、站点等具体数据。
2. 如果用户的问题在知识依据里找不到答案，礼貌说明你暂时没有确切信息，并建议「转人工客服」或到站台咨询，不要硬编一个答案。
3. 回答尽量短，先给结论再给细节；涉及多个步骤时用简短分点。
4. 你可以主动推荐沿线文旅玩法（如樱花专列、太湖湿地公园），但同样以知识依据为准。

【知识依据】
${knowledge}`;
}
