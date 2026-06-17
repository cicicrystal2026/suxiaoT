// screens-chat.jsx — 对话类页面：AI智能出行助手 / 7×24客服 / 苏小T拟人对话

function Composer({ph="和苏小T说说，去哪儿、坐哪班…",voice=true}){
  return (
    <>
      <div className="sx-brand" style={{height:60,gap:9,background:'#fff',padding:'0 10px'}}>
        <div className="av" style={{width:40,height:40,flex:'0 0 40px'}}><img src={MASCOT} alt=""/></div>
        <div style={{flex:1,display:'flex',alignItems:'center',gap:8,background:'var(--paper)',border:'1px solid var(--line)',borderRadius:999,padding:'9px 14px'}}>
          <span style={{flex:1,color:'var(--ink-3)',fontWeight:700,fontSize:13}}>{ph}</span>
          {voice&&<Icon n="mic" s={18} c="var(--ink-3)"/>}
        </div>
        <div className="mic" style={{width:44,height:44,flex:'0 0 44px'}}><Icon n="send" s={20} c="#fff"/></div>
      </div>
      <div className="sx-home"></div>
    </>
  );
}

function Bubble({me,children,tail=true}){
  if(me) return (
    <div style={{display:'flex',justifyContent:'flex-end',marginBottom:12}}>
      <div style={{maxWidth:'76%',background:'linear-gradient(135deg,var(--sakura),var(--sakura-deep))',color:'#fff',
        borderRadius:'18px 18px 5px 18px',padding:'10px 14px',fontSize:14.5,fontWeight:700,boxShadow:'var(--shadow-pink)',lineHeight:1.5}}>{children}</div>
    </div>
  );
  return (
    <div style={{display:'flex',gap:8,marginBottom:12,alignItems:'flex-end'}}>
      <div style={{width:34,height:34,flex:'0 0 34px',borderRadius:'50%',background:'var(--ink)',display:'flex',alignItems:'flex-end',justifyContent:'center',overflow:'hidden',boxShadow:'inset 0 0 0 2px #fff'}}>
        <img src={MASCOT} style={{width:36,marginBottom:-2}}/></div>
      <div style={{maxWidth:'80%',background:'#fff',border:'1px solid var(--line)',color:'var(--ink)',
        borderRadius:tail?'18px 18px 18px 5px':18,padding:'10px 13px',fontSize:14.5,fontWeight:600,boxShadow:'var(--shadow-sm)',lineHeight:1.55}}>{children}</div>
    </div>
  );
}

/* —— 到站结果卡片（嵌在AI回复里） —— */
function MiniArrival(){
  return (
    <div style={{marginTop:9,background:'var(--paper)',borderRadius:14,padding:'11px 12px',border:'1px solid var(--line)'}}>
      <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:8}}>
        <span className="sx-pill navy" style={{padding:'3px 9px'}}>1号线</span>
        <span style={{fontSize:12.5,fontWeight:800,color:'var(--ink)'}}>往 西洋山 方向</span>
        <span style={{flex:1}}/><span className="sx-pill leaf" style={{padding:'3px 8px'}}>● 畅通</span>
      </div>
      <div style={{display:'flex',alignItems:'baseline',gap:6}}>
        <span style={{fontFamily:'var(--font-display)',fontSize:30,color:'var(--sakura-deep)',lineHeight:1}}>5</span>
        <span style={{fontSize:13,fontWeight:800,color:'var(--ink)'}}>分钟后到 秀岸站</span>
        <span style={{flex:1}}/><span style={{fontSize:11,color:'var(--ink-3)',fontWeight:700}}>下班 17分钟</span>
      </div>
    </div>
  );
}

function ConvHead({title,sub}){
  return (
    <div className="sx-head">
      <div className="sx-back"><Icon n="back" s={22}/></div>
      <div className="ttl">{title}<small>{sub}</small></div>
      <div className="act"><Icon n="home" s={22}/></div>
    </div>
  );
}

/* ============ AI 智能出行助手 ============ */
function ChatAssistant(){
  return (
    <div className="sx-screen">
      <SXStyle/><StatusBar/>
      <ConvHead title="智能出行助手" sub="线路 · 到站 · 票价 · 换乘"/>
      <div className="sx-body" style={{display:'flex',flexDirection:'column'}}>
        <div style={{textAlign:'center',margin:'2px 0 12px'}}>
          <span style={{background:'var(--paper-2)',color:'var(--ink-2)',fontSize:11,fontWeight:800,padding:'4px 12px',borderRadius:999}}>今天 9:41 · 苏小T为你服务</span>
        </div>
        <Bubble>嗨，我是苏小T！🚋 问我线路、到站、票价或换乘都行～</Bubble>
        <Bubble me>下一班车什么时候到秀岸站？</Bubble>
        <Bubble>
          为你查到啦，秀岸站最新到站信息👇
          <MiniArrival/>
        </Bubble>
        <Bubble me>那狮子山站怎么换乘地铁？</Bubble>
        <Bubble tail={false}>在<b style={{color:'var(--sakura-deep)'}}>狮子山站</b>下车后步行约300米即到地铁1号线，跟着「换乘地铁」指示牌走就行～</Bubble>
        {/* quick chips */}
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:'auto',paddingTop:6}}>
          {['末班车几点','到太湖怎么走','今天票价','附近好吃的'].map((t,i)=>(
            <span key={i} style={{background:'#fff',border:'1px solid var(--line)',borderRadius:999,padding:'7px 13px',fontSize:12.5,fontWeight:800,color:'var(--ink)',boxShadow:'var(--shadow-sm)'}}>{t}</span>
          ))}
        </div>
      </div>
      <Composer/>
    </div>
  );
}

