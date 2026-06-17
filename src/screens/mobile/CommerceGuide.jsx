import { Icon, Phone, Header } from '../../components';

export default function CommerceGuide() {
  const tabs = ['景点', '美食', '住宿', '优惠券'];
  const items = [
    { ph: '太湖湿地公园', tag: '生态·亲子', c: 'var(--leaf-soft)',   cc: 'var(--leaf-deep)',   rate: '4.8', dist: '500m',  price: '¥40' },
    { ph: '萌宠乐园',    tag: '网红打卡', c: 'var(--sakura-soft)', cc: 'var(--sakura-deep)', rate: '4.6', dist: '650m',  price: '¥58' },
    { ph: '贡山岛景区',  tag: '湖景·骑行', c: 'var(--sun-soft)',  cc: '#C58A2E',            rate: '4.7', dist: '1.2km', price: '免费' },
  ];
  return (
    <Phone head={<Header title="沿线攻略" sub="秀岸站 · 周边" right={<Icon n="pin" s={20}/>}/>} brandProps={{ label: '要攻略？让苏小T一键生成' }}>
      <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
        {tabs.map((t, i) => (
          <span key={i} style={{ padding: '8px 16px', borderRadius: 999, fontSize: 13.5, fontWeight: 800, background: i === 0 ? 'var(--sakura)' : '#fff', color: i === 0 ? '#fff' : 'var(--ink-2)', border: i === 0 ? 'none' : '1px solid var(--line)', boxShadow: i === 0 ? 'var(--shadow-pink)' : 'none' }}>{t}</span>
        ))}
      </div>
      <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10, background: 'linear-gradient(120deg,var(--sakura-tint),var(--leaf-soft))', border: '1px solid var(--line)', borderRadius: 16, padding: '11px 13px' }}>
        <Icon n="sparkle" s={22} c="var(--sakura-deep)"/>
        <div style={{ flex: 1, fontSize: 12.5, fontWeight: 800, color: 'var(--ink)' }}>苏小T已为「秀岸站」整理 12 个好去处</div>
        <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--sakura-deep)', display: 'inline-flex', alignItems: 'center' }}>生成攻略<Icon n="chevR" s={14} c="var(--sakura-deep)"/></span>
      </div>
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 11 }}>
        {items.map((it, i) => (
          <div key={i} className="sx-card" style={{ padding: 9, display: 'flex', gap: 11 }}>
            <div className="sx-photo ph" data-ph={it.ph} style={{ width: 92, height: 78, flex: '0 0 92px', borderRadius: 13 }}/>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontWeight: 800, fontSize: 15 }}>{it.ph}</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <span className="sx-pill" style={{ background: it.c, color: it.cc, padding: '3px 8px' }}>{it.tag}</span>
                <span style={{ fontSize: 11.5, fontWeight: 800, color: '#C58A2E', display: 'inline-flex', alignItems: 'center', gap: 2 }}><Icon n="star" s={12} c="#F4C24A"/>{it.rate}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6 }}>
                <Icon n="pin" s={13} c="var(--ink-3)"/><span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-2)' }}>距站 {it.dist}</span>
                <span style={{ flex: 1 }}/><span style={{ fontSize: 13, fontWeight: 900, color: 'var(--sakura-deep)' }}>{it.price}</span>
              </div>
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', background: 'linear-gradient(120deg,var(--sakura-deep),var(--sakura))', borderRadius: 14, overflow: 'hidden', boxShadow: 'var(--shadow-pink)' }}>
          <div style={{ flex: 1, padding: '12px 14px', color: '#fff' }}>
            <div style={{ fontWeight: 900, fontSize: 14 }}>湿地公园咖啡 · 满30减10</div>
            <div style={{ fontSize: 11.5, fontWeight: 700, opacity: .92, marginTop: 2 }}>电车票当日核销 · 限秀岸站周边</div>
          </div>
          <div style={{ flex: '0 0 78px', borderLeft: '2px dashed rgba(255,255,255,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Icon n="coupon" s={22} c="#fff"/><span style={{ fontSize: 11, fontWeight: 900, color: '#fff', marginTop: 2 }}>领取</span>
          </div>
        </div>
      </div>
    </Phone>
  );
}
