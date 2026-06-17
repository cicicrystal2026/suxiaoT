import { Icon, Mascot, Phone, Header } from '../../components';

export default function RouteRec() {
  const steps = [
    { ic: 'tram',  c: 'var(--sakura-deep)', cb: 'var(--sakura-soft)', t: '狮子山站 上车',   d: '1号线 往西洋山方向',     meta: '09:30' },
    { ic: 'route', c: '#4A78C9',            cb: '#E7EEFA',            t: '龙康路站 换乘',   d: '同台换乘支线，步行0分钟', meta: '09:52' },
    { ic: 'pin',   c: 'var(--leaf-deep)',   cb: 'var(--leaf-soft)',   t: '秀岸站 下车',     d: '沿樱花大道步行约500米',   meta: '10:15' },
    { ic: 'heart', c: '#C58A2E',            cb: 'var(--sun-soft)',    t: '太湖湿地公园',    d: '萌宠乐园·亲子首选，玩约2小时', meta: '10:25' },
  ];
  return (
    <Phone head={<Header title="AI文旅推荐" sub="苏小T为你定制" right={<Icon n="heart" s={20}/>}/>} brandProps={{ label: '想改行程？直接告诉苏小T' }}>
      <div style={{ marginTop: 2, background: 'linear-gradient(120deg,#fff,var(--sakura-tint))', border: '1px solid var(--line)', borderRadius: 18, padding: '12px 14px', boxShadow: 'var(--shadow-sm)', display: 'flex', gap: 10, alignItems: 'center' }}>
        <Mascot size={48}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.4 }}>已按「周末 · 带小孩 · 去太湖」帮你规划👇</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 6 }}><span className="sx-pill pink">亲子</span><span className="sx-pill leaf">赏樱</span><span className="sx-pill sun">半日游</span></div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 9, marginTop: 12 }}>
        {[['全程', '约3.5h'], ['票价', '¥4 起'], ['步行', '约800m']].map((s, i) => (
          <div key={i} className="sx-card" style={{ flex: 1, padding: '10px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 10.5, color: 'var(--ink-3)', fontWeight: 800 }}>{s[0]}</div>
            <div className="sx-display" style={{ fontSize: 16, color: 'var(--ink)', marginTop: 2 }}>{s[1]}</div>
          </div>
        ))}
      </div>
      <div className="sx-sect" style={{ fontSize: 14, margin: '14px 0 10px' }}>🚋 推荐路线</div>
      <div style={{ position: 'relative', paddingLeft: 6 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, position: 'relative', paddingBottom: i < steps.length - 1 ? 14 : 0 }}>
            {i < steps.length - 1 && <div style={{ position: 'absolute', left: 18, top: 38, bottom: 0, width: 2, background: 'var(--line)' }}/>}
            <div style={{ width: 38, height: 38, flex: '0 0 38px', borderRadius: 13, background: s.cb, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}><Icon n={s.ic} s={20} c={s.c}/></div>
            <div className="sx-card" style={{ flex: 1, padding: '10px 13px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 14 }}>{s.t}</div><div style={{ fontSize: 11.5, color: 'var(--ink-2)', fontWeight: 700, marginTop: 1 }}>{s.d}</div></div>
              <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--sakura-deep)' }}>{s.meta}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
        <button className="sx-btn primary" style={{ flex: 1 }}><Icon n="pin" s={18} c="#fff"/>一键导航出发</button>
        <button className="sx-btn ghost" style={{ flex: '0 0 auto', padding: '13px 16px' }}><Icon n="heart" s={18}/></button>
      </div>
    </Phone>
  );
}
