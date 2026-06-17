import { Icon, StatusBar, Header, BrandBar, Mascot } from '../../components';

export default function SeasonIP() {
  const seasons = [['春樱', '🌸', 'var(--sakura)'], ['夏荷', '🪷', 'var(--leaf-deep)'], ['秋桂', '🍂', '#C58A2E'], ['冬梅', '❄️', '#4A78C9']];
  const plays = [
    { n: 'camera', t: 'AI合影旅拍', d: '和苏小T拍同款', c: 'var(--sakura-deep)', cb: 'var(--sakura-soft)' },
    { n: 'qr',     t: '沿线集章',   d: '集满兑文创',    c: 'var(--leaf-deep)',   cb: 'var(--leaf-soft)' },
    { n: 'gift',   t: '积分兑好礼', d: '1280分可用',    c: '#C58A2E',            cb: 'var(--sun-soft)' },
    { n: 'chat',   t: '拟人对话',   d: '你的出行搭子',  c: '#4A78C9',            cb: '#E7EEFA' },
  ];
  return (
    <div className="sx-screen">
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 330, background: 'linear-gradient(180deg,#FCE6EE 0%,#FBF0DA 60%,var(--paper) 100%)' }}/>
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <StatusBar/>
        <Header title="苏小T 四季" sub="春樱 · 夏荷 · 秋桂 · 冬梅" right={<Icon n="grid" s={20}/>}/>
        <div className="sx-body">
          <div style={{ display: 'flex', gap: 8 }}>
            {seasons.map((s, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center', borderRadius: 14, padding: '9px 2px', background: i === 0 ? '#fff' : 'rgba(255,255,255,.55)', border: i === 0 ? '2px solid var(--sakura)' : '1px solid var(--line)', boxShadow: i === 0 ? 'var(--shadow-sm)' : 'none' }}>
                <div style={{ fontSize: 21 }}>{s[1]}</div>
                <div style={{ fontWeight: 800, fontSize: 12, color: i === 0 ? 'var(--sakura-deep)' : 'var(--ink-2)', marginTop: 2 }}>{s[0]}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 8, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 18, left: '50%', transform: 'translateX(-50%)', width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle,rgba(238,127,168,.3),transparent 70%)' }}/>
            <Mascot size={128} style={{ position: 'relative', filter: 'drop-shadow(0 10px 16px rgba(37,53,89,.18))' }}/>
            <div className="sx-display" style={{ fontSize: 21, marginTop: 2 }}>春日限定 · 樱花苏小T</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-2)', marginTop: 2 }}>跟着电车去赏樱，集章拍照赢文创</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11, marginTop: 14 }}>
            {plays.map((p, i) => (
              <div key={i} className="sx-card" style={{ padding: '13px 14px', display: 'flex', alignItems: 'center', gap: 11 }}>
                <div style={{ width: 42, height: 42, borderRadius: 13, background: p.cb, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 42px' }}><Icon n={p.n} s={22} c={p.c}/></div>
                <div><div style={{ fontWeight: 800, fontSize: 13.5 }}>{p.t}</div><div style={{ fontSize: 10.5, color: 'var(--ink-3)', fontWeight: 700, marginTop: 1 }}>{p.d}</div></div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 13, display: 'flex', alignItems: 'center', gap: 11, background: 'linear-gradient(120deg,var(--sakura-deep),var(--sakura))', borderRadius: 16, padding: '12px 14px', boxShadow: 'var(--shadow-pink)' }}>
            <div style={{ flex: 1, color: '#fff' }}>
              <div style={{ fontWeight: 900, fontSize: 14.5 }}>樱花季 · 集章打卡赢限定徽章</div>
              <div style={{ fontSize: 11.5, fontWeight: 700, opacity: .92, marginTop: 2 }}>3.15–4.15 · 集满6站兑金属徽章</div>
            </div>
            <span style={{ background: '#fff', color: 'var(--sakura-deep)', borderRadius: 999, padding: '8px 15px', fontSize: 13, fontWeight: 800 }}>去集章</span>
          </div>
        </div>
        <BrandBar label="想玩什么季节限定？问苏小T"/>
      </div>
    </div>
  );
}
