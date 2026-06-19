import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, Phone, Header } from '../../components';
import { getJSON, postJSON } from '../../lib/api';
import { currentUser } from '../../lib/auth';

const PALETTE = [
  { c: 'var(--sakura)', cc: 'var(--sakura-deep)' },
  { c: 'var(--leaf-deep)', cc: 'var(--leaf-deep)' },
  { c: '#C58A2E', cc: '#C58A2E' },
  { c: '#4A78C9', cc: '#4A78C9' },
];

const FALLBACK = [
  { id: 1, title: '湿地公园咖啡', desc: '满30减10 · 当日电车票核销', value: '10', unit: '¥', type: '满减券', sub: '剩 320 张' },
  { id: 2, title: '太湖湿地公园门票', desc: '景区门票 · 8.5折', value: '8.5', unit: '折', type: '折扣券', sub: '限本周末' },
  { id: 3, title: '苏小T文创周边', desc: '积分商城通用 · 满100可用', value: '20', unit: '¥', type: '文创券', sub: '剩 88 张' },
  { id: 5, title: '樱花季旅拍', desc: 'AI合影海报高清版 · 免费', value: 'FREE', unit: '', type: '活动券', sub: '人人可领' },
];

function CouponCard({ c, i, action }) {
  const col = PALETTE[i % PALETTE.length];
  return (
    <div style={{ display: 'flex', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--line)', background: '#fff' }}>
      <div style={{ flex: '0 0 92px', background: `linear-gradient(135deg,${col.c},${col.cc})`, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          {c.unit === '¥' && <span style={{ fontSize: 15, fontWeight: 900 }}>¥</span>}
          <span className="sx-display" style={{ fontSize: c.value === 'FREE' ? 22 : 34, color: '#fff', lineHeight: 1 }}>{c.value}</span>
          {c.unit === '折' && <span style={{ fontSize: 14, fontWeight: 900 }}>折</span>}
        </div>
        <span style={{ fontSize: 10, fontWeight: 800, opacity: .92, marginTop: 3 }}>{c.type}</span>
        <div style={{ position: 'absolute', right: -6, top: '50%', transform: 'translateY(-50%)', width: 12, height: 12, borderRadius: '50%', background: 'var(--paper)' }} />
      </div>
      <div style={{ flex: 1, padding: '11px 13px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontWeight: 800, fontSize: 14.5 }}>{c.title}</div>
        <div style={{ fontSize: 11.5, color: 'var(--ink-2)', fontWeight: 700, marginTop: 3, lineHeight: 1.4 }}>{c.desc}</div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
          <span style={{ flex: 1, fontSize: 10.5, color: 'var(--ink-3)', fontWeight: 800 }}>{c.sub}</span>
          {action}
        </div>
      </div>
    </div>
  );
}

export default function CouponCenter() {
  const navigate = useNavigate();
  const loggedIn = !!currentUser();
  const [coupons, setCoupons] = useState(FALLBACK);
  const [mine, setMine] = useState([]);
  const [claimed, setClaimed] = useState(() => new Set());
  const [tab, setTab] = useState(0);
  const [busy, setBusy] = useState(null);

  useEffect(() => {
    getJSON('/api/coupons').then((d) => { if (Array.isArray(d) && d.length) setCoupons(d.filter((c) => c.status === '进行中' || !c.status)); }).catch(() => {});
  }, []);
  useEffect(() => {
    if (!loggedIn) return;
    getJSON('/api/me/coupons').then((d) => { setMine(d); setClaimed(new Set(d.map((c) => c.id))); }).catch(() => {});
  }, [loggedIn]);

  const claim = async (c) => {
    if (!loggedIn) { navigate('/realname'); return; }
    setBusy(c.id);
    try {
      await postJSON(`/api/coupons/${c.id}/claim`, {});
      setClaimed((s) => new Set([...s, c.id]));
      setMine((m) => [c, ...m]);
    } catch (e) { alert(e.message); } finally { setBusy(null); }
  };

  const tabs = ['可领取', `我的券 (${mine.length})`, '已使用'];

  return (
    <Phone head={<Header title="优惠券" sub="坐电车 · 领好券" right={<Icon n="clock" s={20} />} />} brandProps={{ label: '券怎么用？问问苏小T' }}>
      <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
        {tabs.map((t, i) => <span key={i} onClick={() => setTab(i)} style={{ cursor: 'pointer', padding: '7px 14px', borderRadius: 999, fontSize: 13, fontWeight: 800, background: i === tab ? 'var(--sakura)' : '#fff', color: i === tab ? '#fff' : 'var(--ink-2)', border: i === tab ? 'none' : '1px solid var(--line)', boxShadow: i === tab ? 'var(--shadow-pink)' : 'none' }}>{t}</span>)}
      </div>

      {!loggedIn && (
        <div onClick={() => navigate('/realname')} style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10, background: 'linear-gradient(120deg,var(--sakura-tint),var(--leaf-soft))', border: '1px solid var(--line)', borderRadius: 14, padding: '10px 13px', cursor: 'pointer' }}>
          <Icon n="user" s={20} c="var(--sakura-deep)" />
          <div style={{ flex: 1, fontSize: 12, fontWeight: 800, color: 'var(--ink)' }}>登录 / 实名后即可领取并保存优惠券</div>
          <Icon n="chevR" s={16} c="var(--sakura-deep)" />
        </div>
      )}

      {tab === 0 && (
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 11 }}>
          {coupons.map((c, i) => (
            <CouponCard key={c.id ?? i} c={c} i={i} action={
              claimed.has(c.id)
                ? <span style={{ background: 'var(--leaf-soft)', color: 'var(--leaf-deep)', borderRadius: 999, padding: '6px 14px', fontSize: 12.5, fontWeight: 800 }}>已领取</span>
                : <span onClick={() => claim(c)} style={{ background: 'var(--ink)', color: '#fff', borderRadius: 999, padding: '6px 16px', fontSize: 12.5, fontWeight: 800, cursor: 'pointer', opacity: busy === c.id ? 0.6 : 1 }}>领取</span>
            } />
          ))}
        </div>
      )}

      {tab === 1 && (
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 11 }}>
          {mine.length === 0
            ? <div style={{ textAlign: 'center', color: 'var(--ink-3)', fontWeight: 700, fontSize: 13, padding: '40px 0' }}>还没有领取优惠券，去「可领取」逛逛吧～</div>
            : mine.map((c, i) => <CouponCard key={c.id ?? i} c={c} i={i} action={<span style={{ background: 'var(--sakura-soft)', color: 'var(--sakura-deep)', borderRadius: 999, padding: '6px 14px', fontSize: 12.5, fontWeight: 800 }}>去使用</span>} />)}
        </div>
      )}

      {tab === 2 && (
        <div style={{ textAlign: 'center', color: 'var(--ink-3)', fontWeight: 700, fontSize: 13, padding: '40px 0' }}>暂无已使用的优惠券</div>
      )}
    </Phone>
  );
}
