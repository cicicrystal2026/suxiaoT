import React, { useState, useEffect } from 'react';
import { Icon, Phone, Header } from '../../components';
import { getJSON } from '../../lib/api';

const FALLBACK = {
  station: '秀岸站', line: '1号线', source: 'mock',
  directions: [
    { towards: '西洋山', primary: { etaMin: 5, etaClock: '09:46', car: '1003次', status: '畅通' }, upcoming: [{ etaMin: 17, etaClock: '09:58', car: '1007次', status: '较空' }, { etaMin: 31, etaClock: '10:12', car: '1011次', status: '适中' }] },
    { towards: '龙康路', primary: { etaMin: 8, etaClock: '09:49', car: '1102次', status: '畅通' }, upcoming: [{ etaMin: 20, etaClock: '10:01', car: '1106次', status: '较空' }, { etaMin: 33, etaClock: '10:14', car: '1110次', status: '适中' }] },
  ],
};

const crowdStyle = (s) => (s === '畅通' || s === '较空' ? { cb: 'var(--leaf-soft)', cc: 'var(--leaf-deep)' } : s === '适中' ? { cb: 'var(--sun-soft)', cc: '#C58A2E' } : { cb: 'var(--sakura-soft)', cc: 'var(--sakura-deep)' });

export default function ArrivalResult() {
  const [data, setData] = useState(FALLBACK);
  const [dir, setDir] = useState(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let alive = true;
    const load = () => getJSON(`/api/arrivals?station=${encodeURIComponent(FALLBACK.station)}`)
      .then((d) => { if (alive && d?.directions?.length) { setData(d); setLive(true); } })
      .catch(() => {});
    load();
    const t = setInterval(load, 10000); // 每 10 秒刷新
    return () => { alive = false; clearInterval(t); };
  }, []);

  const d = data.directions[dir] || data.directions[0];
  const p = d.primary;
  const pc = crowdStyle(p.status);

  return (
    <Phone head={<Header title="实时到站" sub={live ? '数据每10秒刷新 · 实时' : '数据每10秒刷新'} right={<Icon n="clock" s={20} />} />} brandProps={{ label: '换乘、票价问苏小T就好' }}>
      <div className="sx-card" style={{ padding: '13px 15px', marginTop: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon n="pin" s={20} c="var(--sakura-deep)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-3)' }}>当前车站 · {data.line}</div>
            <div className="sx-display" style={{ fontSize: 20, color: 'var(--ink)' }}>{data.station}</div>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 12.5, fontWeight: 800, color: 'var(--sakura-deep)' }}>切换 <Icon n="chevR" s={14} c="var(--sakura-deep)" /></span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 11 }}>
          {data.directions.map((dd, i) => (
            <div key={i} onClick={() => setDir(i)} style={{ flex: 1, textAlign: 'center', cursor: 'pointer', background: i === dir ? 'var(--sakura)' : 'var(--paper)', color: i === dir ? '#fff' : 'var(--ink-2)', borderRadius: 12, padding: '9px', fontWeight: 800, fontSize: 13.5, boxShadow: i === dir ? 'var(--shadow-pink)' : 'none', border: i === dir ? 'none' : '1px solid var(--line)' }}>往 {dd.towards} {i === 0 ? '↑' : '↓'}</div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 13, borderRadius: 22, padding: '16px 18px', background: 'linear-gradient(135deg,#FCE6EE,#FBF0DA)', border: '1px solid var(--line)', position: 'relative', overflow: 'hidden' }}>
        <span className="sx-pill" style={{ position: 'absolute', right: 14, top: 14, background: pc.cb, color: pc.cc }}>● {p.status}</span>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--sakura-deep)' }}>下一班 · {p.car} 往{d.towards}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 62, color: 'var(--ink)', lineHeight: .9 }}>{p.etaMin}</span>
          <div style={{ lineHeight: 1.2 }}><div style={{ fontSize: 17, fontWeight: 900, color: 'var(--ink)' }}>分钟后到站</div><div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-2)' }}>预计 {p.etaClock} 到站</div></div>
        </div>
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 0 }}>
          {[0, 1, 2].map((i) => (
            <React.Fragment key={i}>
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: i === 0 ? 'var(--sakura-deep)' : '#fff', border: '2px solid var(--sakura-deep)' }} />
              {i < 2 && <div style={{ flex: 1, height: 3, background: i === 0 ? 'var(--sakura-deep)' : '#E9C9D6' }} />}
            </React.Fragment>
          ))}
          <div style={{ marginLeft: 8 }}>🚋</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 10.5, fontWeight: 800, color: 'var(--ink-2)' }}><span>前方2站</span><span>前方1站</span><span>{data.station}(你)</span></div>
      </div>
      <div style={{ marginTop: 13 }}>
        <div className="sx-sect" style={{ fontSize: 14, marginBottom: 8 }}>后续班次</div>
        {d.upcoming.map((t, i) => {
          const c = crowdStyle(t.status);
          return (
            <div key={i} className="sx-card" style={{ padding: '11px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Icon n="tram" s={22} c="var(--ink)" />
              <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 14 }}>{t.car} · 往{d.towards}</div><div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 700 }}>预计 {t.etaClock} 到站</div></div>
              <span className="sx-pill" style={{ background: c.cb, color: c.cc }}>{t.status}</span>
              <div style={{ textAlign: 'right', minWidth: 48 }}><span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ink)' }}>{t.etaMin}</span><span style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-2)' }}> 分</span></div>
            </div>
          );
        })}
      </div>
    </Phone>
  );
}
