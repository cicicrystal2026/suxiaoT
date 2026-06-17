import { Icon, StatusBar } from '../../components';
import { Composer, Bubble, ConvHead } from '../../components/Chat';

export default function CustomerService() {
  const faqs = ['樱花季几点有专列？', '站台丢东西怎么办？', '可以带宠物吗？', '怎么开发票？'];
  return (
    <div className="sx-screen">
      <StatusBar/>
      <ConvHead title="7×24 AI客服" sub="票务 · 失物 · 设施 · 文旅"/>
      <div className="sx-body" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'var(--leaf-soft)', border: '1px solid #E2EDC4', borderRadius: 16, padding: '10px 13px', marginBottom: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n="headset" s={20} c="var(--leaf-deep)"/></div>
          <div style={{ flex: 1, fontSize: 12.5, fontWeight: 800, color: 'var(--leaf-deep)', lineHeight: 1.4 }}>全天候在线 · 已覆盖50+常见问题<br/><span style={{ fontWeight: 700, color: 'var(--ink-2)' }}>复杂问题可一键转人工</span></div>
        </div>
        <Bubble>你好呀～票务、失物、站点设施、文旅活动都可以问我，需要的话也能帮你转接人工客服😊</Bubble>
        <Bubble me>樱花季几点有专列？</Bubble>
        <Bubble tail={false}>
          2026樱花季为<b style={{ color: 'var(--sakura-deep)' }}>3月15日–4月15日</b>，专列集中在1号线<b>龙康路–秀岸段</b>（6.5km樱花长廊），高峰每7.5分钟一班～
          <div style={{ display: 'flex', gap: 8, marginTop: 9 }}>
            <span className="sx-pill pink">🌸 赏樱路线</span><span className="sx-pill sun">活动详情</span>
          </div>
        </Bubble>
        <div style={{ marginTop: 'auto', paddingTop: 6 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-3)', marginBottom: 7 }}>大家都在问</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {faqs.map((t, i) => <span key={i} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 999, padding: '7px 13px', fontSize: 12.5, fontWeight: 800, color: 'var(--ink)', boxShadow: 'var(--shadow-sm)' }}>{t}</span>)}
          </div>
        </div>
      </div>
      <Composer ph="描述你的问题，或长按说话…"/>
    </div>
  );
}
