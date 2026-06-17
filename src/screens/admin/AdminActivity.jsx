import { useState, useEffect } from 'react';
import { Admin, AStat, AIcon } from '../../components/admin';
import { getJSON, patchJSON } from '../../lib/api';

const FALLBACK = [
  { id: 1, title: '樱花季 · 集章打卡赢徽章', season: '春樱', type: '集章活动', status: '进行中', date: '03.15 – 04.15', joined: '8,420', badge: '🌸' },
  { id: 2, title: 'AI合影旅拍 · 樱花限定模板', season: '春樱', type: 'AIGC活动', status: '进行中', date: '03.01 – 04.30', joined: '3,156', badge: '📸' },
  { id: 3, title: '太湖亲子游 · 套票立减', season: '通用', type: '券活动', status: '进行中', date: '长期', joined: '1,902', badge: '🎟️' },
  { id: 4, title: '夏荷季 · 湿地骑行打卡', season: '夏荷', type: '集章活动', status: '待发布', date: '06.20 – 08.31', joined: '—', badge: '🪷' },
  { id: 5, title: '秋桂季 · 园林文化专线', season: '秋桂', type: '专线活动', status: '草稿', date: '未设置', joined: '—', badge: '🍂' },
];

const phBySeason = (s) => (s === '春樱' ? 'var(--sakura-soft)' : s === '秋桂' ? 'var(--sun-soft)' : 'var(--leaf-soft)');
const sColor = (s) => (s === '进行中' ? 'green' : s === '待发布' ? 'sun' : 'gray');

export default function AdminActivity() {
  const [acts, setActs] = useState(FALLBACK);
  const [live, setLive] = useState(false);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    getJSON('/api/activities').then((d) => { if (Array.isArray(d) && d.length) { setActs(d); setLive(true); } }).catch(() => {});
  }, []);

  const toggle = async (a) => {
    const next = a.status === '进行中' ? '待发布' : '进行中';
    setBusyId(a.id);
    setActs((rs) => rs.map((r) => (r.id === a.id ? { ...r, status: next } : r)));
    try { const u = await patchJSON(`/api/activities/${a.id}`, { status: next }); setActs((rs) => rs.map((r) => (r.id === a.id ? u : r))); } catch {}
    finally { setBusyId(null); }
  };

  const active = acts.filter((a) => a.status === '进行中').length;

  return (
    <Admin active="activity" crumb="内容运营 / 活动配置" title="活动配置"
      actions={<button className="adm-btn primary"><AIcon n="plus" s={15} c="#fff" />新建活动</button>}>
      <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
        <div className="adm-card" style={{ flex: 1, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--ink-2)' }}>四季 IP 主题</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['🌸 春樱', true], ['🪷 夏荷', false], ['🍂 秋桂', false], ['❄️ 冬梅', false]].map((s, i) => (
              <span key={i} style={{ padding: '7px 14px', borderRadius: 999, fontSize: 13, fontWeight: 800, background: s[1] ? 'linear-gradient(135deg,var(--sakura),var(--sakura-deep))' : '#fff', color: s[1] ? '#fff' : 'var(--ink-2)', border: s[1] ? 'none' : '1px solid var(--line)', boxShadow: s[1] ? '0 4px 12px rgba(224,94,142,.3)' : 'none' }}>{s[0]}</span>
            ))}
          </div>
          <span style={{ flex: 1 }} />
          <span className={'adm-pill ' + (live ? 'green' : 'gray')}>{live ? '● 已连后端' : '离线演示'}</span>
        </div>
        <AStat label="进行中活动" value={String(active)} unit="个" icon="flag" color="#5C7E2A" bg="var(--leaf-soft)" />
        <AStat label="累计参与" value="13.4k" unit="人次" icon="users" color="var(--sakura-deep)" bg="var(--sakura-soft)" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
        {acts.map((a) => (
          <div key={a.id} className="adm-card" style={{ padding: 0, overflow: 'hidden', opacity: busyId === a.id ? 0.6 : 1 }}>
            <div style={{ height: 84, background: phBySeason(a.season), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, position: 'relative' }}>
              {a.badge}
              <span className={'adm-pill ' + sColor(a.status)} style={{ position: 'absolute', top: 11, right: 11, background: '#fff' }}>{a.status === '进行中' && '● '}{a.status}</span>
            </div>
            <div style={{ padding: '13px 15px' }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}><span className="adm-pill gray">{a.season}</span><span className="adm-pill pink">{a.type}</span></div>
              <div style={{ fontWeight: 800, fontSize: 14.5, color: 'var(--ink)', lineHeight: 1.35, minHeight: 38 }}>{a.title}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 9, fontSize: 12, fontWeight: 700, color: 'var(--ink-3)' }}>
                <AIcon n="clock" s={14} c="var(--ink-3)" />{a.date}<span style={{ flex: 1 }} /><AIcon n="users" s={14} c="var(--ink-3)" />{a.joined}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 13, borderTop: '1px solid var(--line)', paddingTop: 12 }}>
                <button className="adm-btn ghost" style={{ flex: 1, justifyContent: 'center', padding: '8px' }} onClick={() => toggle(a)}>
                  {a.status === '进行中' ? <><AIcon n="clock" s={14} />下线</> : <><AIcon n="check" s={14} />上线</>}
                </button>
                <button className="adm-btn ghost" style={{ flex: 1, justifyContent: 'center', padding: '8px' }}><AIcon n="chart" s={14} />数据</button>
              </div>
            </div>
          </div>
        ))}
        <div className="adm-card" style={{ padding: 0, overflow: 'hidden', border: '1.5px dashed var(--line)', background: 'transparent', boxShadow: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 230, flexDirection: 'column', gap: 10, color: 'var(--ink-3)' }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: '#fff', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><AIcon n="plus" s={26} c="var(--sakura-deep)" /></div>
          <span style={{ fontSize: 13, fontWeight: 800 }}>新建活动</span>
          <span style={{ fontSize: 11, fontWeight: 700 }}>集章 · 合影 · 券 · 专线</span>
        </div>
      </div>
    </Admin>
  );
}
