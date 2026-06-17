import { useState, useEffect } from 'react';
import { Admin, AStat, AIcon } from '../../components/admin';
import { getJSON } from '../../lib/api';

const FALLBACK = [
  { id: 1, name: '苏游游', phone: '138****8866', role: '会员', persona: '通勤族', points: 1280, coupons: 3, trips: 86, joined: '2026-06-15', realname: '已实名' },
  { id: 2, name: 'Lina_W', phone: '159****2031', role: '会员', persona: '亲子游客', points: 2460, coupons: 5, trips: 42, joined: '2026-06-15', realname: '已实名' },
  { id: 3, name: '游客_8f2a', phone: '—', role: '游客', persona: '—', points: 0, coupons: 0, trips: 2, joined: '2026-06-14', realname: '未实名' },
  { id: 4, name: '老周', phone: '136****7745', role: '会员', persona: '银发用户', points: 620, coupons: 1, trips: 158, joined: '2026-06-13', realname: '已实名' },
  { id: 5, name: '苏州小赵', phone: '187****9920', role: '会员', persona: '青年探店', points: 3150, coupons: 8, trips: 64, joined: '2026-06-13', realname: '已实名' },
  { id: 6, name: '游客_3c91', phone: '—', role: '游客', persona: '—', points: 0, coupons: 0, trips: 1, joined: '2026-06-12', realname: '未实名' },
  { id: 7, name: 'Amy陈', phone: '152****4408', role: '会员', persona: '外地游客', points: 880, coupons: 2, trips: 12, joined: '2026-06-11', realname: '已实名' },
];

export default function AdminUser() {
  const [rows, setRows] = useState(FALLBACK);
  const [live, setLive] = useState(false);

  useEffect(() => {
    getJSON('/api/users').then((d) => { if (Array.isArray(d) && d.length) { setRows(d); setLive(true); } }).catch(() => {});
  }, []);

  return (
    <Admin active="user" crumb="用户与权限 / 用户会员" title="用户会员管理"
      actions={<><button className="adm-btn ghost"><AIcon n="dl" s={15} />导出</button><button className="adm-btn ghost" style={{ marginLeft: 8 }}><AIcon n="filter" s={15} />筛选画像</button></>}>
      <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
        <AStat label="总用户" value="48,260" delta="6.8%" up icon="users" color="var(--sakura-deep)" bg="var(--sakura-soft)" />
        <AStat label="实名会员" value="31,840" delta="9.1%" up icon="shield" color="#5C7E2A" bg="var(--leaf-soft)" />
        <AStat label="今日活跃 DAU" value="5,124" delta="4.2%" up icon="chart" color="var(--blue)" bg="var(--blue-soft)" />
        <AStat label="会员实名率" value="66.0" unit="%" delta="3.0%" up icon="check" color="#A9772A" bg="var(--sun-soft)" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
        {['全部', '会员', '游客', '已实名', '未实名'].map((t, i) => (
          <span key={i} style={{ padding: '7px 15px', borderRadius: 999, fontSize: 13, fontWeight: 800, background: i === 0 ? 'var(--navy)' : '#fff', color: i === 0 ? '#fff' : 'var(--ink-2)', border: i === 0 ? 'none' : '1px solid var(--line)' }}>{t}</span>
        ))}
        <span style={{ flex: 1 }} />
        <span className={'adm-pill ' + (live ? 'green' : 'gray')}>{live ? '● 已连后端' : '离线演示'}</span>
        <div className="adm-search" style={{ margin: 0, width: 210 }}><AIcon n="search" s={16} c="var(--ink-3)" /><span>昵称 / 手机号 / UnionID</span></div>
      </div>
      <div className="adm-card" style={{ overflow: 'hidden' }}>
        <table className="adm-table">
          <thead><tr><th style={{ width: 150 }}>用户</th><th style={{ width: 120 }}>手机号</th><th style={{ width: 74 }}>身份</th><th style={{ width: 100 }}>人群画像</th><th style={{ width: 80 }}>积分</th><th style={{ width: 70 }}>持券</th><th style={{ width: 80 }}>出行次数</th><th style={{ width: 100 }}>实名状态</th><th style={{ width: 64 }}>操作</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: r.role === '游客' ? 'var(--paper)' : 'var(--sakura-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: r.role === '游客' ? 'var(--ink-3)' : 'var(--sakura-deep)', flex: '0 0 32px' }}>{r.name[0]}</div>
                    <span style={{ fontWeight: 800 }}>{r.name}</span>
                  </div>
                </td>
                <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--ink-2)', fontWeight: 700 }}>{r.phone}</td>
                <td><span className={'adm-pill ' + (r.role === '会员' ? 'pink' : 'gray')}>{r.role}</span></td>
                <td style={{ color: 'var(--ink-2)', fontWeight: 700, fontSize: 12 }}>{r.persona}</td>
                <td className="adm-display" style={{ color: 'var(--ink)' }}>{r.points.toLocaleString()}</td>
                <td style={{ fontWeight: 800 }}>{r.coupons}</td>
                <td style={{ fontWeight: 800 }}>{r.trips}</td>
                <td><span className={'adm-pill ' + (r.realname === '已实名' ? 'green' : 'gray')}>{r.realname === '已实名' && '● '}{r.realname}</span></td>
                <td><AIcon n="eye" s={17} c="var(--ink-3)" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}
