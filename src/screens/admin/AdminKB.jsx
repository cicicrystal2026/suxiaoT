import { useState } from 'react';
import { Admin, AIcon, EditModal } from '../../components/admin';
import { useCrud } from '../../lib/useCrud';

const FALLBACK = [
  { id: 1, category: '文旅内容', title: '太湖湿地公园 · 景点讲解词', source: '我方建设', audit_status: '已通过', updated_at: '2026-06-12' },
  { id: 2, category: '客服FAQ', title: '樱花专列班次与时段说明', source: '双轨建库', audit_status: '已通过', updated_at: '2026-06-11' },
  { id: 3, category: '运营数据', title: '一号线夏令时刻表（6-9月）', source: '客户提供', audit_status: '待审核', updated_at: '2026-06-15' },
  { id: 4, category: '文旅内容', title: '贡山岛景区 · 骑行玩法', source: '我方建设', audit_status: '待审核', updated_at: '2026-06-15' },
  { id: 5, category: '客服FAQ', title: '电子发票开具流程', source: '双轨建库', audit_status: '已通过', updated_at: '2026-06-09' },
  { id: 6, category: '运营数据', title: '站台失物招领联系方式', source: '客户提供', audit_status: '已驳回', updated_at: '2026-06-08' },
  { id: 7, category: '文旅内容', title: '苏小T苏州话语音导览词', source: '我方建设', audit_status: '待审核', updated_at: '2026-06-14' },
];

const FIELDS = [
  { key: 'category', label: '类型', type: 'select', options: ['运营数据', '客服FAQ', '文旅内容'] },
  { key: 'source', label: '来源', type: 'select', options: ['我方建设', '双轨建库', '客户提供'] },
  { key: 'title', label: '标题', width: 'full', placeholder: '知识条目标题' },
  { key: 'body', label: '内容（AI 回答依据）', type: 'textarea', width: 'full', placeholder: '具体内容，审核通过后才会作为 AI 回答依据' },
  { key: 'audit_status', label: '审核状态', type: 'select', options: ['待审核', '已通过', '已驳回'] },
];

const statusColor = (s) => (s === '已通过' ? 'green' : s === '待审核' ? 'sun' : 'rose');
const catColor = (c) => (c === '文旅内容' ? 'pink' : c === '客服FAQ' ? 'blue' : 'gray');

export default function AdminKB() {
  const { rows, live, create, update, remove } = useCrud('kb', FALLBACK);
  const [editing, setEditing] = useState(null); // null=关闭, {}=新建, row=编辑
  const [saving, setSaving] = useState(false);

  const save = async (form) => {
    setSaving(true);
    try {
      if (editing.id) await update(editing.id, form);
      else await create({ audit_status: '待审核', ...form });
      setEditing(null);
    } catch (e) { alert(e.message); } finally { setSaving(false); }
  };
  const audit = (r, audit_status) => update(r.id, { audit_status }).catch((e) => alert(e.message));
  const del = (r) => { if (confirm(`确认删除「${r.title}」？`)) remove(r.id).catch((e) => alert(e.message)); };

  const pending = rows.filter((r) => r.audit_status === '待审核').length;
  const counts = [['全部', rows.length], ['运营数据', rows.filter((r) => r.category === '运营数据').length], ['客服FAQ', rows.filter((r) => r.category === '客服FAQ').length], ['文旅内容', rows.filter((r) => r.category === '文旅内容').length]];

  return (
    <Admin active="kb" crumb="内容运营 / 知识库管理" title="知识库管理"
      actions={<><button className="adm-btn ghost"><AIcon n="dl" s={15} />批量导入</button><button className="adm-btn primary" style={{ marginLeft: 8 }} onClick={() => setEditing({})}><AIcon n="plus" s={15} c="#fff" />新建条目</button></>}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--sun-soft)', border: '1px solid #F0E2BE', borderRadius: 12, padding: '11px 15px', marginBottom: 16 }}>
        <AIcon n="shield" s={18} c="#A9772A" />
        <span style={{ fontSize: 12.5, fontWeight: 800, color: '#8A6420' }}>内容可信机制：仅「已通过」的条目会作为 AI 回答依据。新建 / 编辑 / 审核 / 删除都会即时改变苏小T 能引用的知识。</span>
        <span style={{ flex: 1 }} />
        <span className={'adm-pill ' + (live ? 'green' : 'gray')}>{live ? '● 已连后端' : '离线演示'}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
        {counts.map(([name, n], i) => (
          <span key={i} style={{ padding: '7px 15px', borderRadius: 999, fontSize: 13, fontWeight: 800, background: i === 0 ? 'var(--navy)' : '#fff', color: i === 0 ? '#fff' : 'var(--ink-2)', border: i === 0 ? 'none' : '1px solid var(--line)' }}>{name} <span style={{ opacity: .6 }}>{n}</span></span>
        ))}
        <span style={{ flex: 1 }} />
        <div className="adm-search" style={{ margin: 0, width: 210 }}><AIcon n="search" s={16} c="var(--ink-3)" /><span>搜索知识条目</span></div>
      </div>
      <div className="adm-card" style={{ overflow: 'hidden' }}>
        <table className="adm-table">
          <thead><tr><th style={{ width: 96 }}>类型</th><th>知识条目</th><th style={{ width: 110 }}>来源</th><th style={{ width: 100 }}>审核状态</th><th style={{ width: 120 }}>更新时间</th><th style={{ width: 160 }}>操作</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td><span className={'adm-pill ' + catColor(r.category)}>{r.category}</span></td>
                <td style={{ fontWeight: 800 }}>{r.title}</td>
                <td style={{ color: 'var(--ink-2)', fontWeight: 700 }}>{r.source}</td>
                <td><span className={'adm-pill ' + statusColor(r.audit_status)}>{r.audit_status === '已通过' && '● '}{r.audit_status}</span></td>
                <td style={{ color: 'var(--ink-3)', fontWeight: 700, fontSize: 12 }}>{r.updated_at}</td>
                <td>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'var(--ink-3)' }}>
                    {r.audit_status !== '已通过' && <span className="adm-pill green" style={{ cursor: 'pointer' }} onClick={() => audit(r, '已通过')}>通过</span>}
                    {r.audit_status !== '已驳回' && <span className="adm-pill rose" style={{ cursor: 'pointer' }} onClick={() => audit(r, '已驳回')}>驳回</span>}
                    <span onClick={() => setEditing(r)} style={{ cursor: 'pointer' }}><AIcon n="edit" s={17} c="var(--blue)" /></span>
                    <span onClick={() => del(r)} style={{ cursor: 'pointer' }}><AIcon n="trash" s={17} c="var(--rose)" /></span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 14, fontSize: 12.5, fontWeight: 700, color: 'var(--ink-3)' }}>共 {rows.length} 条 · 待审 {pending} 条</div>

      {editing && <EditModal title={editing.id ? '编辑知识条目' : '新建知识条目'} fields={FIELDS} value={editing} saving={saving} onSave={save} onClose={() => setEditing(null)} />}
    </Admin>
  );
}
