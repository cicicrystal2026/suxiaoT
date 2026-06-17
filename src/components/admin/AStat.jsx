import AIcon from './AIcon';

export default function AStat({ label, value, unit, delta, up = true, icon, color = 'var(--sakura-deep)', bg = 'var(--sakura-soft)' }) {
  return (
    <div className="adm-card" style={{ flex: 1, padding: '15px 17px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><AIcon n={icon} s={20} c={color}/></div>
        <span style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--ink-2)' }}>{label}</span>
        {delta && <span className={'adm-pill ' + (up ? 'green' : 'rose')} style={{ marginLeft: 'auto' }}>
          <AIcon n={up ? 'up' : 'down'} s={12} c={up ? '#5C7E2A' : 'var(--rose)'}/>{delta}</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 11 }}>
        <span className="adm-display" style={{ fontSize: 30, color: 'var(--ink)', lineHeight: 1 }}>{value}</span>
        {unit && <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink-3)' }}>{unit}</span>}
      </div>
    </div>
  );
}
