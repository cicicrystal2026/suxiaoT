import { Icon, Phone, Header } from '../../components';

const TRAM = import.meta.env.BASE_URL + 'assets/tram-sm.jpg';

export default function ThemeRoutes() {
  const tabs = ['当季 · 春', '全部主题', '亲子', '美食'];
  const routes = [
    { ph: '樱花专列',   tag: '当季主推', c: 'var(--sakura-soft)', cc: 'var(--sakura-deep)', stops: '6站', dur: '约3h', price: '¥4 起',   rate: '4.9', badge: '🌸', hot: true },
    { ph: '太湖亲子线', tag: '亲子首选', c: 'var(--leaf-soft)',   cc: 'var(--leaf-deep)',   stops: '4站', dur: '约5h', price: '¥40 套票', rate: '4.8', badge: '🐰' },
    { ph: '沿线美食探店', tag: '吃货必备', c: 'var(--sun-soft)', cc: '#C58A2E',             stops: '5站', dur: '约4h', price: '含5张券',   rate: '4.7', badge: '🍜' },
    { ph: '园林文化线', tag: '文化深度', c: '#E7EEFA',           cc: '#4A78C9',             stops: '3站', dur: '约4h', price: '¥80 联票', rate: '4.8', badge: '🏯' },
  ];
  return (
    <Phone head={<Header title="文旅专线" sub="苏小T精选 · 一号/二号线" right={<Icon n="search" s={20}/>}/>} brandProps={{ label: '想坐哪条线？问苏小T' }}>
      <div style={{ display: 'flex', gap: 8, marginTop: 2, overflow: 'hidden' }}>
        {tabs.map((t, i) => <span key={i} style={{ whiteSpace: 'nowrap', padding: '8px 15px', borderRadius: 999, fontSize: 13, fontWeight: 800, background: i === 0 ? 'var(--sakura)' : '#fff', color: i === 0 ? '#fff' : 'var(--ink-2)', border: i === 0 ? 'none' : '1px solid var(--line)', boxShadow: i === 0 ? 'var(--shadow-pink)' : 'none' }}>{t}</span>)}
      </div>
      <div style={{ marginTop: 10, borderRadius: 20, overflow: 'hidden', position: 'relative', boxShadow: 'var(--shadow-sm)', height: 118 }}>
        <img src={TRAM} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(37,53,89,.78) 0%,rgba(37,53,89,.1) 75%)' }}/>
        <div style={{ position: 'absolute', left: 16, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 7 }}>
          <span className="sx-pill pink" style={{ alignSelf: 'flex-start' }}>🌸 6.5km 樱花长廊</span>
          <div className="sx-display" style={{ color: '#fff', fontSize: 21, lineHeight: 1.2 }}>樱花专列<br/>一路追春到太湖</div>
          <div style={{ display: 'flex', gap: 10, color: '#fff', fontSize: 12, fontWeight: 800 }}><span>龙康路→秀岸 · 6站</span><span>·</span><span>每7.5分一班</span></div>
        </div>
      </div>
      <div style={{ marginTop: 11, display: 'flex', flexDirection: 'column', gap: 9 }}>
        {routes.map((r, i) => (
          <div key={i} className="sx-card" style={{ padding: 10, display: 'flex', gap: 11 }}>
            <div className="sx-photo ph" data-ph={r.ph} style={{ width: 76, height: 76, flex: '0 0 76px', borderRadius: 13, background: r.c, position: 'relative' }}>
              <span style={{ position: 'absolute', top: 6, left: 7, fontSize: 18 }}>{r.badge}</span></div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontWeight: 800, fontSize: 15.5 }}>{r.ph}</span>
                {r.hot && <span className="sx-pill pink" style={{ padding: '2px 8px' }}>HOT</span>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 5 }}>
                <span className="sx-pill" style={{ background: r.c, color: r.cc, padding: '3px 8px' }}>{r.tag}</span>
                <span style={{ fontSize: 11.5, fontWeight: 800, color: '#C58A2E', display: 'inline-flex', alignItems: 'center', gap: 2 }}><Icon n="star" s={12} c="#F4C24A"/>{r.rate}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 7, fontSize: 11.5, fontWeight: 700, color: 'var(--ink-2)' }}>
                <span>{r.stops}</span><span>·</span><span>{r.dur}</span><span style={{ flex: 1 }}/><span style={{ fontSize: 13.5, fontWeight: 900, color: 'var(--sakura-deep)' }}>{r.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Phone>
  );
}
