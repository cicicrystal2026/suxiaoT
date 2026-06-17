import { useState, useEffect } from 'react';
import { Admin, AIcon } from '../../components/admin';
import { getJSON } from '../../lib/api';

const FALLBACK = [
  { id: 1, name: '超级管理员', members: 2, color: 'var(--sakura-deep)', color_bg: 'var(--sakura-soft)', descr: '全部模块 + 系统设置 + 权限分配', perms: ['数据看板', '知识库', '活动', '券码', '推送', '专线', '用户', '权限'], access: [1, 1, 1, 1, 1, 1, 1, 1] },
  { id: 2, name: '内容运营', members: 5, color: '#5C7E2A', color_bg: 'var(--leaf-soft)', descr: '知识库 / 活动 / 专线 内容配置与审核', perms: ['数据看板', '知识库', '活动', '专线'], access: [1, 2, 1, 0, 0, 1, 0, 0] },
  { id: 3, name: '商业运营', members: 3, color: 'var(--blue)', color_bg: 'var(--blue-soft)', descr: '券码 / 推送 / 商户与转化运营', perms: ['数据看板', '券码', '推送', '用户'], access: [1, 0, 0, 1, 1, 0, 2, 0] },
  { id: 4, name: '客服专员', members: 8, color: '#A9772A', color_bg: 'var(--sun-soft)', descr: '查看会话 / 转人工处理 / FAQ反馈', perms: ['数据看板', '知识库'], access: [1, 3, 0, 0, 0, 0, 0, 0] },
];

const matrix = ['数据看板', '知识库管理', '活动配置', '券码管理', '消息推送', '文旅专线', '用户会员', '角色权限'];
const lvl = { 0: ['—', 'gray'], 1: ['编辑', 'green'], 2: ['审核', 'blue'], 3: ['只读', 'sun'] };

export default function AdminRole() {
  const [roles, setRoles] = useState(FALLBACK);

  useEffect(() => {
    getJSON('/api/roles').then((d) => { if (Array.isArray(d) && d.length) setRoles(d); }).catch(() => {});
  }, []);

  return (
    <Admin active="role" crumb="用户与权限 / 角色权限" title="角色权限管理"
      actions={<button className="adm-btn primary"><AIcon n="plus" s={15} c="#fff" />新建角色</button>}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 14, marginBottom: 16 }}>
        {roles.map((r) => (
          <div key={r.id} className="adm-card" style={{ padding: '15px 17px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: r.color_bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><AIcon n="shield" s={21} c={r.color} /></div>
              <div><div style={{ fontWeight: 800, fontSize: 14.5, color: 'var(--ink)' }}>{r.name}</div><div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--ink-3)' }}>{r.members} 名成员</div></div>
            </div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-2)', marginTop: 11, lineHeight: 1.5, minHeight: 34 }}>{r.descr}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 10, paddingTop: 11, borderTop: '1px solid var(--line)' }}>
              {r.perms.slice(0, 4).map((p, j) => (<span key={j} className="adm-pill gray" style={{ fontSize: 10.5, padding: '2px 8px' }}>{p}</span>))}
              {r.perms.length > 4 && <span className="adm-pill gray" style={{ fontSize: 10.5, padding: '2px 8px' }}>+{r.perms.length - 4}</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="adm-card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '15px 18px 12px', display: 'flex', alignItems: 'center' }}>
          <div className="adm-sect"><AIcon n="shield" s={17} c="var(--sakura-deep)" />权限矩阵</div>
          <span style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 8 }}>{Object.values(lvl).map((l, i) => (<span key={i} className={'adm-pill ' + l[1]}>{l[0]}</span>))}</div>
        </div>
        <table className="adm-table">
          <thead>
            <tr>
              <th style={{ width: 150 }}>角色 \ 模块</th>
              {matrix.map((m, i) => (<th key={i} style={{ textAlign: 'center' }}>{m}</th>))}
            </tr>
          </thead>
          <tbody>
            {roles.map((r) => (
              <tr key={r.id}>
                <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 9, height: 9, borderRadius: 3, background: r.color }} /><span style={{ fontWeight: 800 }}>{r.name}</span></div></td>
                {(r.access || []).map((a, j) => (
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
        <AIcon n="shield" s={15} c="var(--ink-3)" />角色权限隔离，所有配置、审核、券码、推送操作均记录操作日志，可审计可追溯。
      </div>
    </Admin>
  );
}
