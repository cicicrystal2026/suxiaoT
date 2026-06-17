import { useNavigate } from 'react-router-dom';
import { Icon, StatusBar, Mascot } from '../../components';

export default function ARCheckin() {
  const navigate = useNavigate();
  return (
    <div className="sx-screen" style={{ background: '#11151f' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 50% 35%,#2a3550 0%,#161c2b 60%,#0d111a 100%)' }}/>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '42%', background: 'linear-gradient(180deg,transparent,rgba(110,155,87,.18))' }}/>
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', color: '#fff' }}>
        <StatusBar/>
        <div className="sx-head on-dark">
          <div className="sx-back" onClick={() => navigate(-1)} style={{ boxShadow: 'none', background: 'rgba(255,255,255,.2)', borderColor: 'rgba(255,255,255,.3)', color: '#fff' }}><Icon n="back" s={22} c="#fff"/></div>
          <div className="ttl" style={{ color: '#fff' }}>AR打卡<small style={{ color: 'rgba(255,255,255,.8)' }}>扫立牌 · 集章兑奖</small></div>
          <div className="act"><Icon n="sound" s={22} c="#fff"/></div>
        </div>
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 230, height: 230, position: 'relative' }}>
            {[['left', 'top', 'top', 'left'], ['right', 'top', 'top', 'right'], ['left', 'bottom', 'bottom', 'left'], ['right', 'bottom', 'bottom', 'right']].map((c, i) => (
              <div key={i} style={{ position: 'absolute', [c[0]]: 0, [c[1]]: 0, width: 34, height: 34,
                borderTop: i < 2 ? '3px solid var(--sakura)' : 'none',
                borderBottom: i >= 2 ? '3px solid var(--sakura)' : 'none',
                borderLeft: i % 2 === 0 ? '3px solid var(--sakura)' : 'none',
                borderRight: i % 2 === 1 ? '3px solid var(--sakura)' : 'none',
                borderRadius: i === 0 ? '12px 0 0 0' : i === 1 ? '0 12px 0 0' : i === 2 ? '0 0 0 12px' : '0 0 12px 0' }}/>
            ))}
            <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 2, background: 'linear-gradient(90deg,transparent,var(--sakura),transparent)', boxShadow: '0 0 12px var(--sakura)' }}/>
            <Mascot size={110} style={{ position: 'absolute', left: '50%', top: '42%', transform: 'translate(-50%,-50%)', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,.4))' }}/>
            <div style={{ position: 'absolute', left: '72%', top: '14%', background: '#fff', color: 'var(--ink)', borderRadius: '14px 14px 14px 4px', padding: '7px 11px', fontSize: 12, fontWeight: 800, boxShadow: '0 6px 14px rgba(0,0,0,.3)', whiteSpace: 'nowrap' }}>找到我啦！🎉</div>
          </div>
          <div style={{ position: 'absolute', bottom: 18, fontSize: 13, fontWeight: 800, color: 'rgba(255,255,255,.85)' }}>对准站台「苏小T立牌」即可识别</div>
        </div>
        <div style={{ background: 'var(--paper)', borderRadius: '24px 24px 0 0', padding: '14px 16px 0', color: 'var(--ink)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1 }}>
              <div className="sx-display" style={{ fontSize: 17 }}>狮子山站 · 集章打卡</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-2)', fontWeight: 700, marginTop: 2 }}>已集 3/6 个印章，集满兑限定文创</div>
            </div>
            <span className="sx-pill pink">还差 3 个</span>
          </div>
          <div style={{ display: 'flex', gap: 9, marginTop: 11 }}>
            {[1, 1, 1, 0, 0, 0].map((s, i) => (
              <div key={i} style={{ flex: 1, aspectRatio: '1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: s ? 'linear-gradient(135deg,var(--sakura),var(--sakura-deep))' : '#fff', border: s ? 'none' : '2px dashed var(--line)', boxShadow: s ? 'var(--shadow-pink)' : 'none' }}>
                {s ? <Icon n="check" s={18} c="#fff"/> : <span style={{ fontSize: 16, opacity: .4 }}>🌸</span>}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, margin: '13px 0 0' }}>
            <button className="sx-btn primary" style={{ flex: 1 }}><Icon n="route" s={18} c="#fff"/>AR景点导航</button>
            <button className="sx-btn leaf" style={{ flex: 1 }}><Icon n="gift" s={18} c="#fff"/>集章兑奖</button>
          </div>
          <div style={{ height: 26 }}></div>
        </div>
      </div>
    </div>
  );
}
