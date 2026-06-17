import { Admin, AStat, AIcon } from '../../components/admin';

const acts = [
  { t: '樱花季 · 集章打卡赢徽章',   season: '春樱', type: '集章活动',  status: '进行中', sc: 'green', date: '03.15 – 04.15', join: '8,420', ph: 'var(--sakura-soft)', badge: '🌸' },
  { t: 'AI合影旅拍 · 樱花限定模板', season: '春樱', type: 'AIGC活动',  status: '进行中', sc: 'green', date: '03.01 – 04.30', join: '3,156', ph: 'var(--sakura-soft)', badge: '📸' },
  { t: '太湖亲子游 · 套票立减',     season: '通用', type: '券活动',    status: '进行中', sc: 'green', date: '长期',         join: '1,902', ph: 'var(--leaf-soft)',   badge: '🎟️' },
  { t: '夏荷季 · 湿地骑行打卡',     season: '夏荷', type: '集章活动',  status: '待发布', sc: 'sun',   date: '06.20 – 08.31', join: '—',    ph: 'var(--leaf-soft)',   badge: '🪷' },
  { t: '秋桂季 · 园林文化专线',     season: '秋桂', type: '专线活动',  status: '草稿',   sc: 'gray',  date: '未设置',         join: '—',    ph: 'var(--sun-soft)',    badge: '🍂' },
];

export default function AdminActivity() {
  return (
    <Admin active="activity" crumb="内容运营 / 活动配置" title="活动配置"
      actions={<button className="adm-btn primary"><AIcon n="plus" s={15} c="#fff"/>新建活动</button>}>
      <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
        <div className="adm-card" style={{ flex: 1, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--ink-2)' }}>四季 IP 主题</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['🌸 春樱', true], ['🪷 夏荷', false], ['🍂 秋桂', false], ['❄️ 冬梅', false]].map((s, i) => (
              <span key={i} style={{ padding: '7px 14px', borderRadius: 999, fontSize: 13, fontWeight: 800, background: s[1] ? 'linear-gradient(135deg,var(--sakura),var(--sakura-deep))' : '#fff', color: s[1] ? '#fff' : 'var(--ink-2)', border: s[1] ? 'none' : '1px solid var(--line)', boxShadow: s[1] ? '0 4px 12px rgba(224,94,142,.3)' : 'none' }}>{s[0]}</span>
            ))}
          </div>
          <span style={{ flex: 1 }}/>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)' }}>当前主题将同步至 C 端四季 IP 主页</span>
        </div>
        <AStat label="进行中活动" value="3" unit="个" icon="flag" color="#5C7E2A" bg="var(--leaf-soft)"/>
        <AStat label="累计参与" value="13.4k" unit="人次" icon="users" color="var(--sakura-deep)" bg="var(--sakura-soft)"/>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
        {acts.map((a, i) => (
          <div key={i} className="adm-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ height: 84, background: a.ph, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, position: 'relative' }}>
              {a.badge}
              <span className={'adm-pill ' + a.sc} style={{ position: 'absolute', top: 11, right: 11, background: '#fff' }}>{a.status === '进行中' && '● '}{a.status}</span>
            </div>
            <div style={{ padding: '13px 15px' }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}><span className="adm-pill gray">{a.season}</span><span className="adm-pill pink">{a.type}</span></div>
              <div style={{ fontWeight: 800, fontSize: 14.5, color: 'var(--ink)', lineHeight: 1.35, minHeight: 38 }}>{a.t}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 9, fontSize: 12, fontWeight: 700, color: 'var(--ink-3)' }}>
                <AIcon n="clock" s={14} c="var(--ink-3)"/>{a.date}<span style={{ flex: 1 }}/><AIcon n="users" s={14} c="var(--ink-3)"/>{a.join}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 13, borderTop: '1px solid var(--line)', paddingTop: 12 }}>
                <button className="adm-btn ghost" style={{ flex: 1, justifyContent: 'center', padding: '8px' }}><AIcon n="edit" s={14}/>编辑</button>
                <button className="adm-btn ghost" style={{ flex: 1, justifyContent: 'center', padding: '8px' }}><AIcon n="chart" s={14}/>数据</button>
              </div>
            </div>
          </div>
        ))}
        <div className="adm-card" style={{ padding: 0, overflow: 'hidden', border: '1.5px dashed var(--line)', background: 'transparent', boxShadow: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 230, flexDirection: 'column', gap: 10, color: 'var(--ink-3)' }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: '#fff', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><AIcon n="plus" s={26} c="var(--sakura-deep)"/></div>
          <span style={{ fontSize: 13, fontWeight: 800 }}>新建活动</span>
          <span style={{ fontSize: 11, fontWeight: 700 }}>集章 · 合影 · 券 · 专线</span>
        </div>
      </div>
    </Admin>
  );
}
