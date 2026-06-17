import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, Mascot, StatusBar } from '../../components';
import { Composer, Bubble, ConvHead } from '../../components/Chat';
import { streamChat } from '../../lib/api';

const GREETING = { role: 'assistant', content: '嘿嘿，又见面啦！今天想去哪玩？我可以陪你聊天，也能帮你生成专属打卡海报哦～📸' };

export default function IPChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([GREETING]);
  const [busy, setBusy] = useState(false);
  const [started, setStarted] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = (text) => {
    if (busy) return;
    setStarted(true);
    const next = [...messages, { role: 'user', content: text }];
    setMessages([...next, { role: 'assistant', content: '' }]);
    setBusy(true);
    const firstUser = next.findIndex((m) => m.role === 'user');
    const apiMsgs = next.slice(firstUser).map((m) => ({ role: m.role, content: m.content }));
    streamChat(apiMsgs, {
      onDelta: (t) => setMessages((m) => { const c = [...m]; c[c.length - 1] = { ...c[c.length - 1], content: c[c.length - 1].content + t }; return c; }),
      onDone: () => setBusy(false),
      onError: (msg) => { setBusy(false); setMessages((m) => { const c = [...m]; c[c.length - 1] = { role: 'assistant', content: c[c.length - 1].content || `⚠️ ${msg}` }; return c; }); },
    });
  };

  return (
    <div className="sx-screen">
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 300, background: 'linear-gradient(180deg,var(--sakura-soft),var(--paper))' }} />
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <StatusBar />
        <ConvHead title="苏小T · 电车侠" sub="你的专属出行搭子" />
        <div className="sx-body" style={{ display: 'flex', flexDirection: 'column' }}>
          {!started && (
            <div style={{ textAlign: 'center', marginBottom: 8 }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div style={{ position: 'absolute', inset: '-8px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(238,127,168,.35),transparent 70%)' }} />
                <Mascot size={96} style={{ position: 'relative', filter: 'drop-shadow(0 8px 12px rgba(37,53,89,.18))' }} />
              </div>
              <div className="sx-display" style={{ fontSize: 18, marginTop: 2 }}>苏小T <span style={{ fontSize: 12, color: 'var(--leaf-deep)' }}>● 在线</span></div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-2)', fontWeight: 700 }}>已陪你坐了 12 趟车 · 一起逛了 5 个景点</div>
            </div>
          )}

          {messages.map((m, i) => {
            const isLast = i === messages.length - 1;
            if (m.role === 'assistant' && m.content === '' && busy && isLast) {
              return <Bubble key={i}><span style={{ opacity: .6 }}>苏小T 正在打字…</span></Bubble>;
            }
            return <Bubble key={i} me={m.role === 'user'}>{m.content}</Bubble>;
          })}

          <div style={{ display: 'flex', gap: 9, marginTop: 'auto', paddingTop: 6 }}>
            <div onClick={() => navigate('/poster')} style={{ flex: 1, background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '10px', display: 'flex', alignItems: 'center', gap: 8, boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}>
              <Icon n="camera" s={20} c="var(--sakura-deep)" /><span style={{ fontSize: 13, fontWeight: 800 }}>AI海报打卡</span></div>
            <div onClick={() => navigate('/mall')} style={{ flex: 1, background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '10px', display: 'flex', alignItems: 'center', gap: 8, boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}>
              <Icon n="gift" s={20} c="var(--leaf-deep)" /><span style={{ fontSize: 13, fontWeight: 800 }}>积分兑好礼</span></div>
          </div>
          <div ref={bottomRef} />
        </div>
        <Composer ph="和苏小T聊聊天…" onSend={send} disabled={busy} />
      </div>
    </div>
  );
}
