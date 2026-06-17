import { Admin, AIcon } from '../../components/admin';

export default function AdminKB() {
  const tabs = [['全部', 38], ['运营数据', 9], ['客服FAQ', 16], ['文旅内容', 13]];
  const rows = [
    ['文旅内容', '太湖湿地公园 · 景点讲解词', '我方建设', '已通过', 'green', '2026-06-12'],
    ['客服FAQ', '樱花专列班次与时段说明', '双轨建库', '已通过', 'green', '2026-06-11'],
    ['运营数据', '一号线夏令时刻表（6-9月）', '客户提供', '待审核', 'sun', '2026-06-15'],
    ['文旅内容', '贡山岛景区 · 骑行玩法', '我方建设', '待审核', 'sun', '2026-06-15'],
    ['客服FAQ', '电子发票开具流程', '双轨建库', '已通过', 'green', '2026-06-09'],
    ['运营数据', '站台失物招领联系方式', '客户提供', '已驳回', 'rose', '2026-06-08'],
    ['文旅内容', '苏小T苏州话语音导览词', '我方建设', '待审核', 'sun', '2026-06-14'],
  ];
  return (
    <Admin active="kb" crumb="内容运营 / 知识库管理" title="知识库管理"
      actions={<><button className="adm-btn ghost"><AIcon n="dl" s={15}/>批量导入</button><button className="adm-btn primary" style={{ marginLeft: 8 }}><AIcon n="plus" s={15} c="#fff"/>新建条目</button></>}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--sun-soft)', border: '1px solid #F0E2BE', borderRadius: 12, padding: '11px 15px', marginBottom: 16 }}>
        <AIcon n="shield" s={18} c="#A9772A"/>
        <span style={{ fontSize: 12.5, fontWeight: 800, color: '#8A6420' }}>内容可信机制：未审核（audit_status ≠ 通过）的条目不会对 C 端输出，从机制上杜绝 AI 编造数据。</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
        {tabs.map((t, i) => (
          <span key={i} style={{ padding: '7px 15px', borderRadius: 999, fontSize: 13, fontWeight: 800, background: i === 0 ? 'var(--navy)' : '#fff', color: i === 0 ? '#fff' : 'var(--ink-2)', border: i === 0 ? 'none' : '1px solid var(--line)' }}>{t[0]} <span style={{ opacity: .6 }}>{t[1]}</span></span>
        ))}
        <span style={{ flex: 1 }}/>
        <div className="adm-search" style={{ margin: 0, width: 210 }}><AIcon n="search" s={16} c="var(--ink-3)"/><span>搜索知识条目</span></div>
        <button className="adm-btn ghost"><AIcon n="filter" s={15}/>状态</button>
      </div>
      <div className="adm-card" style={{ overflow: 'hidden' }}>
        <table className="adm-table">
          <thead><tr><th style={{ width: 96 }}>类型</th><th>知识条目</th><th style={{ width: 110 }}>来源</th><th style={{ width: 100 }}>审核状态</th><th style={{ width: 120 }}>更新时间</th><th style={{ width: 120 }}>操作</th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td><span className={'adm-pill ' + (r[0] === '文旅内容' ? 'pink' : r[0] === '客服FAQ' ? 'blue' : 'gray')}>{r[0]}</span></td>
                <td style={{ fontWeight: 800 }}>{r[1]}</td>
                <td style={{ color: 'var(--ink-2)', fontWeight: 700 }}>{r[2]}</td>
                <td><span className={'adm-pill ' + r[4]}>{r[3] === '已通过' && '● '}{r[3]}</span></td>
                <td style={{ color: 'var(--ink-3)', fontWeight: 700, fontSize: 12 }}>{r[5]}</td>
                <td>
                  <div style={{ display: 'flex', gap: 8, color: 'var(--ink-3)' }}>
                    <AIcon n="eye" s={17}/><AIcon n="edit" s={17} c="var(--blue)"/>
                    {r[3] === '待审核' ? <span className="adm-pill green" style={{ cursor: 'pointer' }}><AIcon n="check" s={12} c="#5C7E2A"/>审核</span> : <AIcon n="trash" s={17} c="var(--rose)"/>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 14, fontSize: 12.5, fontWeight: 700, color: 'var(--ink-3)' }}>
        共 38 条 · 待审 12 条<span style={{ flex: 1 }}/>
        <div style={{ display: 'flex', gap: 6 }}>
          {['‹', '1', '2', '3', '›'].map((p, i) => (
            <span key={i} style={{ minWidth: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 9, fontWeight: 800, fontSize: 13, background: p === '1' ? 'var(--navy)' : '#fff', color: p === '1' ? '#fff' : 'var(--ink-2)', border: '1px solid var(--line)' }}>{p}</span>
          ))}
        </div>
      </div>
    </Admin>
  );
}
