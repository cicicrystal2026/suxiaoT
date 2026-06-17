import { Admin, AIcon } from '../../components/admin';

const MASCOT = import.meta.env.BASE_URL + 'assets/suxiaot-sm.png';

const rows = [
  ['樱花专列今日发车提醒',     '出行提醒', '通勤族 · 订阅用户', '已发送', 'green', '12,840', '38.2%', '06-15 07:00'],
  ['太湖亲子游 · 周末套票上新', '活动推广', '亲子/家庭游客',    '已发送', 'green', '8,210',  '24.6%', '06-14 10:00'],
  ['夏荷季集章活动预告',        '活动推广', '全部会员',          '待发送', 'sun',   '—',      '—',     '06-20 09:00'],
  ['苏州话语音导览上线',        '功能通知', '银发用户',          '草稿',   'gray',  '—',      '—',     '未设置'],
  ['末班车时刻调整通知',        '出行提醒', '一号线订阅',        '已发送', 'green', '5,602',  '41.0%', '06-12 21:30'],
];

export default function AdminPush() {
  return (
    <Admin active="push" crumb="商业与触达 / 消息推送" title="消息推送"
      actions={<button className="adm-btn primary"><AIcon n="plus" s={15} c="#fff"/>新建推送</button>}>
      <div style={{ display: 'flex', gap: 14 }}>
        <div className="adm-card" style={{ flex: '0 0 360px', padding: '18px 20px', alignSelf: 'flex-start' }}>
          <div className="adm-sect" style={{ marginBottom: 14 }}><AIcon n="send" s={18} c="var(--sakura-deep)"/>新建推送</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-2)', marginBottom: 6 }}>推送标题</div>
          <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 10, padding: '11px 13px', fontSize: 13.5, fontWeight: 800, color: 'var(--ink)' }}>樱花专列今日发车提醒</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-2)', margin: '13px 0 6px' }}>推送人群</div>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {[['通勤族', true], ['亲子游客', false], ['银发用户', false], ['全部会员', false]].map((t, i) => (
              <span key={i} className={'adm-pill ' + (t[1] ? 'pink' : 'gray')} style={{ padding: '6px 12px', fontSize: 12 }}>{t[1] && '✓ '}{t[0]}</span>
            ))}
          </div>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-2)', margin: '13px 0 6px' }}>发送时间</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span className="adm-pill pink" style={{ padding: '6px 12px', fontSize: 12 }}>定时 06-15 07:00</span>
            <span className="adm-pill gray" style={{ padding: '6px 12px', fontSize: 12 }}>立即发送</span>
          </div>
          <div style={{ marginTop: 16, background: 'var(--navy)', borderRadius: 14, padding: '13px 14px', display: 'flex', gap: 11, alignItems: 'flex-start' }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg,var(--sakura),var(--sakura-deep))', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden', flex: '0 0 34px' }}>
              <img src={MASCOT} style={{ width: 32, marginBottom: -1 }} alt=""/>
            </div>
            <div style={{ flex: 1, color: '#fff' }}>
              <div style={{ fontSize: 12.5, fontWeight: 800 }}>苏小T导览</div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,.78)', marginTop: 3, lineHeight: 1.5 }}>🌸 樱花专列今日 7:30 首班发车，龙康路—秀岸段每7.5分一班，点我查实时到站～</div>
            </div>
          </div>
          <button className="adm-btn primary" style={{ width: '100%', justifyContent: 'center', marginTop: 14 }}><AIcon n="send" s={15} c="#fff"/>确认推送</button>
        </div>
        <div className="adm-card" style={{ flex: 1, overflow: 'hidden', alignSelf: 'flex-start' }}>
          <div style={{ padding: '15px 18px 12px', display: 'flex', alignItems: 'center' }}><div className="adm-sect"><AIcon n="clock" s={17} c="var(--blue)"/>推送记录</div><span style={{ flex: 1 }}/><span style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-3)' }}>近30天</span></div>
          <table className="adm-table">
            <thead><tr><th>推送内容</th><th style={{ width: 96 }}>类型</th><th style={{ width: 130 }}>人群</th><th style={{ width: 80 }}>状态</th><th style={{ width: 80 }}>触达</th><th style={{ width: 74 }}>点击率</th></tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td><div style={{ fontWeight: 800 }}>{r[0]}</div><div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', marginTop: 2 }}>{r[7]}</div></td>
                  <td><span className="adm-pill gray">{r[1]}</span></td>
                  <td style={{ color: 'var(--ink-2)', fontWeight: 700, fontSize: 12 }}>{r[2]}</td>
                  <td><span className={'adm-pill ' + r[4]}>{r[3] === '已发送' && '● '}{r[3]}</span></td>
                  <td className="adm-display" style={{ color: 'var(--ink)' }}>{r[5]}</td>
                  <td><span style={{ fontWeight: 800, color: r[6] === '—' ? 'var(--ink-3)' : '#5C7E2A' }}>{r[6]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Admin>
  );
}
