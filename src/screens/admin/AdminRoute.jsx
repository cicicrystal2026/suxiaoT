import { Admin, AStat, AIcon } from '../../components/admin';

const rows = [
  ['樱花专列',   '春樱', '龙康路 · 文昌路 · 秀岸 · 何山桥 · 长江路 · 西洋山', '6', '¥4 起',   '上架',  'green', '9,284'],
  ['太湖亲子线', '通用', '狮子山 · 龙康路 · 秀岸 · 太湖湿地',                   '4', '¥40 套票', '上架',  'green', '3,150'],
  ['沿线美食探店','通用', '狮子山 · 文昌路 · 何山桥 · 长江路 · 西洋山',          '5', '含5张券',  '上架',  'green', '1,860'],
  ['园林文化线', '秋桂', '狮子山 · 何山桥 · 长江路',                            '3', '¥80 联票', '上架',  'green', '920'],
  ['夏荷骑行线', '夏荷', '秀岸 · 太湖湿地 · 贡山岛',                            '3', '¥30 起',   '待上架','sun',   '—'],
];

export default function AdminRoute() {
  return (
    <Admin active="route" crumb="内容运营 / 文旅专线" title="文旅专线管理"
      actions={<button className="adm-btn primary"><AIcon n="plus" s={15} c="#fff"/>新建专线</button>}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--blue-soft)', border: '1px solid #CFE0F5', borderRadius: 12, padding: '11px 15px', marginBottom: 16 }}>
        <AIcon n="route" s={18} c="var(--blue)"/>
        <span style={{ fontSize: 12.5, fontWeight: 800, color: '#345C99' }}>专线聚焦一号线、二号线沿线，关联景点 / 商户 / 券 / 一键导航，避免泛数据。配置后实时同步 C 端「文旅专线」。</span>
      </div>
      <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
        <AStat label="在架专线" value="8" unit="条" icon="route" color="var(--sakura-deep)" bg="var(--sakura-soft)"/>
        <AStat label="关联景点" value="32" unit="个" icon="pin" color="#5C7E2A" bg="var(--leaf-soft)"/>
        <AStat label="入驻商户" value="46" unit="家" icon="gift" color="var(--blue)" bg="var(--blue-soft)"/>
        <AStat label="专线带动出行" value="15.2k" unit="人次" delta="9.4%" up icon="users" color="#A9772A" bg="var(--sun-soft)"/>
      </div>
      <div className="adm-card" style={{ overflow: 'hidden' }}>
        <table className="adm-table">
          <thead><tr><th style={{ width: 130 }}>专线名称</th><th style={{ width: 70 }}>主题</th><th>途经站点</th><th style={{ width: 60 }}>站数</th><th style={{ width: 100 }}>票价/套票</th><th style={{ width: 90 }}>状态</th><th style={{ width: 90 }}>带动出行</th><th style={{ width: 96 }}>操作</th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 800 }}>{r[0]}</td>
                <td><span className={'adm-pill ' + (r[1] === '春樱' ? 'pink' : r[1] === '夏荷' || r[1] === '秋桂' ? 'sun' : 'gray')}>{r[1]}</span></td>
                <td style={{ color: 'var(--ink-2)', fontWeight: 700, fontSize: 12, maxWidth: 300 }}>{r[2]}</td>
                <td className="adm-display" style={{ color: 'var(--ink)' }}>{r[3]}</td>
                <td style={{ fontWeight: 800, color: 'var(--sakura-deep)' }}>{r[4]}</td>
                <td><span className={'adm-pill ' + r[6]}>{r[5] === '上架' && '● '}{r[5]}</span></td>
                <td style={{ fontWeight: 800 }}>{r[7]}</td>
                <td><div style={{ display: 'flex', gap: 9, color: 'var(--ink-3)' }}><AIcon n="edit" s={17} c="var(--blue)"/><AIcon n="eye" s={17}/><AIcon n="trash" s={17} c="var(--rose)"/></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}
