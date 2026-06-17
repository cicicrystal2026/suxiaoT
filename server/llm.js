// server/llm.js — 可切换 LLM provider（DeepSeek / OpenAI 兼容 / Anthropic）+ 苏小T 人设 + 知识依据
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import db from './db.js';

// 按环境变量自动选择 provider：谁的 key 设了就用谁。
// 优先级：DeepSeek > 通用 OpenAI 兼容 > Anthropic
function detectProvider() {
  if (process.env.DEEPSEEK_API_KEY) {
    return {
      name: 'deepseek',
      kind: 'openai',
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: process.env.LLM_BASE_URL || 'https://api.deepseek.com',
      model: process.env.CHAT_MODEL || 'deepseek-chat',
    };
  }
  if (process.env.OPENAI_API_KEY) {
    return {
      name: 'openai-compatible',
      kind: 'openai',
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.LLM_BASE_URL || 'https://api.openai.com/v1',
      model: process.env.CHAT_MODEL || 'gpt-4o-mini',
    };
  }
  if (process.env.ANTHROPIC_API_KEY) {
    return {
      name: 'anthropic',
      kind: 'anthropic',
      apiKey: process.env.ANTHROPIC_API_KEY,
      model: process.env.CHAT_MODEL || 'claude-haiku-4-5-20251001',
    };
  }
  return null;
}

export const provider = detectProvider();
export const hasProvider = !!provider;
export const MODEL = provider?.model || '(未配置)';
export const PROVIDER_NAME = provider?.name || '(未配置)';

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

// 统一的流式接口：onText(片段) 逐段回调；屏蔽不同 provider 的差异
export async function streamCompletion({ messages, onText }) {
  if (!provider) throw new Error('未配置任何 LLM 密钥');
  const system = buildSystemPrompt();
  const history = messages.slice(-12).map(m => ({
    role: m.role === 'user' ? 'user' : 'assistant',
    content: String(m.content || ''),
  }));

  if (provider.kind === 'openai') {
    const client = new OpenAI({ apiKey: provider.apiKey, baseURL: provider.baseURL });
    const stream = await client.chat.completions.create({
      model: provider.model,
      max_tokens: 1024,
      stream: true,
      messages: [{ role: 'system', content: system }, ...history],
    });
    for await (const chunk of stream) {
      const t = chunk.choices?.[0]?.delta?.content;
      if (t) onText(t);
    }
    return;
  }

  // anthropic
  const client = new Anthropic({ apiKey: provider.apiKey });
  const stream = await client.messages.stream({
    model: provider.model,
    max_tokens: 1024,
    system,
    messages: history,
  });
  stream.on('text', (t) => onText(t));
  await stream.finalMessage();
}
