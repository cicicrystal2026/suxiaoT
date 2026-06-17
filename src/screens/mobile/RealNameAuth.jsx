import { useNavigate } from 'react-router-dom';
import { Icon, StatusBar, Header, Mascot } from '../../components';

export default function RealNameAuth() {
  const navigate = useNavigate();
  return (
    <div className="sx-screen">
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 300, background: 'linear-gradient(180deg,var(--sakura-soft),var(--paper))' }}/>
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <StatusBar/>
        <Header title="实名升级" sub="领取你的专属权益"/>
        <div className="sx-body" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ textAlign: 'center', marginTop: 6 }}>
            <Mascot size={104} style={{ filter: 'drop-shadow(0 8px 12px rgba(37,53,89,.16))' }}/>
            <div className="sx-display" style={{ fontSize: 22, marginTop: 4, lineHeight: 1.3 }}>升级会员，解锁更多玩法</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-2)', marginTop: 5, lineHeight: 1.5, padding: '0 14px' }}>领券、集章、积分兑换需要实名认证<br/>一键授权，无需手动填写</div>
          </div>
          <div style={{ display: 'flex', gap: 9, marginTop: 16 }}>
            {[['coupon', '领优惠券', 'var(--sakura-deep)', 'var(--sakura-soft)'], ['qr', '沿线集章', 'var(--leaf-deep)', 'var(--leaf-soft)'], ['gift', '积分兑换', '#C58A2E', 'var(--sun-soft)']].map((b, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center', background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '12px 4px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: b[3], display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}><Icon n={b[0]} s={21} c={b[2]}/></div>
                <div style={{ fontWeight: 800, fontSize: 12, marginTop: 6 }}>{b[1]}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18, background: '#fff', border: '1px solid var(--line)', borderRadius: 18, padding: '16px 16px 14px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Icon n="user" s={18} c="var(--leaf-deep)"/>
              <span style={{ fontWeight: 800, fontSize: 13.5, color: 'var(--ink)' }}>微信手机号快速验证</span>
              <span style={{ flex: 1 }}/><span className="sx-pill leaf" style={{ padding: '3px 9px' }}>安全加密</span>
            </div>
            <div style={{ background: 'var(--paper)', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, border: '1px solid var(--line)' }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--leaf-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n="check" s={18} c="var(--leaf-deep)"/></div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 10.5, color: 'var(--ink-3)', fontWeight: 800 }}>本机号码</div><div style={{ fontWeight: 900, fontSize: 17, color: 'var(--ink)', letterSpacing: .5 }}>138 **** 8866</div></div>
            </div>
            <button className="sx-btn primary" style={{ width: '100%', marginTop: 13 }} onClick={() => navigate('/me')}><Icon n="check" s={18} c="#fff"/>一键授权并升级会员</button>
            <div style={{ textAlign: 'center', marginTop: 10, fontSize: 12, fontWeight: 800, color: 'var(--ink-2)' }}>使用其他手机号</div>
          </div>
          <div style={{ flex: 1 }}/>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, justifyContent: 'center', padding: '10px 0 4px', fontSize: 11, color: 'var(--ink-3)', fontWeight: 700, textAlign: 'center', lineHeight: 1.4 }}>
            <Icon n="check" s={13} c="var(--leaf-deep)"/>已阅读《用户协议》《隐私政策》· 信息加密存储，符合实名制要求
          </div>
        </div>
      </div>
    </div>
  );
}