/* ============ 7×24 AI客服 ============ */
function CustomerService(){
  const faqs=['樱花季几点有专列？','站台丢东西怎么办？','可以带宠物吗？','怎么开发票？'];
  return (
    <div className="sx-screen">
      <SXStyle/><StatusBar/>
      <ConvHead title="7×24 AI客服" sub="票务 · 失物 · 设施 · 文旅"/>
      <div className="sx-body" style={{display:'flex',flexDirection:'column'}}>
        <div style={{display:'flex',alignItems:'center',gap:9,background:'var(--leaf-soft)',border:'1px solid #E2EDC4',borderRadius:16,padding:'10px 13px',marginBottom:12}}>
          <div style={{width:34,height:34,borderRadius:'50%',background:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}><Icon n="headset" s={20} c="var(--leaf-deep)"/></div>
          <div style={{flex:1,fontSize:12.5,fontWeight:800,color:'var(--leaf-deep)',lineHeight:1.4}}>全天候在线 · 已覆盖50+常见问题<br/><span style={{fontWeight:700,color:'var(--ink-2)'}}>复杂问题可一键转人工</span></div>
        </div>
        <Bubble>你好呀～票务、失物、站点设施、文旅活动都可以问我，需要的话也能帮你转接人工客服😊</Bubble>
        <Bubble me>樱花季几点有专列？</Bubble>
        <Bubble tail={false}>
          2026樱花季为<b style={{color:'var(--sakura-deep)'}}>3月15日–4月15日</b>，专列集中在1号线<b>龙康路–秀岸段</b>（6.5km樱花长廊），高峰每7.5分钟一班～
          <div style={{display:'flex',gap:8,marginTop:9}}>
            <span className="sx-pill pink">🌸 赏樱路线</span><span className="sx-pill sun">活动详情</span>
          </div>
        </Bubble>
        <div style={{marginTop:'auto',paddingTop:6}}>
          <div style={{fontSize:11,fontWeight:800,color:'var(--ink-3)',marginBottom:7}}>大家都在问</div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {faqs.map((t,i)=>(<span key={i} style={{background:'#fff',border:'1px solid var(--line)',borderRadius:999,padding:'7px 13px',fontSize:12.5,fontWeight:800,color:'var(--ink)',boxShadow:'var(--shadow-sm)'}}>{t}</span>))}
          </div>
        </div>
      </div>
      <Composer ph="描述你的问题，或长按说话…"/>
    </div>
  );
}

/* ============ 苏小T 拟人对话（IP互动） ============ */
function IPChat(){
  return (
    <div className="sx-screen">
      <SXStyle/>
      <div style={{position:'absolute',top:0,left:0,right:0,height:300,background:'linear-gradient(180deg,var(--sakura-soft),var(--paper))'}}/>
      <div style={{position:'relative',zIndex:2,display:'flex',flexDirection:'column',height:'100%'}}>
        <StatusBar/>
        <ConvHead title="苏小T · 电车侠" sub="你的专属出行搭子"/>
        <div className="sx-body" style={{display:'flex',flexDirection:'column'}}>
          <div style={{textAlign:'center',marginBottom:8}}>
            <div style={{position:'relative',display:'inline-block'}}>
              <div style={{position:'absolute',inset:'-8px',borderRadius:'50%',background:'radial-gradient(circle,rgba(238,127,168,.35),transparent 70%)'}}/>
              <Mascot size={96} style={{position:'relative',filter:'drop-shadow(0 8px 12px rgba(37,53,89,.18))'}}/>
            </div>
            <div className="sx-display" style={{fontSize:18,marginTop:2}}>苏小T <span style={{fontSize:12,color:'var(--leaf-deep)'}}>● 在线</span></div>
            <div style={{fontSize:11.5,color:'var(--ink-2)',fontWeight:700}}>已陪你坐了 12 趟车 · 一起逛了 5 个景点</div>
          </div>
          <Bubble>嘿嘿，又见面啦！今天想去哪玩？我可以陪你聊天，也能帮你生成专属打卡海报哦～📸</Bubble>
          <Bubble me>帮我做一张樱花打卡海报！</Bubble>
          <Bubble tail={false}>没问题！点下面「AI海报打卡」，选好你的照片和心情，我马上变出来✨</Bubble>
          <div style={{display:'flex',gap:9,marginTop:'auto',paddingTop:6}}>
            <div style={{flex:1,background:'#fff',border:'1px solid var(--line)',borderRadius:14,padding:'10px',display:'flex',alignItems:'center',gap:8,boxShadow:'var(--shadow-sm)'}}>
              <Icon n="camera" s={20} c="var(--sakura-deep)"/><span style={{fontSize:13,fontWeight:800}}>AI海报打卡</span></div>
            <div style={{flex:1,background:'#fff',border:'1px solid var(--line)',borderRadius:14,padding:'10px',display:'flex',alignItems:'center',gap:8,boxShadow:'var(--shadow-sm)'}}>
              <Icon n="gift" s={20} c="var(--leaf-deep)"/><span style={{fontSize:13,fontWeight:800}}>积分兑好礼</span></div>
          </div>
        </div>
        <Composer ph="和苏小T聊聊天…"/>
      </div>
    </div>
  );
}

Object.assign(window,{Composer,Bubble,MiniArrival,ConvHead,ChatAssistant,CustomerService,IPChat});
