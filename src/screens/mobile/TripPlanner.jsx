import { useNavigate } from 'react-router-dom';
import { Icon, Mascot, Phone, Header } from '../../components';

export default function TripPlanner() {
  const navigate = useNavigate();
  const personas = [['亲子', '👨‍👩‍👧', '带娃出游'], ['情侣', '💑', '二人世界'], ['银发', '🍵', '慢游休闲'], ['青年', '🎒', '打卡探店']];
  const prefs = ['赏樱', '亲子乐园', '太湖湖景', '美食探店', '园林文化', '拍照打卡', '骑行'];
  return (
    <Phone head={<Header title="AI行程规划" sub="说一句，秒级出方案" right={<Icon n="route" s={20}/>}/>} brandProps={{ label: '懒得选？直接语音说给苏小T' }}>
      <div style={{ marginTop: 2, display: 'flex', gap: 11, alignItems: 'center', background: 'linear-gradient(120deg,#fff,var(--sakura-tint))', border: '1px solid var(--line)', borderRadius: 18, padding: '12px 14px', boxShadow: 'var(--shadow-sm)' }}>
        <Mascot size={50}/>
        <div style={{ flex: 1, fontSize: 13, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.45 }}>告诉我<span style={{ color: 'var(--sakura-deep)' }}>和谁去、玩多久、想看啥</span>，我帮你串成一条沿线路线～</div>
      </div>
      <div className="sx-sect" style={{ fontSize: 14, margin: '15px 0 9px' }}>① 和谁一起</div>
      <div style={{ display: 'flex', gap: 9 }}>
        {personas.map((p, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', borderRadius: 15, padding: '11px 4px', background: i === 0 ? 'var(--sakura-soft)' : '#fff', border: i === 0 ? '2px solid var(--sakura)' : '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: 24 }}>{p[1]}</div>
            <div style={{ fontWeight: 800, fontSize: 13, color: 'var(--ink)', marginTop: 3 }}>{p[0]}</div>
            <div style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 700 }}>{p[2]}</div>
          </div>
        ))}
      </div>
      <div className="sx-sect" style={{ fontSize: 14, margin: '15px 0 9px' }}>② 玩多久</div>
      <div style={{ display: 'flex', gap: 9 }}>
        {['半日（约3h）', '一日（约6h）', '只是路过看看'].map((t, i) => (
          <span key={i} style={{ flex: 1, textAlign: 'center', padding: '10px 4px', borderRadius: 999, fontSize: 13, fontWeight: 800, background: i === 1 ? 'var(--sakura)' : '#fff', color: i === 1 ? '#fff' : 'var(--ink-2)', border: i === 1 ? 'none' : '1px solid var(--line)', boxShadow: i === 1 ? 'var(--shadow-pink)' : 'none' }}>{t}</span>
        ))}
      </div>
      <div className="sx-sect" style={{ fontSize: 14, margin: '15px 0 9px' }}>③ 想体验（可多选）</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {prefs.map((t, i) => (
          <span key={i} style={{ background: [0, 2, 3].includes(i) ? 'var(--leaf-soft)' : '#fff', color: [0, 2, 3].includes(i) ? 'var(--leaf-deep)' : 'var(--ink-2)', border: [0, 2, 3].includes(i) ? '1.5px solid var(--leaf)' : '1px solid var(--line)', borderRadius: 999, padding: '8px 14px', fontSize: 13, fontWeight: 800 }}>
            {[0, 2, 3].includes(i) && '✓ '}{t}</span>
        ))}
      </div>
      <div style={{ marginTop: 15, background: '#fff', border: '1px solid var(--line)', borderRadius: 16, padding: '12px 14px', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--ink-3)', marginBottom: 5 }}>也可以直接一句话说需求</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>"周末带娃去太湖边，想赏樱还能吃点东西"</div>
      </div>
      <button className="sx-btn primary" style={{ width: '100%', marginTop: 14 }} onClick={() => navigate('/route')}><Icon n="sparkle" s={18} c="#fff"/>生成我的专属行程</button>
    </Phone>
  );
}
