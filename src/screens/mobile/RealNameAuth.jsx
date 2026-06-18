import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, StatusBar, Header, Mascot } from '../../components';
import { sendCode, memberLogin } from '../../lib/auth';

export default function RealNameAuth() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [hint, setHint] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const timer = useRef(null);

  const getCode = async () => {
    setErr('');
    if (!/^1\d{10}$/.test(phone)) { setErr('请输入正确的 11 位手机号'); return; }
    try {
      const { devCode } = await sendCode(phone);
      setCode(devCode || '');                       // 开发模式自动回填验证码
      setHint(`验证码已发送（开发模式：${devCode}）`);
      setCooldown(60);
      clearInterval(timer.current);
      timer.current = setInterval(() => setCooldown((c) => { if (c <= 1) { clearInterval(timer.current); return 0; } return c - 1; }), 1000);
    } catch (e) { setErr(e.message || '发送失败'); }
  };

  const submit = async () => {
    if (busy) return;
    setErr('');
    if (!/^1\d{10}$/.test(phone)) { setErr('请输入正确的手机号'); return; }
    if (!code) { setErr('请输入验证码'); return; }
    setBusy(true);
    try {
      await memberLogin(phone, code, name.trim() || undefined);
      navigate('/me');
    } catch (e) { setErr(e.message || '认证失败'); }
    finally { setBusy(false); }
  };

  const field = { flex: 1, fontSize: 15, fontWeight: 800, color: 'var(--ink)', border: 'none', outline: 'none', background: 'transparent', minWidth: 0 };

  return (
    <div className="sx-screen">
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 300, background: 'linear-gradient(180deg,var(--sakura-soft),var(--paper))' }} />
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <StatusBar />
        <Header title="实名升级" sub="领取你的专属权益" />
        <div className="sx-body" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ textAlign: 'center', marginTop: 6 }}>
            <Mascot size={92} style={{ filter: 'drop-shadow(0 8px 12px rgba(37,53,89,.16))' }} />
            <div className="sx-display" style={{ fontSize: 21, marginTop: 4, lineHeight: 1.3 }}>升级会员，解锁更多玩法</div>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink-2)', marginTop: 5, lineHeight: 1.5, padding: '0 14px' }}>领券、集章、积分兑换需要实名认证</div>
          </div>
          <div style={{ display: 'flex', gap: 9, marginTop: 14 }}>
            {[['coupon', '领优惠券', 'var(--sakura-deep)', 'var(--sakura-soft)'], ['qr', '沿线集章', 'var(--leaf-deep)', 'var(--leaf-soft)'], ['gift', '积分兑换', '#C58A2E', 'var(--sun-soft)']].map((b, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center', background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '12px 4px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: b[3], display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}><Icon n={b[0]} s={21} c={b[2]} /></div>
                <div style={{ fontWeight: 800, fontSize: 12, marginTop: 6 }}>{b[1]}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, background: '#fff', border: '1px solid var(--line)', borderRadius: 18, padding: '16px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Icon n="user" s={18} c="var(--leaf-deep)" />
              <span style={{ fontWeight: 800, fontSize: 13.5, color: 'var(--ink)' }}>手机号验证</span>
              <span style={{ flex: 1 }} /><span className="sx-pill leaf" style={{ padding: '3px 9px' }}>安全加密</span>
            </div>
            <div style={{ background: 'var(--paper)', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, border: '1px solid var(--line)' }}>
              <span style={{ fontWeight: 800, color: 'var(--ink-3)', fontSize: 14 }}>+86</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))} placeholder="请输入手机号" inputMode="numeric" style={field} />
            </div>
            <div style={{ background: 'var(--paper)', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, border: '1px solid var(--line)', marginTop: 10 }}>
              <Icon n="check" s={18} c="var(--leaf-deep)" />
              <input value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="验证码" inputMode="numeric" style={field} />
              <span onClick={cooldown ? undefined : getCode} style={{ fontSize: 12.5, fontWeight: 800, color: cooldown ? 'var(--ink-3)' : 'var(--sakura-deep)', cursor: cooldown ? 'default' : 'pointer', whiteSpace: 'nowrap' }}>
                {cooldown ? `${cooldown}s 后重发` : '获取验证码'}
              </span>
            </div>
            <div style={{ background: 'var(--paper)', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, border: '1px solid var(--line)', marginTop: 10 }}>
              <Icon n="user" s={18} c="var(--ink-3)" />
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="真实姓名（实名，选填）" style={field} />
            </div>
            {hint && <div style={{ marginTop: 9, fontSize: 11.5, fontWeight: 700, color: 'var(--leaf-deep)' }}>{hint}</div>}
            {err && <div style={{ marginTop: 9, fontSize: 12, fontWeight: 800, color: 'var(--sakura-deep)' }}>⚠️ {err}</div>}
            <button className="sx-btn primary" style={{ width: '100%', marginTop: 13, opacity: busy ? 0.6 : 1 }} onClick={submit}><Icon n="check" s={18} c="#fff" />{busy ? '认证中…' : '授权并升级会员'}</button>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, justifyContent: 'center', padding: '10px 0 4px', fontSize: 11, color: 'var(--ink-3)', fontWeight: 700, textAlign: 'center', lineHeight: 1.4 }}>
            <Icon n="check" s={13} c="var(--leaf-deep)" />已阅读《用户协议》《隐私政策》· 信息加密存储，符合实名制要求
          </div>
        </div>
      </div>
    </div>
  );
}
