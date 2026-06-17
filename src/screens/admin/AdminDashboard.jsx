import { useState, useEffect } from 'react';
import { Admin, AStat, AIcon } from '../../components/admin';
import { getJSON } from '../../lib/api';

const FALLBACK = {
  kpis: [
    { label: '今日咨询量', value: '1,284', unit: '次', delta: '12.4%', up: true, icon: 'headset', color: 'var(--sakura-deep)', bg: 'var(--sakura-soft)' },
    { label: '问答自主解决率', value: '87.6', unit: '%', delta: '2.1%', up: true, icon: 'check', color: '#5C7E2A', bg: 'var(--leaf-soft)' },
    { label: '进行中活动', value: '3', unit: '个', icon: 'route', color: 'var(--blue)', bg: 'var(--blue-soft)' },
    { label: '券核销 GMV', value: '¥38.2k', delta: '1.2%', up: false, icon: 'ticket', color: '#A9772A', bg: 'var(--sun-soft)' },
  ],
  intents: [['出行查询', '46%', 46, 'var(--sakura)'], ['文旅问答', '28%', 28, 'var(--leaf)'], ['客服工单', '18%', 18, 'var(--blue)'], ['转人工', '8%', 8, 'var(--sun)']],
  trend: [42, 58, 51, 73, 66, 88, 95],
  hotQuestions: [
    { q: '樱花专列几点有？', hits: 312, coverage: '已覆盖' },
    { q: '末班车时间', hits: 268, coverage: '已覆盖' },
    { q: '到太湖怎么坐', hits: 201, coverage: '已覆盖' },
    { q: '站台失物招领', hits: 142, coverage: '转人工' },
    { q: '宠物能否乘车', hits: 98, coverage: '待补充' },
  ],
  kbPending: 1,
};

const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const w = 560, h = 150, max = 100;
const covColor = (c) => (c === '已覆盖' ? 'green' : c === '转人工' ? 'blue' : 'sun');

