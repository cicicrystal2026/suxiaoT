import { useNavigate } from 'react-router-dom';
import AIcon from '../../components/admin/AIcon';

const MASCOT = import.meta.env.BASE_URL + 'assets/suxiaot-sm.png';

export default function AdminLogin() {
  const navigate = useNavigate();
  return (
    <div className="adm" style={{ padding: 0 }}>
      <div style={{ flex: '0 0 560px', background: 'linear-gradient(150deg,#16203A 0%,#243456 55%,#3A2C52 100%)', position: 'relative', overflow: 'hidden', color: '#fff', padding: '56px 52px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'absolute', width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle,rgba(238,127,168,.32),transparent 70%)', right: -90, top: -70 }}/>
        <div style={{ position: 'absolute', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle,rgba(127,166,60,.22),transparent 70%)', left: -70, bottom: 40 }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 13, position: 'relative' }}>
          <div style={{ width: 50, height: 50, borderRadius: 15, background: 'linear-gradient(135deg,#EE7FA8,#E05E8E)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 6px 16px rgba(224,94,142,.45)' }}><img src={MASCOT} style={{ width: 48, marginBottom: -2 }} alt=""/></div>
          <div><div className="adm-display" style={{ fontSize: 22 }}>苏小T · 运营平台</div><div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,.55)' }}>苏州高新有轨电车 · AI导览管理后台</div></div>
        </div>
        <div style={{ flex: 1 }}/>
        <div style={{ position: 'relative' }}>
          <img src={MASCOT} style={{ width: 120, marginBottom: 14, filter: 'drop-shadow(0 10px 20px rgba(0,0,0,.3))' }} alt=""/>
          <div className="adm-display" style={{ fontSize: 34, lineHeight: 1.3 }}>知识库 · 活动 · 券码<br/>推送 · 数据，一站管</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,.62)', marginTop: 14, lineHeight: 1.7 }}>纯软件、零硬件依赖，运营人员自助配置<br/>问答解决率 · 转化核销 · 客流数据实时看板</div>
        </div>
        <div style={{ flex: 1 }}/>
        <div style={{ display: 'flex', gap: 24, position: 'relative', fontSize: 12.5, fontWeight: 800, color: 'rgba(255,255,255,.5)' }}>
          {[['85%+', '问答解决率'], ['7×24', 'AI在线'], ['一人一号', '可核验溯源']].map((s, i) => (
            <div key={i}><div className="adm-display" style={{ fontSize: 22, color: '#fff' }}>{s[0]}</div>{s[1]}</div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper)' }}>
        <div style={{ width: 368 }}>
          <div className="adm-display" style={{ fontSize: 26, color: 'var(--ink)' }}>欢迎回来 👋</div>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink-2)', marginTop: 5 }}>请登录你的运营管理账号</div>
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--ink-2)', marginBottom: 7 }}>账号</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: '#fff', border: '1px solid var(--line)', borderRadius: 12, padding: '13px 15px' }}>
              <AIcon n="users" s={18} c="var(--ink-3)"/><span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>operator@sztram</span>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--ink-2)', marginBottom: 7 }}>密码</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: '#fff', border: '1px solid var(--line)', borderRadius: 12, padding: '13px 15px' }}>
              <AIcon n="shield" s={18} c="var(--ink-3)"/><span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: 3 }}>••••••••</span><AIcon n="eye" s={18} c="var(--ink-3)"/>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 16, fontSize: 12.5, fontWeight: 800, color: 'var(--ink-2)' }}>
            <div style={{ width: 18, height: 18, borderRadius: 5, background: 'var(--sakura)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 7 }}><AIcon n="check" s={13} c="#fff"/></div>
            记住登录状态<span style={{ flex: 1 }}/><span style={{ color: 'var(--sakura-deep)' }}>忘记密码？</span>
          </div>
          <button className="adm-btn primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: 22, fontSize: 15 }} onClick={() => navigate('/admin/dashboard')}>登录平台</button>
          <div style={{ textAlign: 'center', marginTop: 18, fontSize: 12, fontWeight: 700, color: 'var(--ink-3)' }}>角色权限由系统管理员分配 · 操作全程审计</div>
        </div>
      </div>
    </div>
  );
}
