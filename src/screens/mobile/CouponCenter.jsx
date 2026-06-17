import { Icon, Phone, Header } from '../../components';

export default function CouponCenter() {
  const tabs = ['可领取', '我的券 (3)', '已使用'];
  const coupons = [
    { t: '湿地公园咖啡',   d: '满30减10 · 当日电车票核销',     v: '10',   unit: '¥', type: '商户券', c: 'var(--sakura)',   cc: 'var(--sakura-deep)', sub: '剩 320 张' },
    { t: '太湖湿地公园门票', d: '景区门票 · 立减优惠',           v: '8.5',  unit: '折', type: '票务券', c: 'var(--leaf-deep)', cc: 'var(--leaf-deep)',   sub: '限本周末' },
    { t: '苏小T文创周边',   d: '积分商城通用 · 满100可用',      v: '20',   unit: '¥', type: '文创券', c: '#C58A2E',          cc: '#C58A2E',           sub: '剩 88 张' },
    { t: '樱花季旅拍',      d: 'AI合影海报高清版 · 免费',       v: 'FREE', unit: '',   type: '活动券', c: '#4A78C9',          cc: '#4A78C9',           sub: '人人可领' },
  ];
  return (
    <Phone head={<Header title="优惠券" sub="坐电车 · 领好券" right={<Icon n="clock" s={20}/>}/>} brandProps={{ label: '券怎么用？问问苏小T' }}>
      <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
        {tabs.map((t, i) => <span key={i} style={{ padding: '7px 14px', borderRadius: 999, fontSize: 13, fontWeight: 800, background: i === 0 ? 'var(--sakura)' : '#fff', color: i === 0 ? '#fff' : 'var(--ink-2)', border: i === 0 ? 'none' : '1px solid var(--line)', boxShadow: i === 0 ? 'var(--shadow-pink)' : 'none' }}>{t}</span>)}
      </div>
      <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10, background: 'linear-gradient(120deg,var(--sakura-tint),var(--leaf-soft))', border: '1px solid var(--line)', borderRadius: 14, padding: '10px 13px' }}>
        <Icon n="ticket" s={20} c="var(--sakura-deep)"/>
        <div style={{ flex: 1, fontSize: 12, fontWeight: 800, color: 'var(--ink)' }}>线下扫码领券 → 门店核销，出行即享优惠</div>
      </div>
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 11 }}>
        {coupons.map((c, i) => (
          <div key={i} style={{ display: 'flex', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--line)', background: '#fff' }}>
            <div style={{ flex: '0 0 92px', background: `linear-gradient(135deg,${c.c},${c.cc})`, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                {c.unit === '¥' && <span style={{ fontSize: 15, fontWeight: 900 }}>¥</span>}
                <span className="sx-display" style={{ fontSize: c.v === 'FREE' ? 22 : 34, color: '#fff', lineHeight: 1 }}>{c.v}</span>
                {c.unit === '折' && <span style={{ fontSize: 14, fontWeight: 900 }}>折</span>}
              </div>
              <span style={{ fontSize: 10, fontWeight: 800, opacity: .92, marginTop: 3 }}>{c.type}</span>
              <div style={{ position: 'absolute', right: -6, top: '50%', transform: 'translateY(-50%)', width: 12, height: 12, borderRadius: '50%', background: 'var(--paper)' }}/>
            </div>
            <div style={{ flex: 1, padding: '11px 13px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: 14.5 }}>{c.t}</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-2)', fontWeight: 700, marginTop: 3, lineHeight: 1.4 }}>{c.d}</div>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                <span style={{ flex: 1, fontSize: 10.5, color: 'var(--ink-3)', fontWeight: 800 }}>{c.sub}</span>
                <span style={{ background: 'var(--ink)', color: '#fff', borderRadius: 999, padding: '6px 16px', fontSize: 12.5, fontWeight: 800 }}>领取</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Phone>
  );
}
