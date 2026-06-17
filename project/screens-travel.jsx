// screens-travel.jsx — AI文旅路线推荐 / 文旅商业导览 / 景点攻略详情

/* ============ AI 文旅路线推荐 ============ */
function RouteRec(){
  const steps=[
    {ic:'tram',c:'var(--sakura-deep)',cb:'var(--sakura-soft)',t:'狮子山站 上车',d:'1号线 往西洋山方向',meta:'09:30'},
    {ic:'route',c:'#4A78C9',cb:'#E7EEFA',t:'龙康路站 换乘',d:'同台换乘支线，步行0分钟',meta:'09:52'},
    {ic:'pin',c:'var(--leaf-deep)',cb:'var(--leaf-soft)',t:'秀岸站 下车',d:'沿樱花大道步行约500米',meta:'10:15'},
    {ic:'heart',c:'#C58A2E',cb:'var(--sun-soft)',t:'太湖湿地公园',d:'萌宠乐园·亲子首选，玩约2小时',meta:'10:25'},
  ];
  return (
    <Phone head={<Header title="AI文旅推荐" sub="苏小T为你定制" right={<Icon n="heart" s={20}/>}/>} brandProps={{label:'想改行程？直接告诉苏小T'}}>
      {/* intent recap */}
      <div style={{marginTop:2,background:'linear-gradient(120deg,#fff,var(--sakura-tint))',border:'1px solid var(--line)',borderRadius:18,padding:'12px 14px',boxShadow:'var(--shadow-sm)',display:'flex',gap:10,alignItems:'center'}}>
        <Mascot size={48}/>
        <div style={{flex:1}}>
          <div style={{fontSize:12.5,fontWeight:800,color:'var(--ink)',lineHeight:1.4}}>已按「周末 · 带小孩 · 去太湖」帮你规划👇</div>
          <div style={{display:'flex',gap:6,marginTop:6}}><span className="sx-pill pink">亲子</span><span className="sx-pill leaf">赏樱</span><span className="sx-pill sun">半日游</span></div>
        </div>
      </div>
      {/* summary strip */}
      <div style={{display:'flex',gap:9,marginTop:12}}>
        {[['全程','约3.5h'],['票价','¥4 起'],['步行','约800m']].map((s,i)=>(
          <div key={i} className="sx-card" style={{flex:1,padding:'10px 0',textAlign:'center'}}>
            <div style={{fontSize:10.5,color:'var(--ink-3)',fontWeight:800}}>{s[0]}</div>
            <div className="sx-display" style={{fontSize:16,color:'var(--ink)',marginTop:2}}>{s[1]}</div>
          </div>
        ))}
      </div>
      {/* timeline */}
      <div className="sx-sect" style={{fontSize:14,margin:'14px 0 10px'}}>🚋 推荐路线</div>
      <div style={{position:'relative',paddingLeft:6}}>
        {steps.map((s,i)=>(
          <div key={i} style={{display:'flex',gap:12,position:'relative',paddingBottom:i<steps.length-1?14:0}}>
            {i<steps.length-1&&<div style={{position:'absolute',left:18,top:38,bottom:0,width:2,background:'var(--line)'}}/>}
            <div style={{width:38,height:38,flex:'0 0 38px',borderRadius:13,background:s.cb,display:'flex',alignItems:'center',justifyContent:'center',zIndex:1}}><Icon n={s.ic} s={20} c={s.c}/></div>
            <div className="sx-card" style={{flex:1,padding:'10px 13px',display:'flex',alignItems:'center',gap:8}}>
              <div style={{flex:1}}><div style={{fontWeight:800,fontSize:14}}>{s.t}</div><div style={{fontSize:11.5,color:'var(--ink-2)',fontWeight:700,marginTop:1}}>{s.d}</div></div>
              <span style={{fontSize:11,fontWeight:800,color:'var(--sakura-deep)'}}>{s.meta}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{display:'flex',gap:10,marginTop:14}}>
        <button className="sx-btn primary" style={{flex:1}}><Icon n="pin" s={18} c="#fff"/>一键导航出发</button>
        <button className="sx-btn ghost" style={{flex:'0 0 auto',padding:'13px 16px'}}><Icon n="heart" s={18}/></button>
      </div>
    </Phone>
  );
}

/* ============ 文旅商业导览（景点·美食·商户券） ============ */
function CommerceGuide(){
  const tabs=['景点','美食','住宿','优惠券'];
  const items=[
    {ph:'太湖湿地公园',tag:'生态·亲子',c:'var(--leaf-soft)',cc:'var(--leaf-deep)',rate:'4.8',dist:'500m',price:'¥40'},
    {ph:'萌宠乐园',tag:'网红打卡',c:'var(--sakura-soft)',cc:'var(--sakura-deep)',rate:'4.6',dist:'650m',price:'¥58'},
    {ph:'贡山岛景区',tag:'湖景·骑行',c:'var(--sun-soft)',cc:'#C58A2E',rate:'4.7',dist:'1.2km',price:'免费'},
  ];
  return (
    <Phone head={<Header title="沿线攻略" sub="秀岸站 · 周边" right={<Icon n="pin" s={20}/>}/>} brandProps={{label:'要攻略？让苏小T一键生成'}}>
      {/* tabs */}
      <div style={{display:'flex',gap:8,marginTop:2}}>
        {tabs.map((t,i)=>(
          <span key={i} style={{padding:'8px 16px',borderRadius:999,fontSize:13.5,fontWeight:800,
            background:i===0?'var(--sakura)':'#fff',color:i===0?'#fff':'var(--ink-2)',
            border:i===0?'none':'1px solid var(--line)',boxShadow:i===0?'var(--shadow-pink)':'none'}}>{t}</span>
        ))}
      </div>
      {/* AI banner */}
      <div style={{marginTop:12,display:'flex',alignItems:'center',gap:10,background:'linear-gradient(120deg,var(--sakura-tint),var(--leaf-soft))',border:'1px solid var(--line)',borderRadius:16,padding:'11px 13px'}}>
        <Icon n="sparkle" s={22} c="var(--sakura-deep)"/>
        <div style={{flex:1,fontSize:12.5,fontWeight:800,color:'var(--ink)'}}>苏小T已为「秀岸站」整理 12 个好去处</div>
        <span style={{fontSize:12,fontWeight:800,color:'var(--sakura-deep)',display:'inline-flex',alignItems:'center'}}>生成攻略<Icon n="chevR" s={14} c="var(--sakura-deep)"/></span>
      </div>
      {/* list */}
      <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:11}}>
        {items.map((it,i)=>(
          <div key={i} className="sx-card" style={{padding:9,display:'flex',gap:11}}>
            <div className="sx-photo ph" data-ph={it.ph} style={{width:92,height:78,flex:'0 0 92px',borderRadius:13}}/>
            <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <div style={{display:'flex',alignItems:'center',gap:6}}><span style={{fontWeight:800,fontSize:15}}>{it.ph}</span></div>
              <div style={{display:'flex',alignItems:'center',gap:6,marginTop:4}}>
                <span className="sx-pill" style={{background:it.c,color:it.cc,padding:'3px 8px'}}>{it.tag}</span>
                <span style={{fontSize:11.5,fontWeight:800,color:'#C58A2E',display:'inline-flex',alignItems:'center',gap:2}}><Icon n="star" s={12} c="#F4C24A"/>{it.rate}</span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:5,marginTop:6}}>
                <Icon n="pin" s={13} c="var(--ink-3)"/><span style={{fontSize:11.5,fontWeight:700,color:'var(--ink-2)'}}>距站 {it.dist}</span>
                <span style={{flex:1}}/><span style={{fontSize:13,fontWeight:900,color:'var(--sakura-deep)'}}>{it.price}</span>
              </div>
            </div>
          </div>
        ))}
        {/* coupon */}
        <div style={{display:'flex',background:'linear-gradient(120deg,var(--sakura-deep),var(--sakura))',borderRadius:14,overflow:'hidden',boxShadow:'var(--shadow-pink)'}}>
          <div style={{flex:1,padding:'12px 14px',color:'#fff'}}>
            <div style={{fontWeight:900,fontSize:14}}>湿地公园咖啡 · 满30减10</div>
            <div style={{fontSize:11.5,fontWeight:700,opacity:.92,marginTop:2}}>电车票当日核销 · 限秀岸站周边</div>
          </div>
          <div style={{flex:'0 0 78px',borderLeft:'2px dashed rgba(255,255,255,.5)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
            <Icon n="coupon" s={22} c="#fff"/><span style={{fontSize:11,fontWeight:900,color:'#fff',marginTop:2}}>领取</span>
          </div>
        </div>
      </div>
    </Phone>
  );
}

