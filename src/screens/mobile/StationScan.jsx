import { Icon, Phone, Header, Mascot } from '../../components';

export default function StationScan() {
  const svcs = [
    { n: 'qr',     t: '扫码集章', d: '本站打卡 +1',  c: 'var(--sakura-deep)', cb: 'var(--sakura-soft)' },
    { n: 'camera', t: 'AI合影',   d: '和苏小T拍照',  c: 'var(--leaf-deep)',   cb: 'var(--leaf-soft)' },
    { n: 'search', t: '文旅资讯', d: '周边吃喝玩',   c: '#C58A2E',            cb: 'var(--sun-soft)' },
  ];
  return (
    <Phone head={<Header title="站台服务" sub="扫码即用 · 无需下载" right={<Icon n="pin" s={20}/>}/>} brandProps={{ label: '本站有啥好玩？问苏小T' }}>
      <div style={{ marginTop: 2, borderRadius: 20, padding: '15px 17px', background: 'linear-gradient(120deg,var(--ink),#33446e)', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
        <Mascot size={74} style={{ position: 'absolute', right: 6, bottom: -8, opacity: .95 }}/>
        <span className="sx-pill" style={{ background: 'rgba(255,255,255,.16)', color: '#fff' }}>📍 你已到达</span>
        <div className="sx-display" style={{ fontSize: 25, color: '#fff', marginTop: 7 }}>狮子山站</div>
        <div style={{ fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,.82)', marginTop: 2 }}>1号线 · 扫描站台灯箱二维码进入</div>
      </div>
      <div className="sx-card" style={{ marginTop: 12, padding: '12px 15px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Icon n="tram" s={24} c="var(--sakura-deep)"/>
        <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 14 }}>下一班 往西洋山</div><div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 700 }}>畅通 · 预计 09:46 到站</div></div>
        <div style={{ textAlign: 'right' }}><span className="sx-display" style={{ fontSize: 26, color: 'var(--sakura-deep)' }}>5</span><span style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-2)' }}> 分</span></div>
      </div>
      <div className="sx-sect" style={{ fontSize: 14, margin: '15px 0 9px' }}>本站服务</div>
      <div style={{ display: 'flex', gap: 10 }}>
        {svcs.map((s, i) => (
          <div key={i} className="sx-card" style={{ flex: 1, padding: '14px 6px', textAlign: 'center' }}>
            <div style={{ width: 50, height: 50, borderRadius: 16, background: s.cb, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}><Icon n={s.n} s={26} c={s.c}/></div>
            <div style={{ fontWeight: 800, fontSize: 13, color: 'var(--ink)', marginTop: 8 }}>{s.t}</div>
            <div style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 700, marginTop: 1 }}>{s.d}</div>
          </div>
        ))}
      </div>
      <div className="sx-sect" style={{ fontSize: 14, margin: '15px 0 9px' }}>本站周边</div>
      <div style={{ display: 'flex', gap: 11 }}>
        {[['太湖湿地公园', '500m', 'var(--leaf-soft)'], ['萌宠乐园', '650m', 'var(--sakura-soft)']].map((p, i) => (
          <div key={i} className="sx-card" style={{ flex: 1, padding: 8 }}>
            <div className="sx-photo ph" data-ph={p[0]} style={{ height: 66, borderRadius: 11, background: p[2] }}/>
            <div style={{ fontWeight: 800, fontSize: 13, marginTop: 7 }}>{p[0]}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3, marginTop: 2 }}><Icon n="pin" s={12} c="var(--ink-3)"/>距站 {p[1]}</div>
          </div>
        ))}
      </div>
    </Phone>
  );
}
