import { Icon, Phone, Header, Mascot } from '../../components';

export default function PosterMaker() {
  return (
    <Phone head={<Header title="AI海报打卡" sub="一键生成专属打卡图" right={<Icon n="gift" s={20}/>}/>} brandProps={{ label: '换个风格？让苏小T重画' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <div style={{ width: 212, height: 300, borderRadius: 18, overflow: 'hidden', position: 'relative', boxShadow: 'var(--shadow)', background: 'linear-gradient(160deg,#FDEAF1 0%,#FBF0DA 50%,#EEF4D6 100%)', border: '4px solid #fff' }}>
          <div style={{ position: 'absolute', top: 14, left: 14, right: 14, height: 160, borderRadius: 12, background: 'repeating-linear-gradient(45deg,#eef2f7 0 10px,#e6ecf3 10px 20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 5, color: '#9aa6b8' }}>
            <Icon n="camera" s={26} c="#9aa6b8"/><span style={{ fontFamily: 'monospace', fontSize: 10 }}>点击放入你的照片</span>
          </div>
          <div style={{ position: 'absolute', top: 8, right: 10, fontSize: 16 }}>🌸</div>
          <div style={{ position: 'absolute', top: 150, left: 8, fontSize: 13 }}>🌸</div>
          <Mascot size={52} style={{ position: 'absolute', bottom: 54, right: 8 }}/>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '10px 14px 12px' }}>
            <div className="sx-display" style={{ fontSize: 17, color: 'var(--ink)' }}>春日追樱 · 太湖</div>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--sakura-deep)', marginTop: 2 }}>苏州有轨电车 · 秀岸站 · 2026.03.28</div>
          </div>
        </div>
      </div>
      <div className="sx-sect" style={{ fontSize: 13.5, margin: '14px 0 8px' }}>挑个模板</div>
      <div style={{ display: 'flex', gap: 9 }}>
        {[['樱花季', 'linear-gradient(160deg,#FDEAF1,#EEF4D6)', true], ['太湖蓝', 'linear-gradient(160deg,#E7EEFA,#EAF1F6)', false], ['复古票', 'linear-gradient(160deg,#FBF0DA,#F4ECE1)', false], ['电车侠', 'linear-gradient(160deg,#EEF4D6,#FCE6EE)', false]].map((t, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ height: 62, borderRadius: 12, background: t[1], border: t[2] ? '2.5px solid var(--sakura)' : '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {t[2] && <Icon n="check" s={18} c="var(--sakura-deep)"/>}
            </div>
            <div style={{ fontSize: 11, fontWeight: 800, color: t[2] ? 'var(--sakura-deep)' : 'var(--ink-2)', marginTop: 4 }}>{t[0]}</div>
          </div>
        ))}
      </div>
      <div className="sx-sect" style={{ fontSize: 13.5, margin: '14px 0 8px' }}>AI文案 · 选个心情</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {['🌸 春日追樱', '😋 边吃边逛', '🚋 慢游苏州', '👨‍👩‍👧 亲子时光', '✍️ 自己写'].map((t, i) => (
          <span key={i} style={{ background: i === 0 ? 'var(--sakura)' : '#fff', color: i === 0 ? '#fff' : 'var(--ink)', border: i === 0 ? 'none' : '1px solid var(--line)', borderRadius: 999, padding: '8px 14px', fontSize: 12.5, fontWeight: 800, boxShadow: i === 0 ? 'var(--shadow-pink)' : 'var(--shadow-sm)' }}>{t}</span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
        <button className="sx-btn primary" style={{ flex: 1 }}><Icon n="sparkle" s={18} c="#fff"/>生成海报 <span style={{ fontSize: 11, opacity: .9 }}>+10积分</span></button>
        <button className="sx-btn ghost" style={{ flex: '0 0 auto', padding: '13px 16px' }}><Icon n="send" s={18}/></button>
      </div>
    </Phone>
  );
}