/* ============ 景点 / 攻略详情页 ============ */
function AttractionDetail(){
  return (
    <div className="sx-screen">
      <SXStyle/>
      {/* hero */}
      <div style={{position:'absolute',top:0,left:0,right:0,height:280,overflow:'hidden'}}>
        <img src={TRAM} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(37,53,89,.4) 0%,transparent 35%,rgba(251,246,239,.15) 80%,var(--paper) 100%)'}}/>
      </div>
      <div style={{position:'relative',zIndex:2,display:'flex',flexDirection:'column',height:'100%'}}>
        <StatusBar/>
        <Header title="" back={true} onDark right={<Icon n="heart" s={20} c="#fff"/>}/>
        <div style={{flex:1}}/>
        <div style={{padding:'0 18px 0'}}>
          <span className="sx-pill pink" style={{marginBottom:8}}>🌸 当季必打卡</span>
          <div className="sx-display" style={{fontSize:28,color:'#fff',textShadow:'0 2px 12px rgba(0,0,0,.35)',lineHeight:1.15}}>太湖湿地公园</div>
        </div>
        {/* sheet */}
        <div style={{background:'var(--paper)',borderRadius:'24px 24px 0 0',marginTop:14,padding:'14px 16px 0',boxShadow:'0 -8px 24px rgba(37,53,89,.08)'}}>
          <div style={{display:'flex',gap:9}}>
            {[['距秀岸站','500m'],['评分','4.8'],['开放','08:30–17:30']].map((s,i)=>(
              <div key={i} style={{flex:1,textAlign:'center',background:'#fff',border:'1px solid var(--line)',borderRadius:14,padding:'8px 0'}}>
                <div style={{fontSize:10,color:'var(--ink-3)',fontWeight:800}}>{s[0]}</div>
                <div className="sx-display" style={{fontSize:15,color:'var(--ink)'}}>{s[1]}</div>
              </div>
            ))}
          </div>
          {/* 苏小T讲解 with dialect switch */}
          <div style={{marginTop:12,background:'linear-gradient(120deg,#fff,var(--sakura-tint))',border:'1px solid var(--line)',borderRadius:16,padding:'11px 13px',display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:42,height:42,borderRadius:'50%',background:'linear-gradient(135deg,var(--sakura),var(--sakura-deep))',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'var(--shadow-pink)'}}><Icon n="play" s={18} c="#fff"/></div>
            <div style={{flex:1}}>
              <div style={{fontWeight:800,fontSize:13.5}}>听苏小T讲这里的故事</div>
              <div style={{fontSize:11,color:'var(--ink-2)',fontWeight:700,marginTop:1}}>语音导览 · 1分20秒</div>
            </div>
            <div style={{display:'flex',background:'#fff',borderRadius:999,padding:3,border:'1px solid var(--line)'}}>
              <span style={{fontSize:11,fontWeight:800,color:'#fff',background:'var(--ink)',borderRadius:999,padding:'4px 9px'}}>普通话</span>
              <span style={{fontSize:11,fontWeight:800,color:'var(--ink-2)',padding:'4px 9px'}}>苏州话</span>
            </div>
          </div>
          {/* highlights */}
          <div className="sx-sect" style={{fontSize:14,margin:'13px 0 8px'}}>玩法亮点</div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {[['🌳','湿地栈道','沿湖步道，看芦苇与水鸟'],['🐰','萌宠乐园','亲子互动喂养，孩子最爱'],['🚲','环湖骑行','租车环太湖，约1小时']].map((h,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:11,background:'#fff',border:'1px solid var(--line)',borderRadius:13,padding:'9px 12px'}}>
                <span style={{fontSize:20}}>{h[0]}</span>
                <div style={{flex:1}}><div style={{fontWeight:800,fontSize:13.5}}>{h[1]}</div><div style={{fontSize:11.5,color:'var(--ink-3)',fontWeight:700}}>{h[2]}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{position:'absolute',left:16,right:16,bottom:30,zIndex:3}}>
        <button className="sx-btn primary" style={{width:'100%'}}><Icon n="pin" s={18} c="#fff"/>电车导航到这里</button>
      </div>
    </div>
  );
}

Object.assign(window,{RouteRec,CommerceGuide,AttractionDetail});
