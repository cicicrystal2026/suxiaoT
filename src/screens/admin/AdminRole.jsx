import { Admin, AIcon } from '../../components/admin';

const roles = [
  { name: '超级管理员', n: 2, c: 'var(--sakura-deep)', cb: 'var(--sakura-soft)', desc: '全部模块 + 系统设置 + 权限分配',    perms: ['数据看板', '知识库', '活动', '券码', '推送', '专线', '用户', '权限'] },
  { name: '内容运营',   n: 5, c: '#5C7E2A',            cb: 'var(--leaf-soft)',   desc: '知识库 / 活动 / 专线 内容配置与审核', perms: ['数据看板', '知识库', '活动', '专线'] },
  { name: '商业运营',   n: 3, c: 'var(--blue)',         cb: 'var(--blue-soft)',   desc: '券码 / 推送 / 商户与转化运营',       perms: ['数据看板', '券码', '推送', '用户'] },
  { name: '客服专员',   n: 8, c: '#A9772A',             cb: 'var(--sun-soft)',    desc: '查看会话 / 转人工处理 / FAQ反馈',     perms: ['数据看板', '知识库'] },
];
const matrix = ['数据看板', '知识库管理', '活动配置', '券码管理', '消息推送', '文旅专线', '用户会员', '角色权限'];
const access = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 1, 0, 0, 1, 0, 0],
  [1, 0, 0, 1, 1, 0, 2, 0],
  [1, 3, 0, 0, 0, 0, 0, 0],
];
const lvl = { 0: ['—', 'gray'], 1: ['编辑', 'green'], 2: ['审核', 'blue'], 3: ['只读', 'sun'] };

export default function AdminRole() {
  return (
    <Admin active="role" crumb="用户与权限 / 角色权限" title="角色权限管理"
      actions={<button className="adm-btn primary"><AIcon n="plus" s={15} c="#fff"/>新建角色</button>}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 14, marginBottom: 16 }}>
        {roles.map((r, i) => (
          <div key={i} className="adm-card" style={{ padding: '15px 17px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: r.cb, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><AIcon n="shield" s={21} c={r.c}/></div>
              <div><div style={{ fontWeight: 800, fontSize: 14.5, color: 'var(--ink)' }}>{r.name}</div><div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--ink-3)' }}>{r.n} 名成员</div></div>
            </div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-2)', marginTop: 11, lineHeight: 1.5, minHeight: 34 }}>{r.desc}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 10, paddingTop: 11, borderTop: '1px solid var(--line)' }}>
              {r.perms.slice(0, 4).map((p, j) => (<span key={j} className="adm-pill gray" style={{ fontSize: 10.5, padding: '2px 8px' }}>{p}</span>))}
              {r.perms.length > 4 && <span className="adm-pill gray" style={{ fontSize: 10.5, padding: '2px 8px' }}>+{r.perms.length - 4}</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="adm-card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '15px 18px 12px', display: 'flex', alignItems: 'center' }}>
          <div className="adm-sect"><AIcon n="shield" s={17} c="var(--sakura-deep)"/>权限矩阵</div>
          <span style={{ flex: 1 }}/>
          <div style={{ display: 'flex', gap: 8 }}>{Object.values(lvl).map((l, i) => (<span key={i} className={'adm-pill ' + l[1]}>{l[0]}</span>))}</div>
        </div>
        <table className="adm-table">
          <thead><tr><th style={{ width: 150 }}>角色 \ 模块</th>{matrix.map((m, i) => (<th key={i} style={{ textAlign: 'center' }}>{m}</th>))}</tr></thead>
          <tbody>
            {roles.map((r, i) => (
              <tr key={i}>
                <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 9, height: 9, borderRadius: 3, background: r.c }}/><span style={{ fontWeight: 800 }}>{r.name}</span></div></td>
                {access[i].map((a, j) => (
                  <td key={j} style={{ textAlign: 'center' }}>
                    {a === 0 ? <span style={{ color: 'var(--ink-3)' }}>—</span> : <span className={'adm-pill ' + lvl[a][1]} style={{ justifyContent: 'center' }}>{lvl[a][0]}</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 14, fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', display: 'flex', alignItems: 'center', gap: 7 }}>
        <AIcon n="shield" s={15} c="var(--ink-3)"/>角色权限隔离，所有配置、审核、券码、推送操作均记录操作日志，可审计可追溯。
      </div>
    </Admin>
  );
}
