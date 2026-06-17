import { Icon, Phone, Header, Toggle } from '../../components';

export default function Reminders() {
  const pushes = [
    { ic: 'bell',    c: 'var(--sakura-deep)', cb: 'var(--sakura-soft)', t: '出行提醒', d: '龙康路站明早7:00–8:30因樱花季人流较大，建议提前15分钟出门。', time: '今天 21:30' },
    { ic: 'sparkle', c: '#C58A2E',            cb: 'var(--sun-soft)',    t: '文旅活动', d: '本周末太湖湿地公园「萌宠市集」开张，乘电车至秀岸站可领门票券。', time: '昨天 10:12' },
  ];
  return (
    <Phone head={<Header title="出行提醒" sub="订阅路线 · 主动推送" right={<Icon n="plus" s={22}/>}/>} brandProps={{ label: '想订阅哪条线？问苏小T', icon: 'mic' }}>
      <div style={{ marginTop: 2, borderRadius: 20, padding: '14px 16px', background: 'linear-gradient(135deg,#EEF4D6,#FCE6EE)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="sx-pill pink">通勤路线</span><span style={{ flex: 1 }}/><Toggle on={true}/>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 11 }}>
          <span className="sx-display" style={{ fontSize: 18 }}>狮子山</span>
          <Icon n="route" s={20} c="var(--leaf-deep)"/>
          <span className="sx-display" style={{ fontSize: 18 }}>龙康路</span>
        </div>
        <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-2)', marginTop: 6 }}>🕗 工作日 早 8:00–9:00 · 延误/末班车自动提醒</div>
      </div>
      <div className="sx-card" style={{ marginTop: 13, padding: '4px 15px' }}>
        {[['延误预警', '线路异常第一时间通知', true], ['末班车提醒', '常坐班次发车前提醒', true], ['文旅活动推送', '樱花季·市集·音乐节', true], ['苏州话语音播报', '到站语音用苏州话提醒', false]].map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: i < 3 ? '1px solid var(--line)' : 'none' }}>
            <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 14 }}>{r[0]}</div><div style={{ fontSize: 11.5, color: 'var(--ink-3)', fontWeight: 700 }}>{r[1]}</div></div>
            <Toggle on={r[2]}/>
          </div>
        ))}
      </div>
      <div className="sx-sect" style={{ fontSize: 14, margin: '14px 0 8px' }}>最近推送</div>
      {pushes.map((p, i) => (
        <div key={i} className="sx-card" style={{ padding: '11px 13px', marginBottom: 8, display: 'flex', gap: 10 }}>
          <div style={{ width: 36, height: 36, flex: '0 0 36px', borderRadius: 11, background: p.cb, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n={p.ic} s={19} c={p.c}/></div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ fontWeight: 800, fontSize: 13.5, flex: 1 }}>{p.t}</span><span style={{ fontSize: 10.5, color: 'var(--ink-3)', fontWeight: 700 }}>{p.time}</span></div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-2)', fontWeight: 600, lineHeight: 1.45, marginTop: 3 }}>{p.d}</div>
          </div>
        </div>
      ))}
    </Phone>
  );
}
