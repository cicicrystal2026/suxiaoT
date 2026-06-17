import { Icon, StatusBar, Header } from '../../components';

const TRAM = import.meta.env.BASE_URL + 'assets/tram-sm.jpg';

export default function AttractionDetail() {
  return (
    <div className="sx-screen">
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 280, overflow: 'hidden' }}>
        <img src={TRAM} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(37,53,89,.4) 0%,transparent 35%,rgba(251,246,239,.15) 80%,var(--paper) 100%)' }}/>
      </div>
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <StatusBar/>
        <Header title="" back={true} onDark right={<Icon n="heart" s={20} c="#fff"/>}/>
        <div style={{ flex: 1 }}/>
        <div style={{ padding: '0 18px 0' }}>
          <span className="sx-pill pink" style={{ marginBottom: 8 }}>🌸 当季必打卡</span>
          <div className="sx-display" style={{ fontSize: 28, color: '#fff', textShadow: '0 2px 12px rgba(0,0,0,.35)', lineHeight: 1.15 }}>太湖湿地公园</div>
        </div>
        <div style={{ background: 'var(--paper)', borderRadius: '24px 24px 0 0', marginTop: 14, padding: '14px 16px 0', boxShadow: '0 -8px 24px rgba(37,53,89,.08)' }}>
          <div style={{ display: 'flex', gap: 9 }}>
            {[['距秀岸站', '500m'], ['评分', '4.8'], ['开放', '08:30–17:30']].map((s, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center', background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '8px 0' }}>
                <div style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 800 }}>{s[0]}</div>
                <div className="sx-display" style={{ fontSize: 15, color: 'var(--ink)' }}>{s[1]}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: 'linear-gradient(120deg,#fff,var(--sakura-tint))', border: '1px solid var(--line)', borderRadius: 16, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg,var(--sakura),var(--sakura-deep))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-pink)' }}><Icon n="play" s={18} c="#fff"/></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 13.5 }}>听苏小T讲这里的故事</div>
              <div style={{ fontSize: 11, color: 'var(--ink-2)', fontWeight: 700, marginTop: 1 }}>语音导览 · 1分20秒</div>
            </div>
            <div style={{ display: 'flex', background: '#fff', borderRadius: 999, padding: 3, border: '1px solid var(--line)' }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#fff', background: 'var(--ink)', borderRadius: 999, padding: '4px 9px' }}>普通话</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-2)', padding: '4px 9px' }}>苏州话</span>
            </div>
          </div>
          <div className="sx-sect" style={{ fontSize: 14, margin: '13px 0 8px' }}>玩法亮点</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[['🌳', '湿地栈道', '沿湖步道，看芦苇与水鸟'], ['🐰', '萌宠乐园', '亲子互动喂养，孩子最爱'], ['🚲', '环湖骑行', '租车环太湖，约1小时']].map((h, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, background: '#fff', border: '1px solid var(--line)', borderRadius: 13, padding: '9px 12px' }}>
                <span style={{ fontSize: 20 }}>{h[0]}</span>
                <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 13.5 }}>{h[1]}</div><div style={{ fontSize: 11.5, color: 'var(--ink-3)', fontWeight: 700 }}>{h[2]}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 30, zIndex: 3 }}>
        <button className="sx-btn primary" style={{ width: '100%' }}><Icon n="pin" s={18} c="#fff"/>电车导航到这里</button>
      </div>
    </div>
  );
}
