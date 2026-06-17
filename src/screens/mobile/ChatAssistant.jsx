import { useState, useRef, useEffect } from 'react';
import { StatusBar } from '../../components';
import { Composer, Bubble, ConvHead } from '../../components/Chat';
import { streamChat } from '../../lib/api';

const GREETING = { role: 'assistant', content: '嗨，我是苏小T！🚋 问我线路、到站、票价或换乘都行～' };
const SUGGESTIONS = ['末班车几点', '到太湖怎么走', '今天票价', '樱花专列几点发车'];

export default function ChatAssistant() {
  const [messages, setMessages] = useState([GREETING]);
  const [busy, setBusy] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = (text) => {
    if (busy) return;
    const userMsg = { role: 'user', content: text };
    const next = [...messages, userMsg];
    setMessages([...next, { role: 'assistant', content: '' }]);
    setBusy(true);

    // Claude 要求首条为 user，从第一条用户消息开始截取
    const firstUser = next.findIndex((m) => m.role === 'user');
    const apiMsgs = next.slice(firstUser).map((m) => ({ role: m.role, content: m.content }));

    streamChat(apiMsgs, {
      onDelta: (t) => setMessages((m) => {
        const c = [...m];
        c[c.length - 1] = { ...c[c.length - 1], content: c[c.length - 1].content + t };
        return c;
      }),
      onDone: () => setBusy(false),
      onError: (msg) => {
        setBusy(false);
        setMessages((m) => {
          const c = [...m];
          c[c.length - 1] = { role: 'assistant', content: c[c.length - 1].content || `⚠️ ${msg}` };
          return c;
        });
      },
    });
  };

  return (
    <div className="sx-screen">
      <StatusBar/>
      <ConvHead title="智能出行助手" sub="线路 · 到站 · 票价 · 换乘"/>
      <div className="sx-body" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ textAlign: 'center', margin: '2px 0 12px' }}>
          <span style={{ background: 'var(--paper-2)', color: 'var(--ink-2)', fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 999 }}>苏小T为你服务 · 由 AI 实时生成</span>
        </div>

        {messages.map((m, i) => {
          const isLast = i === messages.length - 1;
          if (m.role === 'assistant' && m.content === '' && busy && isLast) {
            return <Bubble key={i}><span style={{ opacity: .6 }}>苏小T 正在思考…</span></Bubble>;
          }
          return <Bubble key={i} me={m.role === 'user'}>{m.content}</Bubble>;
        })}

        {messages.length <= 1 && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 6 }}>
            {SUGGESTIONS.map((t, i) => (
              <span key={i} onClick={() => send(t)} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 999, padding: '7px 13px', fontSize: 12.5, fontWeight: 800, color: 'var(--ink)', boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}>{t}</span>
            ))}
          </div>
        )}
        <div ref={bottomRef}/>
      </div>
      <Composer onSend={send} disabled={busy}/>
    </div>
  );
}
