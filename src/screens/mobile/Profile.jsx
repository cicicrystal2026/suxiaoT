import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, Phone, Header, Toggle } from '../../components';
import { getJSON } from '../../lib/api';
import { currentUser, logout } from '../../lib/auth';

const MASCOT = import.meta.env.BASE_URL + 'assets/suxiaot-sm.png';

export default function Profile() {
  const navigate = useNavigate();
  const [me, setMe] = useState(null);
  const [sum, setSum] = useState(null);
  const loggedIn = !!currentUser();

  useEffect(() => {
    if (!loggedIn) return;
    getJSON('/api/auth/me').then(setMe).catch(() => {});
    getJSON('/api/me/summary').then(setSum).catch(() => {});
  }, [loggedIn]);

  const groups = [
    [['bell', '我的订阅', '通勤路线·活动提醒', 'var(--sakura-deep)', 'var(--sakura-soft)'],
     ['heart', '我的收藏', '景点·路线·攻略', '#4A78C9', '#E7EEFA'],
     ['coupon', '我的优惠券', `${sum?.coupons ?? 0} 张可用`, '#C58A2E', 'var(--sun-soft)']],
    [['scan', '打卡集章', `已集 ${sum?.stamps ?? 0} 个`, 'var(--sakura-deep)', 'var(--sakura-soft)'],
     ['gift', '兑换记录', `已兑换 ${sum?.redemptions ?? 0} 件`, 'var(--leaf-deep)', 'var(--leaf-soft)'],
     ['headset', '帮助与客服', '7×24在线', '#4A78C9', '#E7EEFA']],
  ];

  const doLogout = () => { logout(); navigate('/realname'); };

  return (
    <Phone head={<Header title="我的" right={<Icon n="grid" s={20} />} />} brandProps={{ label: '有问题随时问苏小T' }}>
      <div style={{ marginTop: 2, borderRadius: 20, padding: '15px 16px', background: 'linear-gradient(120deg,var(--sakura-tint),var(--leaf-soft))', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: 13 }}>
        <div style={{ width: 58, height: 58, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}><img src={MASCOT} style={{ width: 56, marginBottom: -3 }} /></div>
        {loggedIn ? (
          <div style={{ flex: 1 }}>
            <div className="sx-display" style={{ fontSize: 19 }}>{me?.name || '苏州出行用户'}</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 5 }}>
              <span className={'sx-pill ' + (me?.realname === '已实名' ? 'leaf' : 'sun')}>{me?.realname || '未实名'}</span>
              {me?.phone && <span className="sx-pill pink">{me.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</span>}
            </div>
          </div>
        ) : (
          <div style={{ flex: 1 }} onClick={() => navigate('/realname')}>
            <div className="sx-display" style={{ fontSize: 19 }}>点此登录 / 实名</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 5 }}><span className="sx-pill sun">未登录</span></div>
          </div>
        )}
        <Icon n="chevR" s={18} c="var(--ink-3)" />
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
        {[['集章', sum?.stamps != null ? String(sum.stamps) : '0', '个'], ['持券', sum?.coupons != null ? String(sum.coupons) : '0', '张'], ['积分', sum?.points != null ? sum.points.toLocaleString() : '1,280', '分']].map((s, i) => (
          <div key={i} className="sx-card" style={{ flex: 1, padding: '11px 0', textAlign: 'center' }}>
            <div className="sx-display" style={{ fontSize: 20, color: 'var(--ink)' }}>{s[1]}<span style={{ fontSize: 11, color: 'var(--ink-3)' }}> {s[2]}</span></div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 800, marginTop: 1 }}>{s[0]}</div>
          </div>
        ))}
      </div>
      {groups.map((g, gi) => (
        <div key={gi} className="sx-card" style={{ marginTop: 12, padding: '2px 14px' }}>
          {g.map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < g.length - 1 ? '1px solid var(--line)' : 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: m[4], display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n={m[0]} s={19} c={m[3]} /></div>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 14 }}>{m[1]}</div><div style={{ fontSize: 11.5, color: 'var(--ink-3)', fontWeight: 700 }}>{m[2]}</div></div>
              <Icon n="chevR" s={16} c="var(--ink-3)" />
            </div>
          ))}
        </div>
      ))}
      <div style={{ marginTop: 10, background: 'linear-gradient(120deg,#fff,var(--sun-soft))', border: '1px solid var(--line)', borderRadius: 16, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 11 }}>
        <div style={{ width: 36, height: 36, borderRadius: 11, background: 'var(--sun-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: '#C58A2E' }}>大</span></div>
        <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 14 }}>适老化 · 大字语音模式</div><div style={{ fontSize: 11.5, color: 'var(--ink-3)', fontWeight: 700 }}>放大文字、语音优先，长辈更好用</div></div>
        <Toggle on={false} />
      </div>
      {loggedIn && (
        <div onClick={doLogout} className="sx-card" style={{ marginTop: 12, padding: '13px 0', textAlign: 'center', fontWeight: 800, fontSize: 14, color: 'var(--sakura-deep)', cursor: 'pointer' }}>退出登录</div>
      )}
    </Phone>
  );
}
