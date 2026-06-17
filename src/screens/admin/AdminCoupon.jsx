import { Admin, AStat, AIcon } from '../../components/admin';

const rows = [
  ['CPN-2026-0312', '湿地公园咖啡 · 满30减10', '满减券', '湿地咖啡馆',   '5,000', '4,680', '320', '进行中', 'green'],
  ['CPN-2026-0298', '太湖湿地门票 · 8.5折',    '折扣券', '太湖湿地公园', '3,000', '2,140', '860', '进行中', 'green'],
  ['CPN-2026-0305', '苏小T文创 · 满100减20',   '文创券', '官方商城',     '2,000', '1,912', '88',  '进行中', 'green'],
  ['CPN-2026-0277', '萌宠乐园 · 亲子套票',     '套票券', '萌宠乐园',     '1,500', '1,500', '0',   '已抢光', 'sun'],
  ['CPN-2026-0260', '樱花旅拍 · 高清海报券',   '活动券', '官方',         '∞',     '6,204', '—',   '进行中', 'green'],
  ['CPN-2026-0231', '贡山岛骑行 · 立减15',     '满减券', '贡山岛景区',   '800',   '120',   '680', '已暂停', 'gray'],
];

export default function AdminCoupon() {
  return (
    <Admin active="coupon" crumb="商业与触达 / 券码管理" title="券码管理"
      actions={<><button className="adm-btn ghost"><AIcon n="dl" s={15}/>核销记录</button><button className="adm-btn primary" style={{ marginLeft: 8 }}><AIcon n="plus" s={15} c="#fff"/>新建券模板</button></>}>
      <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
        <AStat label="在架券模板" value="18" unit="个" icon="ticket" color="var(--sakura-deep)" bg="var(--sakura-soft)"/>
        <AStat label="累计发放" value="16.5k" unit="张" delta="8.2%" up icon="send" color="var(--blue)" bg="var(--blue-soft)"/>
        <AStat label="已核销" value="9,284" unit="张" delta="5.1%" up icon="check" color="#5C7E2A" bg="var(--leaf-soft)"/>
        <AStat label="核销率" value="56.3" unit="%" delta="2.0%" up icon="chart" color="#A9772A" bg="var(--sun-soft)"/>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
        {['全部', '进行中', '已抢光', '已暂停'].map((t, i) => (
          <span key={i} style={{ padding: '7px 15px', borderRadius: 999, fontSize: 13, fontWeight: 800, background: i === 0 ? 'var(--navy)' : '#fff', color: i === 0 ? '#fff' : 'var(--ink-2)', border: i === 0 ? 'none' : '1px solid var(--line)' }}>{t}</span>
        ))}
        <span style={{ flex: 1 }}/>
        <div className="adm-search" style={{ margin: 0, width: 210 }}><AIcon n="search" s={16} c="var(--ink-3)"/><span>券名称 / 编码 / 商户</span></div>
      </div>
      <div className="adm-card" style={{ overflow: 'hidden' }}>
        <table className="adm-table">
          <thead><tr><th style={{ width: 130 }}>券编码</th><th>券名称</th><th style={{ width: 80 }}>类型</th><th style={{ width: 120 }}>商户</th><th style={{ width: 74 }}>发放量</th><th style={{ width: 74 }}>已领</th><th style={{ width: 90 }}>库存</th><th style={{ width: 90 }}>状态</th><th style={{ width: 96 }}>操作</th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'monospace', fontSize: 11.5, color: 'var(--ink-3)', fontWeight: 700 }}>{r[0]}</td>
                <td style={{ fontWeight: 800 }}>{r[1]}</td>
                <td><span className="adm-pill gray">{r[2]}</span></td>
                <td style={{ color: 'var(--ink-2)', fontWeight: 700 }}>{r[3]}</td>
                <td className="adm-display" style={{ color: 'var(--ink)' }}>{r[4]}</td>
                <td style={{ color: 'var(--ink-2)' }}>{r[5]}</td>
                <td><span style={{ fontWeight: 800, color: r[6] === '0' ? 'var(--rose)' : 'var(--ink)' }}>{r[6]}</span></td>
                <td><span className={'adm-pill ' + r[8]}>{r[7] === '进行中' && '● '}{r[7]}</span></td>
                <td><div style={{ display: 'flex', gap: 9, color: 'var(--ink-3)' }}><AIcon n="chart" s={17} c="var(--blue)"/><AIcon n="edit" s={17}/><AIcon n="trash" s={17} c="var(--rose)"/></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}
