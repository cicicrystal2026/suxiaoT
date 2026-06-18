import { useState } from 'react';
import { Admin, AStat, AIcon, EditModal } from '../../components/admin';
import { useCrud } from '../../lib/useCrud';

const FALLBACK = [
  { id: 1, code: 'CPN-2026-0312', title: '湿地公园咖啡', type: '满减券', merchant: '湿地咖啡馆', total: 5000, claimed: 4680, status: '进行中' },
  { id: 2, code: 'CPN-2026-0298', title: '太湖湿地公园门票', type: '折扣券', merchant: '太湖湿地公园', total: 3000, claimed: 2140, status: '进行中' },
  { id: 3, code: 'CPN-2026-0305', title: '苏小T文创周边', type: '文创券', merchant: '官方商城', total: 2000, claimed: 1912, status: '进行中' },
  { id: 4, code: 'CPN-2026-0277', title: '萌宠乐园亲子套票', type: '套票券', merchant: '萌宠乐园', total: 1500, claimed: 1500, status: '已抢光' },
  { id: 5, code: 'CPN-2026-0260', title: '樱花季旅拍', type: '活动券', merchant: '官方', total: 999999, claimed: 6204, status: '进行中' },
  { id: 6, code: 'CPN-2026-0231', title: '贡山岛骑行立减15', type: '满减券', merchant: '贡山岛景区', total: 800, claimed: 120, status: '已暂停' },
];

const FIELDS = [
  { key: 'title', label: '券名称', width: 'full' },
  { key: 'code', label: '券编码', placeholder: 'CPN-2026-xxxx' },
  { key: 'merchant', label: '商户' },
  { key: 'type', label: '类型', type: 'select', options: ['满减券', '折扣券', '文创券', '套票券', '活动券'] },
  { key: 'value', label: '面值', placeholder: '如 10 / 8.5 / FREE' },
  { key: 'unit', label: '单位', type: 'select', options: ['¥', '折', ''] },
  { key: 'desc', label: '描述', width: 'full' },
  { key: 'sub', label: '副标题（如 剩 320 张）' },
  { key: 'total', label: '发放量', type: 'number' },
  { key: 'claimed', label: '已领', type: 'number' },
  { key: 'status', label: '状态', type: 'select', options: ['进行中', '已抢光', '已暂停'] },
];

const sColor = (s) => (s === '进行中' ? 'green' : s === '已抢光' ? 'sun' : 'gray');
const fmtTotal = (t) => (t >= 999999 ? '∞' : Number(t).toLocaleString());
const fmtStock = (r) => (r.total >= 999999 ? '—' : (r.total - r.claimed));

export default function AdminCoupon() {
  const { rows, live, create, update, remove } = useCrud('coupons', FALLBACK);
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
  const setStatus = (r, status) => update(r.id, { status }).catch((e) => alert(e.message));
  const del = (r) => { if (confirm(`确认删除「${r.title}」？`)) remove(r.id).catch((e) => alert(e.message)); };

  return (
    <Admin active="coupon" crumb="商业与触达 / 券码管理" title="券码管理"
      actions={<><button className="adm-btn ghost"><AIcon n="dl" s={15} />核销记录</button><button className="adm-btn primary" style={{ marginLeft: 8 }} onClick={() => setEditing({})}><AIcon n="plus" s={15} c="#fff" />新建券模板</button></>}>
      <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
        <AStat label="在架券模板" value={String(rows.length)} unit="个" icon="ticket" color="var(--sakura-deep)" bg="var(--sakura-soft)" />
        <AStat label="累计发放" value="16.5k" unit="张" delta="8.2%" up icon="send" color="var(--blue)" bg="var(--blue-soft)" />
        <AStat label="已核销" value="9,284" unit="张" delta="5.1%" up icon="check" color="#5C7E2A" bg="var(--leaf-soft)" />
        <AStat label="核销率" value="56.3" unit="%" delta="2.0%" up icon="chart" color="#A9772A" bg="var(--sun-soft)" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
        {['全部', '进行中', '已抢光', '已暂停'].map((t, i) => (
          <span key={i} style={{ padding: '7px 15px', borderRadius: 999, fontSize: 13, fontWeight: 800, background: i === 0 ? 'var(--navy)' : '#fff', color: i === 0 ? '#fff' : 'var(--ink-2)', border: i === 0 ? 'none' : '1px solid var(--line)' }}>{t}</span>
        ))}
        <span style={{ flex: 1 }} />
        <span className={'adm-pill ' + (live ? 'green' : 'gray')}>{live ? '● 已连后端' : '离线演示'}</span>
        <div className="adm-search" style={{ margin: 0, width: 200 }}><AIcon n="search" s={16} c="var(--ink-3)" /><span>券名称 / 编码 / 商户</span></div>
      </div>
      <div className="adm-card" style={{ overflow: 'hidden' }}>
        <table className="adm-table">
          <thead><tr><th style={{ width: 130 }}>券编码</th><th>券名称</th><th style={{ width: 80 }}>类型</th><th style={{ width: 120 }}>商户</th><th style={{ width: 74 }}>发放量</th><th style={{ width: 74 }}>已领</th><th style={{ width: 90 }}>库存</th><th style={{ width: 90 }}>状态</th><th style={{ width: 120 }}>操作</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td style={{ fontFamily: 'monospace', fontSize: 11.5, color: 'var(--ink-3)', fontWeight: 700 }}>{r.code}</td>
                <td style={{ fontWeight: 800 }}>{r.title}</td>
                <td><span className="adm-pill gray">{r.type}</span></td>
                <td style={{ color: 'var(--ink-2)', fontWeight: 700 }}>{r.merchant}</td>
                <td className="adm-display" style={{ color: 'var(--ink)' }}>{fmtTotal(r.total)}</td>
                <td style={{ color: 'var(--ink-2)' }}>{Number(r.claimed).toLocaleString()}</td>
                <td><span style={{ fontWeight: 800, color: fmtStock(r) === 0 ? 'var(--rose)' : 'var(--ink)' }}>{fmtStock(r)}</span></td>
                <td><span className={'adm-pill ' + sColor(r.status)}>{r.status === '进行中' && '● '}{r.status}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'var(--ink-3)' }}>
                    {r.status === '已暂停'
                      ? <span className="adm-pill green" style={{ cursor: 'pointer' }} onClick={() => setStatus(r, '进行中')}>恢复</span>
                      : r.status === '进行中'
                        ? <span className="adm-pill gray" style={{ cursor: 'pointer' }} onClick={() => setStatus(r, '已暂停')}>暂停</span>
                        : null}
                    <span onClick={() => setEditing(r)} style={{ cursor: 'pointer' }}><AIcon n="edit" s={17} c="var(--blue)" /></span>
                    <span onClick={() => del(r)} style={{ cursor: 'pointer' }}><AIcon n="trash" s={17} c="var(--rose)" /></span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && <EditModal title={editing.id ? '编辑券模板' : '新建券模板'} fields={FIELDS} value={editing} saving={saving} onSave={save} onClose={() => setEditing(null)} />}
    </Admin>
  );
}
