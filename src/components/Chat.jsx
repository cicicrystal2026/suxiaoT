import { useNavigate } from 'react-router-dom';
import { MASCOT } from './Mascot';
import Icon from './Icon';

export function Composer({ ph = '和苏小T说说，去哪儿、坐哪班…', voice = true }) {
  return (
    <>
      <div className="sx-brand" style={{ height: 60, gap: 9, background: '#fff', padding: '0 10px' }}>
        <div className="av" style={{ width: 40, height: 40, flex: '0 0 40px' }}><img src={MASCOT} alt=""/></div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 999, padding: '9px 14px' }}>
          <span style={{ flex: 1, color: 'var(--ink-3)', fontWeight: 700, fontSize: 13 }}>{ph}</span>
          {voice && <Icon n="mic" s={18} c="var(--ink-3)"/>}
        </div>
        <div className="mic" style={{ width: 44, height: 44, flex: '0 0 44px' }}><Icon n="send" s={20} c="#fff"/></div>
      </div>
      <div className="sx-home"></div>
    </>
  );
}

export function Bubble({ me, children, tail = true }) {
  if (me) return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
      <div style={{ maxWidth: '76%', background: 'linear-gradient(135deg,var(--sakura),var(--sakura-deep))', color: '#fff', borderRadius: '18px 18px 5px 18px', padding: '10px 14px', fontSize: 14.5, fontWeight: 700, boxShadow: 'var(--shadow-pink)', lineHeight: 1.5 }}>{children}</div>
    </div>
  );
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'flex-end' }}>
      <div style={{ width: 34, height: 34, flex: '0 0 34px', borderRadius: '50%', background: 'var(--ink)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden', boxShadow: 'inset 0 0 0 2px #fff' }}>
        <img src={MASCOT} style={{ width: 36, marginBottom: -2 }}/>
      </div>
      <div style={{ maxWidth: '80%', background: '#fff', border: '1px solid var(--line)', color: 'var(--ink)', borderRadius: tail ? '18px 18px 18px 5px' : 18, padding: '10px 13px', fontSize: 14.5, fontWeight: 600, boxShadow: 'var(--shadow-sm)', lineHeight: 1.55 }}>{children}</div>
    </div>
  );
}

export function MiniArrival() {
  return (
    <div style={{ marginTop: 9, background: 'var(--paper)', borderRadius: 14, padding: '11px 12px', border: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <span className="sx-pill navy" style={{ padding: '3px 9px' }}>1号线</span>
        <span style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--ink)' }}>往 西洋山 方向</span>
        <span style={{ flex: 1 }}/><span className="sx-pill leaf" style={{ padding: '3px 8px' }}>● 畅通</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--sakura-deep)', lineHeight: 1 }}>5</span>
        <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink)' }}>分钟后到 秀岸站</span>
        <span style={{ flex: 1 }}/><span style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 700 }}>下班 17分钟</span>
      </div>
    </div>
  );
}

export function ConvHead({ title, sub }) {
  const navigate = useNavigate();
  return (
    <div className="sx-head">
      <div className="sx-back" onClick={() => navigate(-1)}><Icon n="back" s={22}/></div>
      <div className="ttl">{title}<small>{sub}</small></div>
      <div className="act"><Icon n="home" s={22}/></div>
    </div>
  );
}
