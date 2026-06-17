import React from 'react';
import { Icon, Phone, Header } from '../../components';

export default function ArrivalResult() {
  const trains = [
    { min: '5',  label: '即将到站', car: '1003次', crowd: '畅通', cc: 'var(--leaf-deep)', cb: 'var(--leaf-soft)' },
    { min: '17', label: '17分钟',  car: '1007次', crowd: '较空', cc: 'var(--leaf-deep)', cb: 'var(--leaf-soft)' },
    { min: '31', label: '31分钟',  car: '1011次', crowd: '适中', cc: '#C58A2E',          cb: 'var(--sun-soft)' },
  ];
  return (
    <Phone head={<Header title="实时到站" sub="数据每10秒刷新" right={<Icon n="clock" s={20}/>}/>} brandProps={{ label: '换乘、票价问苏小T就好' }}>
      <div className="sx-card" style={{ padding: '13px 15px', marginTop: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon n="pin" s={20} c="var(--sakura-deep)"/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-3)' }}>当前车站</div>
            <div className="sx-display" style={{ fontSize: 20, color: 'var(--ink)' }}>秀岸站</div>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 12.5, fontWeight: 800, color: 'var(--sakura-deep)' }}>切换 <Icon n="chevR" s={14} c="var(--sakura-deep)"/></span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 11 }}>
          <div style={{ flex: 1, textAlign: 'center', background: 'var(--sakura)', color: '#fff', borderRadius: 12, padding: '9px', fontWeight: 800, fontSize: 13.5, boxShadow: 'var(--shadow-pink)' }}>往 西洋山 ↑</div>
          <div style={{ flex: 1, textAlign: 'center', background: 'var(--paper)', color: 'var(--ink-2)', borderRadius: 12, padding: '9px', fontWeight: 800, fontSize: 13.5, border: '1px solid var(--line)' }}>往 龙康路 ↓</div>
        </div>
      </div>
      <div style={{ marginTop: 13, borderRadius: 22, padding: '16px 18px', background: 'linear-gradient(135deg,#FCE6EE,#FBF0DA)', border: '1px solid var(--line)', position: 'relative', overflow: 'hidden' }}>
        <span className="sx-pill leaf" style={{ position: 'absolute', right: 14, top: 14 }}>● 畅通 · 较空</span>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--sakura-deep)' }}>下一班 · 1003次 往西洋山</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 62, color: 'var(--ink)', lineHeight: .9 }}>5</span>
          <div style={{ lineHeight: 1.2 }}><div style={{ fontSize: 17, fontWeight: 900, color: 'var(--ink)' }}>分钟后到站</div><div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-2)' }}>预计 09:46 · 距你 2 站</div></div>
        </div>
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 0 }}>
          {[0, 1, 2].map(i => (
            <React.Fragment key={i}>
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: i === 0 ? 'var(--sakura-deep)' : '#fff', border: '2px solid var(--sakura-deep)' }}/>
              {i < 2 && <div style={{ flex: 1, height: 3, background: i === 0 ? 'var(--sakura-deep)' : '#E9C9D6' }}/>}
            </React.Fragment>
          ))}
          <div style={{ marginLeft: 8 }}>🚋</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 10.5, fontWeight: 800, color: 'var(--ink-2)' }}><span>文昌路</span><span>龙安路</span><span>秀岸(你)</span></div>
      </div>
      <div style={{ marginTop: 13 }}>
        <div className="sx-sect" style={{ fontSize: 14, marginBottom: 8 }}>后续班次</div>
        {trains.slice(1).map((t, i) => (
          <div key={i} className="sx-card" style={{ padding: '11px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Icon n="tram" s={22} c="var(--ink)"/>
            <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 14 }}>{t.car} · 往西洋山</div><div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 700 }}>预计 {i === 0 ? '09:58' : '10:12'} 到站</div></div>
            <span className="sx-pill" style={{ background: t.cb, color: t.cc }}>{t.crowd}</span>
            <div style={{ textAlign: 'right', minWidth: 48 }}><span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ink)' }}>{t.min}</span><span style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-2)' }}> 分</span></div>
          </div>
        ))}
      </div>
    </Phone>
  );
}
