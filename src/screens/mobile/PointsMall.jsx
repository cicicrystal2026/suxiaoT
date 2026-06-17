import { useState, useEffect } from 'react';
import { Icon, Phone, Header, Mascot } from '../../components';
import { getJSON } from '../../lib/api';

const COLORS = ['var(--sakura-soft)', '#E7EEFA', 'var(--leaf-soft)', 'var(--sun-soft)'];

const FALLBACK = [
  { id: 1, name: '苏小T徽章', sub: '限量金属徽章', points: 800 },
  { id: 2, name: '电车次卡', sub: '10次乘车券', points: 1200 },
  { id: 3, name: '樱花帆布袋', sub: '樱花季文创', points: 600 },
  { id: 4, name: '湿地门票', sub: '太湖湿地公园', points: 1500 },
];

export default function PointsMall() {
  const tabs = ['文创', '票卡', '商户券'];
  const [goods, setGoods] = useState(FALLBACK);

  useEffect(() => {
    getJSON('/api/points/goods').then((d) => { if (Array.isArray(d) && d.length) setGoods(d); }).catch(() => {});
  }, []);

  return (
    <Phone head={<Header title="积分商城" sub="坐电车·玩苏州 攒积分" right={<Icon n="clock" s={20} />} />} brandProps={{ label: '怎么攒积分？问问苏小T' }}>
      <div style={{ marginTop: 2, borderRadius: 20, padding: '15px 17px', background: 'linear-gradient(120deg,var(--ink) 0%,#33446e 100%)', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
        <Mascot size={70} style={{ position: 'absolute', right: 8, bottom: -6, opacity: .95 }} />
        <div style={{ fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,.8)' }}>我的积分</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
          <span className="sx-display" style={{ fontSize: 36, color: '#fff' }}>1,280</span>
          <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--leaf)' }}>分</span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <span style={{ background: 'rgba(255,255,255,.15)', color: '#fff', borderRadius: 999, padding: '4px 11px', fontSize: 11, fontWeight: 800 }}>今日已签到 +5</span>
          <span style={{ background: 'var(--sakura)', color: '#fff', borderRadius: 999, padding: '4px 11px', fontSize: 11, fontWeight: 800 }}>赚积分攻略</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 13 }}>
        {tabs.map((t, i) => (
          <span key={i} style={{ padding: '7px 16px', borderRadius: 999, fontSize: 13, fontWeight: 800, background: i === 0 ? 'var(--sakura)' : '#fff', color: i === 0 ? '#fff' : 'var(--ink-2)', border: i === 0 ? 'none' : '1px solid var(--line)', boxShadow: i === 0 ? 'var(--shadow-pink)' : 'none' }}>{t}</span>
        ))}
        <span style={{ flex: 1 }} /><span style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-2)', alignSelf: 'center' }}>我的兑换 ›</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11, marginTop: 12 }}>
        {goods.map((g, i) => (
          <div key={g.id ?? i} className="sx-card" style={{ padding: 9 }}>
            <div className="sx-photo ph" data-ph={g.name} style={{ height: 84, borderRadius: 12, background: COLORS[i % COLORS.length] }} />
            <div style={{ fontWeight: 800, fontSize: 13.5, marginTop: 8 }}>{g.name}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 700, marginTop: 1 }}>{g.sub}</div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
              <span style={{ flex: 1, fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--sakura-deep)' }}>{g.points}<span style={{ fontSize: 11 }}> 分</span></span>
              <span style={{ background: 'linear-gradient(135deg,var(--sakura),var(--sakura-deep))', color: '#fff', borderRadius: 999, padding: '6px 14px', fontSize: 12, fontWeight: 800, boxShadow: 'var(--shadow-pink)' }}>兑换</span>
            </div>
          </div>
        ))}
      </div>
    </Phone>
  );
}