export default function AdminDashboard() {
  const [d, setD] = useState(FALLBACK);
  const [live, setLive] = useState(false);

  useEffect(() => {
    getJSON('/api/dashboard').then((x) => { if (x && x.kpis) { setD(x); setLive(true); } }).catch(() => {});
  }, []);

  const path = d.trend.map((v, i) => `${(i / (d.trend.length - 1)) * w},${h - (v / max) * h}`).join(' ');

  return (
    <Admin active="dashboard" crumb="数据中心 / 数据看板" title="数据看板"
      actions={<><span className={'adm-pill ' + (live ? 'green' : 'gray')}>{live ? '● 已连后端' : '离线演示'}</span><button className="adm-btn ghost" style={{ marginLeft: 8 }}><AIcon n="clock" s={15} />近7天</button></>}>
      <div style={{ display: 'flex', gap: 14 }}>
        {d.kpis.map((k, i) => <AStat key={i} {...k} />)}
      </div>
      <div style={{ display: 'flex', gap: 14, marginTop: 14 }}>
        <div className="adm-card" style={{ flex: '1 1 0', padding: '17px 19px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="adm-sect"><AIcon n="chart" s={18} c="var(--sakura-deep)" />咨询量趋势</div>
            <span style={{ flex: 1 }} />
            <span className="adm-pill pink">咨询量</span><span className="adm-pill gray" style={{ marginLeft: 6 }}>转人工</span>
          </div>
          <svg viewBox={`0 0 ${w} ${h + 24}`} style={{ width: '100%', height: 170, marginTop: 8 }} preserveAspectRatio="none">
            <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#EE7FA8" stopOpacity=".28" /><stop offset="1" stopColor="#EE7FA8" stopOpacity="0" /></linearGradient></defs>
            {[0, .33, .66, 1].map((g, i) => <line key={i} x1="0" y1={h * g} x2={w} y2={h * g} stroke="#EFEAE1" strokeWidth="1" />)}
            <polygon points={`0,${h} ${path} ${w},${h}`} fill="url(#ag)" />
            <polyline points={path} fill="none" stroke="#E05E8E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {d.trend.map((v, i) => <circle key={i} cx={(i / (d.trend.length - 1)) * w} cy={h - (v / max) * h} r="3.5" fill="#fff" stroke="#E05E8E" strokeWidth="2" />)}
            {days.map((day, i) => <text key={i} x={(i / (days.length - 1)) * w} y={h + 18} fontSize="11" fontWeight="700" fill="#97A0B6" textAnchor={i === 0 ? 'start' : i === days.length - 1 ? 'end' : 'middle'}>{day}</text>)}
          </svg>
        </div>
        <div className="adm-card" style={{ flex: '0 0 340px', padding: '17px 19px' }}>
          <div className="adm-sect"><AIcon n="layers" s={18} c="var(--blue)" />咨询意图分布</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13, marginTop: 16 }}>
            {d.intents.map((r, i) => (
              <div key={i}>
                <div style={{ display: 'flex', fontSize: 12.5, fontWeight: 800, marginBottom: 5 }}>
                  <span style={{ flex: 1, color: 'var(--ink-2)' }}>{r[0]}</span>
                  <span className="adm-display" style={{ color: 'var(--ink)' }}>{r[1]}</span>
                </div>
                <div style={{ height: 9, borderRadius: 999, background: 'var(--paper)', overflow: 'hidden' }}>
                  <div style={{ width: r[1], height: '100%', borderRadius: 999, background: r[3] }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18, background: 'var(--leaf-soft)', borderRadius: 12, padding: '11px 13px', fontSize: 12, fontWeight: 800, color: '#5C7E2A', lineHeight: 1.5 }}>
            ⚡ AI 自主解决 1,124 次，节省人工坐席约 18.7 小时
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 14, marginTop: 14 }}>
        <div className="adm-card" style={{ flex: '1 1 0', padding: '0' }}>
          <div style={{ padding: '15px 18px 11px', display: 'flex', alignItems: 'center' }}>
            <div className="adm-sect"><AIcon n="star" s={17} c="var(--sun)" />热门问题 Top5</div>
            <span style={{ flex: 1 }} /><span style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-3)' }}>近7天</span>
          </div>
          {d.hotQuestions.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 18px', borderTop: '1px solid var(--line)' }}>
              <span className="adm-display" style={{ fontSize: 16, color: i < 3 ? 'var(--sakura-deep)' : 'var(--ink-3)', width: 18 }}>{i + 1}</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 800, color: 'var(--ink)' }}>{r.q}</span>
              <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-3)' }}>{r.hits} 次</span>
              <span className={'adm-pill ' + covColor(r.coverage)} style={{ width: 64, justifyContent: 'center' }}>{r.coverage}</span>
            </div>
          ))}
        </div>
        <div className="adm-card" style={{ flex: '0 0 340px', padding: '15px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}><div className="adm-sect"><AIcon n="kb" s={17} c="var(--sakura-deep)" />知识库待审</div><span className="adm-pill pink" style={{ marginLeft: 'auto' }}>{d.kbPending} 条</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 14 }}>
            {[['文旅内容', '太湖湿地公园讲解词', '我方初稿'], ['客服FAQ', '发票开具流程更新', '双轨建库'], ['运营数据', '夏令时刻表调整', '客户提供']].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--paper)', borderRadius: 11, padding: '10px 12px' }}>
                <span className="adm-pill gray" style={{ flex: '0 0 auto' }}>{r[0]}</span>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r[1]}</div><div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--ink-3)' }}>{r[2]}</div></div>
                <AIcon n="chevR" s={15} c="var(--ink-3)" />
              </div>
            ))}
          </div>
          <button className="adm-btn ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 13 }}>前往审核</button>
        </div>
      </div>
    </Admin>
  );
}
