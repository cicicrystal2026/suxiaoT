import { Icon, StatusBar } from '../../components';
import { Composer, Bubble, MiniArrival, ConvHead } from '../../components/Chat';

export default function ChatAssistant() {
  return (
    <div className="sx-screen">
      <StatusBar/>
      <ConvHead title="智能出行助手" sub="线路 · 到站 · 票价 · 换乘"/>
      <div className="sx-body" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ textAlign: 'center', margin: '2px 0 12px' }}>
          <span style={{ background: 'var(--paper-2)', color: 'var(--ink-2)', fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 999 }}>今天 9:41 · 苏小T为你服务</span>
        </div>
        <Bubble>嗨，我是苏小T！🚋 问我线路、到站、票价或换乘都行～</Bubble>
        <Bubble me>下一班车什么时候到秀岸站？</Bubble>
        <Bubble>
          为你查到啦，秀岸站最新到站信息👇
          <MiniArrival/>
        </Bubble>
        <Bubble me>那狮子山站怎么换乘地铁？</Bubble>
        <Bubble tail={false}>在<b style={{ color: 'var(--sakura-deep)' }}>狮子山站</b>下车后步行约300米即到地铁1号线，跟着「换乘地铁」指示牌走就行～</Bubble>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 6 }}>
          {['末班车几点', '到太湖怎么走', '今天票价', '附近好吃的'].map((t, i) => (
            <span key={i} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 999, padding: '7px 13px', fontSize: 12.5, fontWeight: 800, color: 'var(--ink)', boxShadow: 'var(--shadow-sm)' }}>{t}</span>
          ))}
        </div>
      </div>
      <Composer/>
    </div>
  );
}
