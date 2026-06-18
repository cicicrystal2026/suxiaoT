import { useState } from 'react';
import { Admin, AIcon, EditModal } from '../../components/admin';
import { useCrud } from '../../lib/useCrud';

const MASCOT = import.meta.env.BASE_URL + 'assets/suxiaot-sm.png';

const FALLBACK = [
  { id: 1, title: '樱花专列今日发车提醒', type: '出行提醒', audience: '通勤族 · 订阅用户', status: '已发送', reach: '12,840', ctr: '38.2%', send_at: '06-15 07:00' },
  { id: 2, title: '太湖亲子游 · 周末套票上新', type: '活动推广', audience: '亲子/家庭游客', status: '已发送', reach: '8,210', ctr: '24.6%', send_at: '06-14 10:00' },
  { id: 3, title: '夏荷季集章活动预告', type: '活动推广', audience: '全部会员', status: '待发送', reach: '—', ctr: '—', send_at: '06-20 09:00' },
  { id: 4, title: '苏州话语音导览上线', type: '功能通知', audience: '银发用户', status: '草稿', reach: '—', ctr: '—', send_at: '未设置' },
  { id: 5, title: '末班车时刻调整通知', type: '出行提醒', audience: '一号线订阅', status: '已发送', reach: '5,602', ctr: '41.0%', send_at: '06-12 21:30' },
];

const FIELDS = [
  { key: 'title', label: '推送标题', width: 'full' },
  { key: 'type', label: '类型', type: 'select', options: ['出行提醒', '活动推广', '功能通知'] },
  { key: 'audience', label: '推送人群', placeholder: '通勤族 · 订阅用户' },
  { key: 'status', label: '状态', type: 'select', options: ['已发送', '待发送', '草稿'] },
  { key: 'send_at', label: '发送时间', placeholder: '06-15 07:00 或 未设置' },
];

const sColor = (s) => (s === '已发送' ? 'green' : s === '待发送' ? 'sun' : 'gray');

export default function AdminPush() {
  const { rows, live, create, update, remove } = useCrud('pushes', FALLBACK);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const save = async (form) => {
    setSaving(true);
    try {
      if (editing.id) await update(editing.id, form);
      else await create(form);
      setEditing(null);
    } catch (e) { alert(e.message); } finally { setSaving(false); }
  };
  const del = (r) => { if (confirm(`确认删除「${r.title}」？`)) remove(r.id).catch((e) => alert(e.message)); };

  return (
    <Admin active="push" crumb="商业与触达 / 消息推送" title="消息推送"
      actions={<button className="adm-btn primary" onClick={() => setEditing({})}><AIcon n="plus" s={15} c="#fff" />新建推送</button>}>
      <div style={{ display: 'flex', gap: 14 }}>
        <div className="adm-card" style={{ flex: '0 0 360px', padding: '18px 20px', alignSelf: 'flex-start' }}>
          <div className="adm-sect" style={{ marginBottom: 14 }}><AIcon n="send" s={18} c="var(--sakura-deep)" />新建推送</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-2)', marginBottom: 6 }}>推送标题</div>
          <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 10, padding: '11px 13px', fontSize: 13.5, fontWeight: 800, color: 'var(--ink)' }}>樱花专列今日发车提醒</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-2)', margin: '13px 0 6px' }}>推送人群</div>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {[['通勤族', true], ['亲子游客', false], ['银发用户', false], ['全部会员', false]].map((t, i) => (
              <span key={i} className={'adm-pill ' + (t[1] ? 'pink' : 'gray')} style={{ padding: '6px 12px', fontSize: 12 }}>{t[1] && '✓ '}{t[0]}</span>
            ))}
          </div>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-2)', margin: '13px 0 6px' }}>发送时间</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span className="adm-pill pink" style={{ padding: '6px 12px', fontSize: 12 }}>定时 06-15 07:00</span>
            <span className="adm-pill gray" style={{ padding: '6px 12px', fontSize: 12 }}>立即发送</span>
          </div>
          <div style={{ marginTop: 16, background: 'var(--navy)', borderRadius: 14, padding: '13px 14px', display: 'flex', gap: 11, alignItems: 'flex-start' }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg,var(--sakura),var(--sakura-deep))', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden', flex: '0 0 34px' }}>
              <img src={MASCOT} style={{ width: 32, marginBottom: -1 }} alt="" />
            </div>
            <div style={{ flex: 1, color: '#fff' }}>
              <div style={{ fontSize: 12.5, fontWeight: 800 }}>苏小T导览</div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,.78)', marginTop: 3, lineHeight: 1.5 }}>🌸 樱花专列今日 7:30 首班发车，龙康路—秀岸段每7.5分一班，点我查实时到站～</div>
            </div>
          </div>
          <button className="adm-btn primary" style={{ width: '100%', justifyContent: 'center', marginTop: 14 }}><AIcon n="send" s={15} c="#fff" />确认推送</button>
        </div>
        <div className="adm-card" style={{ flex: 1, overflow: 'hidden', alignSelf: 'flex-start' }}>
          <div style={{ padding: '15px 18px 12px', display: 'flex', alignItems: 'center' }}><div className="adm-sect"><AIcon n="clock" s={17} c="var(--blue)" />推送记录</div><span style={{ flex: 1 }} /><span className={'adm-pill ' + (live ? 'green' : 'gray')}>{live ? '● 已连后端' : '离线演示'}</span></div>
          <table className="adm-table">
            <thead><tr><th>推送内容</th><th style={{ width: 96 }}>类型</th><th style={{ width: 130 }}>人群</th><th style={{ width: 80 }}>状态</th><th style={{ width: 80 }}>触达</th><th style={{ width: 74 }}>点击率</th><th style={{ width: 70 }}>操作</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td><div style={{ fontWeight: 800 }}>{r.title}</div><div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', marginTop: 2 }}>{r.send_at}</div></td>
                  <td><span className="adm-pill gray">{r.type}</span></td>
                  <td style={{ color: 'var(--ink-2)', fontWeight: 700, fontSize: 12 }}>{r.audience}</td>
                  <td><span className={'adm-pill ' + sColor(r.status)}>{r.status === '已发送' && '● '}{r.status}</span></td>
                  <td className="adm-display" style={{ color: 'var(--ink)' }}>{r.reach}</td>
                  <td><span style={{ fontWeight: 800, color: r.ctr === '—' ? 'var(--ink-3)' : '#5C7E2A' }}>{r.ctr}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'var(--ink-3)' }}>
                      <span onClick={() => setEditing(r)} style={{ cursor: 'pointer' }}><AIcon n="edit" s={17} c="var(--blue)" /></span>
                      <span onClick={() => del(r)} style={{ cursor: 'pointer' }}><AIcon n="trash" s={17} c="var(--rose)" /></span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editing && <EditModal title={editing.id ? '编辑推送' : '新建推送'} fields={FIELDS} value={editing} saving={saving} onSave={save} onClose={() => setEditing(null)} />}
    </Admin>
  );
}
