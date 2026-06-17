import { useState, useEffect } from 'react';
import { Admin, AStat, AIcon } from '../../components/admin';
import { getJSON, patchJSON } from '../../lib/api';

const FALLBACK = [
  { id: 1, name: '樱花专列', theme: '春樱', stations: '龙康路 · 文昌路 · 秀岸 · 何山桥 · 长江路 · 西洋山', stops: 6, price: '¥4 起', status: '上架', trips: '9,284' },
  { id: 2, name: '太湖亲子线', theme: '通用', stations: '狮子山 · 龙康路 · 秀岸 · 太湖湿地', stops: 4, price: '¥40 套票', status: '上架', trips: '3,150' },
  { id: 3, name: '沿线美食探店', theme: '通用', stations: '狮子山 · 文昌路 · 何山桥 · 长江路 · 西洋山', stops: 5, price: '含5张券', status: '上架', trips: '1,860' },
  { id: 4, name: '园林文化线', theme: '秋桂', stations: '狮子山 · 何山桥 · 长江路', stops: 3, price: '¥80 联票', status: '上架', trips: '920' },
  { id: 5, name: '夏荷骑行线', theme: '夏荷', stations: '秀岸 · 太湖湿地 · 贡山岛', stops: 3, price: '¥30 起', status: '待上架', trips: '—' },
];

const themeColor = (t) => (t === '春樱' ? 'pink' : t === '夏荷' || t === '秋桂' ? 'sun' : 'gray');

export default function AdminRoute() {
  const [rows, setRows] = useState(FALLBACK);
  const [live, setLive] = useState(false);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    getJSON('/api/routes').then((d) => { if (Array.isArray(d) && d.length) { setRows(d); setLive(true); } }).catch(() => {});
  }, []);

  const toggle = async (r) => {
    const next = r.status === '上架' ? '待上架' : '上架';
    setBusyId(r.id);
    setRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, status: next } : x)));
    try { const u = await patchJSON(`/api/routes/${r.id}`, { status: next }); setRows((rs) => rs.map((x) => (x.id === r.id ? u : x))); } catch {}
    finally { setBusyId(null); }
  };

  return (
    <Admin active="route" crumb="内容运营 / 文旅专线" title="文旅专线管理"
      actions={<button className="adm-btn primary"><AIcon n="plus" s={15} c="#fff" />新建专线</button>}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--blue-soft)', border: '1px solid #CFE0F5', borderRadius: 12, padding: '11px 15px', marginBottom: 16 }}>
        <AIcon n="route" s={18} c="var(--blue)" />
        <span style={{ fontSize: 12.5, fontWeight: 800, color: '#345C99' }}>专线聚焦一号线、二号线沿线，关联景点 / 商户 / 券 / 一键导航。配置后实时同步 C 端「文旅专线」。</span>
        <span style={{ flex: 1 }} />
        <span className={'adm-pill ' + (live ? 'green' : 'gray')}>{live ? '● 已连后端' : '离线演示'}</span>
      </div>
      <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
        <AStat label="在架专线" value={String(rows.filter((r) => r.status === '上架').length)} unit="条" icon="route" color="var(--sakura-deep)" bg="var(--sakura-soft)" />
        <AStat label="关联景点" value="32" unit="个" icon="pin" color="#5C7E2A" bg="var(--leaf-soft)" />
        <AStat label="入驻商户" value="46" unit="家" icon="gift" color="var(--blue)" bg="var(--blue-soft)" />
        <AStat label="专线带动出行" value="15.2k" unit="人次" delta="9.4%" up icon="users" color="#A9772A" bg="var(--sun-soft)" />
      </div>
      <div className="adm-card" style={{ overflow: 'hidden' }}>
        <table className="adm-table">
          <thead><tr><th style={{ width: 130 }}>专线名称</th><th style={{ width: 70 }}>主题</th><th>途经站点</th><th style={{ width: 60 }}>站数</th><th style={{ width: 100 }}>票价/套票</th><th style={{ width: 90 }}>状态</th><th style={{ width: 90 }}>带动出行</th><th style={{ width: 110 }}>操作</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td style={{ fontWeight: 800 }}>{r.name}</td>
                <td><span className={'adm-pill ' + themeColor(r.theme)}>{r.theme}</span></td>
                <td style={{ color: 'var(--ink-2)', fontWeight: 700, fontSize: 12, maxWidth: 300 }}>{r.stations}</td>
                <td className="adm-display" style={{ color: 'var(--ink)' }}>{r.stops}</td>
                <td style={{ fontWeight: 800, color: 'var(--sakura-deep)' }}>{r.price}</td>
                <td><span className={'adm-pill ' + (r.status === '上架' ? 'green' : 'sun')}>{r.status === '上架' && '● '}{r.status}</span></td>
                <td style={{ fontWeight: 800 }}>{r.trips}</td>
                <td>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'var(--ink-3)', opacity: busyId === r.id ? 0.5 : 1 }}>
                    {r.status === '上架'
                      ? <span className="adm-pill gray" style={{ cursor: 'pointer' }} onClick={() => toggle(r)}>下架</span>
                      : <span className="adm-pill green" style={{ cursor: 'pointer' }} onClick={() => toggle(r)}>上架</span>}
                    <AIcon n="edit" s={17} c="var(--blue)" /><AIcon n="trash" s={17} c="var(--rose)" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}
