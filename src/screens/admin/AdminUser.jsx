import { Admin, AStat, AIcon } from '../../components/admin';

const rows = [
  ['苏游游',   '138****8866', '会员', '通勤族',   '1,280', '3', '86',  '2026-06-15', '已实名'],
  ['Lina_W',   '159****2031', '会员', '亲子游客', '2,460', '5', '42',  '2026-06-15', '已实名'],
  ['游客_8f2a','—',           '游客', '—',         '0',     '0', '2',   '2026-06-14', '未实名'],
  ['老周',     '136****7745', '会员', '银发用户', '620',   '1', '158', '2026-06-13', '已实名'],
  ['苏州小赵', '187****9920', '会员', '青年探店', '3,150', '8', '64',  '2026-06-13', '已实名'],
  ['游客_3c91','—',           '游客', '—',         '0',     '0', '1',   '2026-06-12', '未实名'],
  ['Amy陈',    '152****4408', '会员', '外地游客', '880',   '2', '12',  '2026-06-11', '已实名'],
];

export default function AdminUser() {
  return (
    <Admin active="user" crumb="用户与权限 / 用户会员" title="用户会员管理"
      actions={<><button className="adm-btn ghost"><AIcon n="dl" s={15}/>导出</button><button className="adm-btn ghost" style={{ marginLeft: 8 }}><AIcon n="filter" s={15}/>筛选画像</button></>}>
      <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
        <AStat label="总用户" value="48,260" delta="6.8%" up icon="users" color="var(--sakura-deep)" bg="var(--sakura-soft)"/>
        <AStat label="实名会员" value="31,840" delta="9.1%" up icon="shield" color="#5C7E2A" bg="var(--leaf-soft)"/>
        <AStat label="今日活跃 DAU" value="5,124" delta="4.2%" up icon="chart" color="var(--blue)" bg="var(--blue-soft)"/>
        <AStat label="会员实名率" value="66.0" unit="%" delta="3.0%" up icon="check" color="#A9772A" bg="var(--sun-soft)"/>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
        {['全部', '会员', '游客', '已实名', '未实名'].map((t, i) => (
          <span key={i} style={{ padding: '7px 15px', borderRadius: 999, fontSize: 13, fontWeight: 800, background: i === 0 ? 'var(--navy)' : '#fff', color: i === 0 ? '#fff' : 'var(--ink-2)', border: i === 0 ? 'none' : '1px solid var(--line)' }}>{t}</span>
        ))}
        <span style={{ flex: 1 }}/>
        <div className="adm-search" style={{ margin: 0, width: 220 }}><AIcon n="search" s={16} c="var(--ink-3)"/><span>昵称 / 手机号 / UnionID</span></div>
      </div>
      <div className="adm-card" style={{ overflow: 'hidden' }}>
        <table className="adm-table">
          <thead><tr><th style={{ width: 150 }}>用户</th><th style={{ width: 120 }}>手机号</th><th style={{ width: 74 }}>身份</th><th style={{ width: 100 }}>人群画像</th><th style={{ width: 80 }}>积分</th><th style={{ width: 70 }}>持券</th><th style={{ width: 80 }}>出行次数</th><th style={{ width: 100 }}>实名状态</th><th style={{ width: 64 }}>操作</th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: r[2] === '游客' ? 'var(--paper)' : 'var(--sakura-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: r[2] === '游客' ? 'var(--ink-3)' : 'var(--sakura-deep)', flex: '0 0 32px' }}>{r[0][0]}</div>
                    <span style={{ fontWeight: 800 }}>{r[0]}</span>
                  </div>
                </td>
                <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--ink-2)', fontWeight: 700 }}>{r[1]}</td>
                <td><span className={'adm-pill ' + (r[2] === '会员' ? 'pink' : 'gray')}>{r[2]}</span></td>
                <td style={{ color: 'var(--ink-2)', fontWeight: 700, fontSize: 12 }}>{r[3]}</td>
                <td className="adm-display" style={{ color: 'var(--ink)' }}>{r[4]}</td>
                <td style={{ fontWeight: 800 }}>{r[5]}</td>
                <td style={{ fontWeight: 800 }}>{r[6]}</td>
                <td><span className={'adm-pill ' + (r[8] === '已实名' ? 'green' : 'gray')}>{r[8] === '已实名' && '● '}{r[8]}</span></td>
                <td><AIcon n="eye" s={17} c="var(--ink-3)"/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}
