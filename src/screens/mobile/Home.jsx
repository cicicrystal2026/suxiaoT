import { useNavigate } from 'react-router-dom';
import { Icon, Mascot, MASCOT, Phone, BrandBar, StatusBar } from '../../components';

const TRAM = import.meta.env.BASE_URL + 'assets/tram-sm.jpg';

const FUNCS = [
  { n: 'tram',    t: '实时到站', d: '到站·拥挤度',   c: 'var(--sakura)',   bg: 'var(--sakura-soft)', to: '/arrival' },
  { n: 'chat',    t: '智能问答', d: '线路·票价·换乘', c: 'var(--leaf-deep)', bg: 'var(--leaf-soft)',   to: '/chat' },
  { n: 'route',   t: '文旅推荐', d: 'AI帮你排行程',   c: '#C58A2E',         bg: 'var(--sun-soft)',    to: '/guide' },
  { n: 'headset', t: '在线客服', d: '7×24全天候',     c: '#4A78C9',         bg: '#E7EEFA',           to: '/service' },
];
const FUNCS2 = [
  { n: 'sparkle', t: '四季IP',   c: 'var(--sakura-deep)', bg: 'var(--sakura-soft)', to: '/season' },
  { n: 'route',   t: '文旅专线', c: 'var(--leaf-deep)',   bg: 'var(--leaf-soft)',   to: '/theme-routes' },
  { n: 'qr',      t: '沿线集章', c: '#C58A2E',            bg: 'var(--sun-soft)',    to: '/ar' },
  { n: 'coupon',  t: '优惠券',   c: '#4A78C9',            bg: '#E7EEFA',           to: '/coupon' },
];

function AskBar({ text = '问路线 · 查到站 · 要攻略…', compact = false }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate('/chat')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid var(--line)', borderRadius: 999, padding: compact ? '8px 8px 8px 16px' : '11px 10px 11px 18px', boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}>
      <Icon n="search" s={18} c="var(--ink-3)"/>
      <span style={{ flex: 1, color: 'var(--ink-3)', fontWeight: 700, fontSize: 14 }}>{text}</span>
      <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,var(--sakura),var(--sakura-deep))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-pink)' }}><Icon n="mic" s={17} c="#fff"/></div>
    </div>
  );
}

function HomeHead() {
  const navigate = useNavigate();
  return (
    <div className="sx-head">
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--ink)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden', boxShadow: 'inset 0 0 0 2px #fff' }}>
          <img src={MASCOT} style={{ width: 40, marginBottom: -3 }}/>
        </div>
        <div style={{ lineHeight: 1.1 }}>
          <div className="sx-display" style={{ fontSize: 18 }}>苏小T导览</div>
          <div style={{ fontSize: 10, color: 'var(--ink-2)', fontWeight: 800 }}>苏州有轨电车 · AI出行管家</div>
        </div>
      </div>
      <div style={{ flex: 1 }}/>
      <div className="sx-back" style={{ boxShadow: 'none' }} onClick={() => navigate('/station')}><Icon n="scan" s={20}/></div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  return (
    <Phone head={<HomeHead/>} brandProps={{ label: '随时问苏小T，出行更有趣' }}>
      <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', marginTop: 4, background: 'linear-gradient(135deg,#FCE6EE 0%,#FBF0DA 55%,#EEF4D6 100%)', padding: '16px 16px 18px', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--sakura-deep)' }}>嗨，欢迎来苏州！👋</div>
            <div className="sx-display" style={{ fontSize: 23, color: 'var(--ink)', marginTop: 4, lineHeight: 1.25 }}>我是苏小T<br/>想去哪儿都问我</div>
          </div>
          <Mascot size={88} style={{ marginTop: -6, marginRight: -4, filter: 'drop-shadow(0 6px 10px rgba(37,53,89,.18))' }}/>
        </div>
        <div style={{ marginTop: 6 }}><AskBar/></div>
      </div>
      <div style={{ display: 'flex', gap: 9, marginTop: 14 }}>
        {FUNCS.map((f, i) => (
          <div key={i} onClick={() => navigate(f.to)} style={{ flex: 1, background: '#fff', border: '1px solid var(--line)', borderRadius: 18, padding: '12px 8px 11px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}>
            <div style={{ width: 46, height: 46, borderRadius: 15, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n={f.n} s={24} c={f.c}/></div>
            <div style={{ fontWeight: 800, fontSize: 13, color: 'var(--ink)' }}>{f.t}</div>
            <div style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 700 }}>{f.d}</div>
          </div>
        ))}
      </div>
      <div onClick={() => navigate('/theme-routes')} style={{ marginTop: 14, borderRadius: 20, overflow: 'hidden', position: 'relative', boxShadow: 'var(--shadow-sm)', height: 118, cursor: 'pointer' }}>
        <img src={TRAM} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(37,53,89,.74) 0%,rgba(37,53,89,.15) 70%)' }}/>
        <div style={{ position: 'absolute', left: 16, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6 }}>
          <span className="sx-pill pink" style={{ alignSelf: 'flex-start' }}>🌸 当季主推</span>
          <div className="sx-display" style={{ color: '#fff', fontSize: 19, lineHeight: 1.2 }}>6.5km樱花专列<br/>带你一路追春</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#fff', fontSize: 12, fontWeight: 800, opacity: .95 }}>查看赏樱路线 <Icon n="chevR" s={14} c="#fff"/></div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 9, marginTop: 14 }}>
        {FUNCS2.map((f, i) => (
          <div key={i} onClick={() => navigate(f.to)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}><Icon n={f.n} s={24} c={f.c}/></div>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink)' }}>{f.t}</div>
          </div>
        ))}
      </div>
    </Phone>
  );
}
