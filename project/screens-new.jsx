// screens-new.jsx — 新增手机端页面（对齐 PRD V1.0）
// 行程规划输入 / 文旅专线 / 优惠券中心 / 四季IP主页 / 站台扫码服务 / 手机号一键实名

/* ============ M5 · AI行程规划 — 需求输入 (F-TR-01) ============ */
function TripPlanner(){
  const personas=[['亲子','👨‍👩‍👧','带娃出游'],['情侣','💑','二人世界'],['银发','🍵','慢游休闲'],['青年','🎒','打卡探店']];
  const prefs=['赏樱','亲子乐园','太湖湖景','美食探店','园林文化','拍照打卡','骑行'];
  return (
    <Phone head={<Header title="AI行程规划" sub="说一句，秒级出方案" right={<Icon n="route" s={20}/>}/>} brandProps={{label:'懒得选？直接语音说给苏小T'}}>
      {/* mascot prompt */}
      <div style={{marginTop:2,display:'flex',gap:11,alignItems:'center',background:'linear-gradient(120deg,#fff,var(--sakura-tint))',border:'1px solid var(--line)',borderRadius:18,padding:'12px 14px',boxShadow:'var(--shadow-sm)'}}>
        <Mascot size={50}/>
        <div style={{flex:1,fontSize:13,fontWeight:800,color:'var(--ink)',lineHeight:1.45}}>告诉我<span style={{color:'var(--sakura-deep)'}}>和谁去、玩多久、想看啥</span>，我帮你串成一条沿线路线～</div>
      </div>
      {/* persona */}
      <div className="sx-sect" style={{fontSize:14,margin:'15px 0 9px'}}>① 和谁一起</div>
      <div style={{display:'flex',gap:9}}>
        {personas.map((p,i)=>(
          <div key={i} style={{flex:1,textAlign:'center',borderRadius:15,padding:'11px 4px',
            background:i===0?'var(--sakura-soft)':'#fff',border:i===0?'2px solid var(--sakura)':'1px solid var(--line)',boxShadow:'var(--shadow-sm)'}}>
            <div style={{fontSize:24}}>{p[1]}</div>
            <div style={{fontWeight:800,fontSize:13,color:'var(--ink)',marginTop:3}}>{p[0]}</div>
            <div style={{fontSize:10,color:'var(--ink-3)',fontWeight:700}}>{p[2]}</div>
          </div>
        ))}
      </div>
      {/* duration */}
      <div className="sx-sect" style={{fontSize:14,margin:'15px 0 9px'}}>② 玩多久</div>
      <div style={{display:'flex',gap:9}}>
        {['半日（约3h）','一日（约6h）','只是路过看看'].map((t,i)=>(
          <span key={i} style={{flex:1,textAlign:'center',padding:'10px 4px',borderRadius:999,fontSize:13,fontWeight:800,
            background:i===1?'var(--sakura)':'#fff',color:i===1?'#fff':'var(--ink-2)',border:i===1?'none':'1px solid var(--line)',boxShadow:i===1?'var(--shadow-pink)':'none'}}>{t}</span>
        ))}
      </div>
      {/* prefs */}
      <div className="sx-sect" style={{fontSize:14,margin:'15px 0 9px'}}>③ 想体验（可多选）</div>
      <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
        {prefs.map((t,i)=>(
          <span key={i} style={{background:[0,2,3].includes(i)?'var(--leaf-soft)':'#fff',color:[0,2,3].includes(i)?'var(--leaf-deep)':'var(--ink-2)',
            border:[0,2,3].includes(i)?'1.5px solid var(--leaf)':'1px solid var(--line)',borderRadius:999,padding:'8px 14px',fontSize:13,fontWeight:800}}>
            {[0,2,3].includes(i)&&'✓ '}{t}</span>
        ))}
      </div>
      {/* free input */}
      <div style={{marginTop:15,background:'#fff',border:'1px solid var(--line)',borderRadius:16,padding:'12px 14px',boxShadow:'var(--shadow-sm)'}}>
        <div style={{fontSize:11.5,fontWeight:800,color:'var(--ink-3)',marginBottom:5}}>也可以直接一句话说需求</div>
        <div style={{fontSize:14,fontWeight:700,color:'var(--ink)'}}>“周末带娃去太湖边，想赏樱还能吃点东西”</div>
      </div>
      <button className="sx-btn primary" style={{width:'100%',marginTop:14}}><Icon n="sparkle" s={18} c="#fff"/>生成我的专属行程</button>
    </Phone>
  );
}

/* ============ M7 · 文旅专线 (F-BIZ-01) ============ */
function ThemeRoutes(){
  const tabs=['当季 · 春','全部主题','亲子','美食'];
  const routes=[
    {ph:'樱花专列',tag:'当季主推',c:'var(--sakura-soft)',cc:'var(--sakura-deep)',stops:'6站',dur:'约3h',price:'¥4 起',rate:'4.9',badge:'🌸',hot:true},
    {ph:'太湖亲子线',tag:'亲子首选',c:'var(--leaf-soft)',cc:'var(--leaf-deep)',stops:'4站',dur:'约5h',price:'¥40 套票',rate:'4.8',badge:'🐰'},
    {ph:'沿线美食探店',tag:'吃货必备',c:'var(--sun-soft)',cc:'#C58A2E',stops:'5站',dur:'约4h',price:'含5张券',rate:'4.7',badge:'🍜'},
    {ph:'园林文化线',tag:'文化深度',c:'#E7EEFA',cc:'#4A78C9',stops:'3站',dur:'约4h',price:'¥80 联票',rate:'4.8',badge:'🏯'},
  ];
  return (
    <Phone head={<Header title="文旅专线" sub="苏小T精选 · 一号/二号线" right={<Icon n="search" s={20}/>}/>} brandProps={{label:'想坐哪条线？问苏小T'}}>
      <div style={{display:'flex',gap:8,marginTop:2,overflow:'hidden'}}>
        {tabs.map((t,i)=>(<span key={i} style={{whiteSpace:'nowrap',padding:'8px 15px',borderRadius:999,fontSize:13,fontWeight:800,
          background:i===0?'var(--sakura)':'#fff',color:i===0?'#fff':'var(--ink-2)',border:i===0?'none':'1px solid var(--line)',boxShadow:i===0?'var(--shadow-pink)':'none'}}>{t}</span>))}
      </div>
      {/* hero route */}
      <div style={{marginTop:10,borderRadius:20,overflow:'hidden',position:'relative',boxShadow:'var(--shadow-sm)',height:118}}>
        <img src={TRAM} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(37,53,89,.78) 0%,rgba(37,53,89,.1) 75%)'}}/>
        <div style={{position:'absolute',left:16,top:0,bottom:0,display:'flex',flexDirection:'column',justifyContent:'center',gap:7}}>
          <span className="sx-pill pink" style={{alignSelf:'flex-start'}}>🌸 6.5km 樱花长廊</span>
          <div className="sx-display" style={{color:'#fff',fontSize:21,lineHeight:1.2}}>樱花专列<br/>一路追春到太湖</div>
          <div style={{display:'flex',gap:10,color:'#fff',fontSize:12,fontWeight:800}}><span>龙康路→秀岸 · 6站</span><span>·</span><span>每7.5分一班</span></div>
        </div>
      </div>
      {/* route list */}
      <div style={{marginTop:11,display:'flex',flexDirection:'column',gap:9}}>
        {routes.map((r,i)=>(
          <div key={i} className="sx-card" style={{padding:10,display:'flex',gap:11}}>
            <div className="sx-photo ph" data-ph={r.ph} style={{width:76,height:76,flex:'0 0 76px',borderRadius:13,background:r.c,position:'relative'}}>
              <span style={{position:'absolute',top:6,left:7,fontSize:18}}>{r.badge}</span></div>
            <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <div style={{display:'flex',alignItems:'center',gap:6}}>
                <span style={{fontWeight:800,fontSize:15.5}}>{r.ph}</span>
                {r.hot&&<span className="sx-pill pink" style={{padding:'2px 8px'}}>HOT</span>}
              </div>
              <div style={{display:'flex',alignItems:'center',gap:6,marginTop:5}}>
                <span className="sx-pill" style={{background:r.c,color:r.cc,padding:'3px 8px'}}>{r.tag}</span>
                <span style={{fontSize:11.5,fontWeight:800,color:'#C58A2E',display:'inline-flex',alignItems:'center',gap:2}}><Icon n="star" s={12} c="#F4C24A"/>{r.rate}</span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8,marginTop:7,fontSize:11.5,fontWeight:700,color:'var(--ink-2)'}}>
                <span>{r.stops}</span><span>·</span><span>{r.dur}</span><span style={{flex:1}}/><span style={{fontSize:13.5,fontWeight:900,color:'var(--sakura-deep)'}}>{r.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Phone>
  );
}

/* ============ M10 · 优惠券中心 / 我的券包 (F-BIZ-01) ============ */
function CouponCenter(){
  const tabs=['可领取','我的券 (3)','已使用'];
  const coupons=[
    {t:'湿地公园咖啡',d:'满30减10 · 当日电车票核销',v:'10',unit:'¥',type:'商户券',c:'var(--sakura)',cc:'var(--sakura-deep)',sub:'剩 320 张'},
    {t:'太湖湿地公园门票',d:'景区门票 · 立减优惠',v:'8.5',unit:'折',type:'票务券',c:'var(--leaf-deep)',cc:'var(--leaf-deep)',sub:'限本周末'},
    {t:'苏小T文创周边',d:'积分商城通用 · 满100可用',v:'20',unit:'¥',type:'文创券',c:'#C58A2E',cc:'#C58A2E',sub:'剩 88 张'},
    {t:'樱花季旅拍',d:'AI合影海报高清版 · 免费',v:'FREE',unit:'',type:'活动券',c:'#4A78C9',cc:'#4A78C9',sub:'人人可领'},
  ];
  return (
    <Phone head={<Header title="优惠券" sub="坐电车 · 领好券" right={<Icon n="clock" s={20}/>}/>} brandProps={{label:'券怎么用？问问苏小T'}}>
      <div style={{display:'flex',gap:8,marginTop:2}}>
        {tabs.map((t,i)=>(<span key={i} style={{padding:'7px 14px',borderRadius:999,fontSize:13,fontWeight:800,
          background:i===0?'var(--sakura)':'#fff',color:i===0?'#fff':'var(--ink-2)',border:i===0?'none':'1px solid var(--line)',boxShadow:i===0?'var(--shadow-pink)':'none'}}>{t}</span>))}
      </div>
      {/* commerce loop note */}
      <div style={{marginTop:12,display:'flex',alignItems:'center',gap:10,background:'linear-gradient(120deg,var(--sakura-tint),var(--leaf-soft))',border:'1px solid var(--line)',borderRadius:14,padding:'10px 13px'}}>
        <Icon n="ticket" s={20} c="var(--sakura-deep)"/>
        <div style={{flex:1,fontSize:12,fontWeight:800,color:'var(--ink)'}}>线下扫码领券 → 门店核销，出行即享优惠</div>
      </div>
      {/* coupon list */}
      <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:11}}>
        {coupons.map((c,i)=>(
          <div key={i} style={{display:'flex',borderRadius:16,overflow:'hidden',boxShadow:'var(--shadow-sm)',border:'1px solid var(--line)',background:'#fff'}}>
            <div style={{flex:'0 0 92px',background:`linear-gradient(135deg,${c.c},${c.cc})`,color:'#fff',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'relative'}}>
              <div style={{display:'flex',alignItems:'baseline',gap:1}}>
                {c.unit==='¥'&&<span style={{fontSize:15,fontWeight:900}}>¥</span>}
                <span className="sx-display" style={{fontSize:c.v==='FREE'?22:34,color:'#fff',lineHeight:1}}>{c.v}</span>
                {c.unit==='折'&&<span style={{fontSize:14,fontWeight:900}}>折</span>}
              </div>
              <span style={{fontSize:10,fontWeight:800,opacity:.92,marginTop:3}}>{c.type}</span>
              <div style={{position:'absolute',right:-6,top:'50%',transform:'translateY(-50%)',width:12,height:12,borderRadius:'50%',background:'var(--paper)'}}/>
            </div>
            <div style={{flex:1,padding:'11px 13px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <div style={{fontWeight:800,fontSize:14.5}}>{c.t}</div>
              <div style={{fontSize:11.5,color:'var(--ink-2)',fontWeight:700,marginTop:3,lineHeight:1.4}}>{c.d}</div>
              <div style={{display:'flex',alignItems:'center',marginTop:8}}>
                <span style={{flex:1,fontSize:10.5,color:'var(--ink-3)',fontWeight:800}}>{c.sub}</span>
                <span style={{background:'var(--ink)',color:'#fff',borderRadius:999,padding:'6px 16px',fontSize:12.5,fontWeight:800}}>领取</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Phone>
  );
}

/* ============ M11 · 四季IP主页 (F-IP-01) ============ */
function SeasonIP(){
  const seasons=[['春樱','🌸','var(--sakura)'],['夏荷','🪷','var(--leaf-deep)'],['秋桂','🍂','#C58A2E'],['冬梅','❄️','#4A78C9']];
  const plays=[
    {n:'camera',t:'AI合影旅拍',d:'和苏小T拍同款',c:'var(--sakura-deep)',cb:'var(--sakura-soft)'},
    {n:'qr',t:'沿线集章',d:'集满兑文创',c:'var(--leaf-deep)',cb:'var(--leaf-soft)'},
    {n:'gift',t:'积分兑好礼',d:'1280分可用',c:'#C58A2E',cb:'var(--sun-soft)'},
    {n:'chat',t:'拟人对话',d:'你的出行搭子',c:'#4A78C9',cb:'#E7EEFA'},
  ];
  return (
    <div className="sx-screen">
      <SXStyle/>
      <div style={{position:'absolute',top:0,left:0,right:0,height:330,background:'linear-gradient(180deg,#FCE6EE 0%,#FBF0DA 60%,var(--paper) 100%)'}}/>
      <div style={{position:'relative',zIndex:2,display:'flex',flexDirection:'column',height:'100%'}}>
        <StatusBar/>
        <Header title="苏小T 四季" sub="春樱 · 夏荷 · 秋桂 · 冬梅" right={<Icon n="grid" s={20}/>}/>
        <div className="sx-body">
          {/* season switch */}
          <div style={{display:'flex',gap:8}}>
            {seasons.map((s,i)=>(
              <div key={i} style={{flex:1,textAlign:'center',borderRadius:14,padding:'9px 2px',
                background:i===0?'#fff':'rgba(255,255,255,.55)',border:i===0?'2px solid var(--sakura)':'1px solid var(--line)',boxShadow:i===0?'var(--shadow-sm)':'none'}}>
                <div style={{fontSize:21}}>{s[1]}</div>
                <div style={{fontWeight:800,fontSize:12,color:i===0?'var(--sakura-deep)':'var(--ink-2)',marginTop:2}}>{s[0]}</div>
              </div>
            ))}
          </div>
          {/* IP hero */}
          <div style={{textAlign:'center',marginTop:8,position:'relative'}}>
            <div style={{position:'absolute',top:18,left:'50%',transform:'translateX(-50%)',width:150,height:150,borderRadius:'50%',background:'radial-gradient(circle,rgba(238,127,168,.3),transparent 70%)'}}/>
            <Mascot size={128} style={{position:'relative',filter:'drop-shadow(0 10px 16px rgba(37,53,89,.18))'}}/>
            <div className="sx-display" style={{fontSize:21,marginTop:2}}>春日限定 · 樱花苏小T</div>
            <div style={{fontSize:12,fontWeight:800,color:'var(--ink-2)',marginTop:2}}>跟着电车去赏樱，集章拍照赢文创</div>
          </div>
          {/* play grid */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:11,marginTop:14}}>
            {plays.map((p,i)=>(
              <div key={i} className="sx-card" style={{padding:'13px 14px',display:'flex',alignItems:'center',gap:11}}>
                <div style={{width:42,height:42,borderRadius:13,background:p.cb,display:'flex',alignItems:'center',justifyContent:'center',flex:'0 0 42px'}}><Icon n={p.n} s={22} c={p.c}/></div>
                <div><div style={{fontWeight:800,fontSize:13.5}}>{p.t}</div><div style={{fontSize:10.5,color:'var(--ink-3)',fontWeight:700,marginTop:1}}>{p.d}</div></div>
              </div>
            ))}
          </div>
          {/* current activity */}
          <div style={{marginTop:13,display:'flex',alignItems:'center',gap:11,background:'linear-gradient(120deg,var(--sakura-deep),var(--sakura))',borderRadius:16,padding:'12px 14px',boxShadow:'var(--shadow-pink)'}}>
            <div style={{flex:1,color:'#fff'}}>
              <div style={{fontWeight:900,fontSize:14.5}}>樱花季 · 集章打卡赢限定徽章</div>
              <div style={{fontSize:11.5,fontWeight:700,opacity:.92,marginTop:2}}>3.15–4.15 · 集满6站兑金属徽章</div>
            </div>
            <span style={{background:'#fff',color:'var(--sakura-deep)',borderRadius:999,padding:'8px 15px',fontSize:13,fontWeight:800}}>去集章</span>
          </div>
        </div>
        <BrandBar label="想玩什么季节限定？问苏小T"/>
      </div>
    </div>
  );
}

/* ============ M16 · 站台扫码服务落地页 (F-ST-01) ============ */
function StationScan(){
  const svcs=[
    {n:'qr',t:'扫码集章',d:'本站打卡 +1',c:'var(--sakura-deep)',cb:'var(--sakura-soft)'},
    {n:'camera',t:'AI合影',d:'和苏小T拍照',c:'var(--leaf-deep)',cb:'var(--leaf-soft)'},
    {n:'search',t:'文旅资讯',d:'周边吃喝玩',c:'#C58A2E',cb:'var(--sun-soft)'},
  ];
  return (
    <Phone head={<Header title="站台服务" sub="扫码即用 · 无需下载" right={<Icon n="pin" s={20}/>}/>} brandProps={{label:'本站有啥好玩？问苏小T'}}>
      {/* arrived banner */}
      <div style={{marginTop:2,borderRadius:20,padding:'15px 17px',background:'linear-gradient(120deg,var(--ink),#33446e)',position:'relative',overflow:'hidden',boxShadow:'var(--shadow)'}}>
        <Mascot size={74} style={{position:'absolute',right:6,bottom:-8,opacity:.95}}/>
        <span className="sx-pill" style={{background:'rgba(255,255,255,.16)',color:'#fff'}}>📍 你已到达</span>
        <div className="sx-display" style={{fontSize:25,color:'#fff',marginTop:7}}>狮子山站</div>
        <div style={{fontSize:12,fontWeight:800,color:'rgba(255,255,255,.82)',marginTop:2}}>1号线 · 扫描站台灯箱二维码进入</div>
      </div>
      {/* mini arrival */}
      <div className="sx-card" style={{marginTop:12,padding:'12px 15px',display:'flex',alignItems:'center',gap:12}}>
        <Icon n="tram" s={24} c="var(--sakura-deep)"/>
        <div style={{flex:1}}><div style={{fontWeight:800,fontSize:14}}>下一班 往西洋山</div><div style={{fontSize:11,color:'var(--ink-3)',fontWeight:700}}>畅通 · 预计 09:46 到站</div></div>
        <div style={{textAlign:'right'}}><span className="sx-display" style={{fontSize:26,color:'var(--sakura-deep)'}}>5</span><span style={{fontSize:12,fontWeight:800,color:'var(--ink-2)'}}> 分</span></div>
      </div>
      {/* services */}
      <div className="sx-sect" style={{fontSize:14,margin:'15px 0 9px'}}>本站服务</div>
      <div style={{display:'flex',gap:10}}>
        {svcs.map((s,i)=>(
          <div key={i} className="sx-card" style={{flex:1,padding:'14px 6px',textAlign:'center'}}>
            <div style={{width:50,height:50,borderRadius:16,background:s.cb,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto'}}><Icon n={s.n} s={26} c={s.c}/></div>
            <div style={{fontWeight:800,fontSize:13,color:'var(--ink)',marginTop:8}}>{s.t}</div>
            <div style={{fontSize:10,color:'var(--ink-3)',fontWeight:700,marginTop:1}}>{s.d}</div>
          </div>
        ))}
      </div>
      {/* nearby */}
      <div className="sx-sect" style={{fontSize:14,margin:'15px 0 9px'}}>本站周边</div>
      <div style={{display:'flex',gap:11}}>
        {[['太湖湿地公园','500m','var(--leaf-soft)'],['萌宠乐园','650m','var(--sakura-soft)']].map((p,i)=>(
          <div key={i} className="sx-card" style={{flex:1,padding:8}}>
            <div className="sx-photo ph" data-ph={p[0]} style={{height:66,borderRadius:11,background:p[2]}}/>
            <div style={{fontWeight:800,fontSize:13,marginTop:7}}>{p[0]}</div>
            <div style={{fontSize:11,color:'var(--ink-3)',fontWeight:700,display:'flex',alignItems:'center',gap:3,marginTop:2}}><Icon n="pin" s={12} c="var(--ink-3)"/>距站 {p[1]}</div>
          </div>
        ))}
      </div>
    </Phone>
  );
}

/* ============ M17 · 手机号一键实名（渐进式实名 F-UC-02） ============ */
function RealNameAuth(){
  return (
    <div className="sx-screen">
      <SXStyle/>
      <div style={{position:'absolute',top:0,left:0,right:0,height:300,background:'linear-gradient(180deg,var(--sakura-soft),var(--paper))'}}/>
      <div style={{position:'relative',zIndex:2,display:'flex',flexDirection:'column',height:'100%'}}>
        <StatusBar/>
        <Header title="实名升级" sub="领取你的专属权益"/>
        <div className="sx-body" style={{display:'flex',flexDirection:'column'}}>
          {/* mascot guide */}
          <div style={{textAlign:'center',marginTop:6}}>
            <Mascot size={104} style={{filter:'drop-shadow(0 8px 12px rgba(37,53,89,.16))'}}/>
            <div className="sx-display" style={{fontSize:22,marginTop:4,lineHeight:1.3}}>升级会员，解锁更多玩法</div>
            <div style={{fontSize:13,fontWeight:700,color:'var(--ink-2)',marginTop:5,lineHeight:1.5,padding:'0 14px'}}>领券、集章、积分兑换需要实名认证<br/>一键授权，无需手动填写</div>
          </div>
          {/* benefits */}
          <div style={{display:'flex',gap:9,marginTop:16}}>
            {[['coupon','领优惠券','var(--sakura-deep)','var(--sakura-soft)'],['qr','沿线集章','var(--leaf-deep)','var(--leaf-soft)'],['gift','积分兑换','#C58A2E','var(--sun-soft)']].map((b,i)=>(
              <div key={i} style={{flex:1,textAlign:'center',background:'#fff',border:'1px solid var(--line)',borderRadius:14,padding:'12px 4px',boxShadow:'var(--shadow-sm)'}}>
                <div style={{width:40,height:40,borderRadius:12,background:b[3],display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto'}}><Icon n={b[0]} s={21} c={b[2]}/></div>
                <div style={{fontWeight:800,fontSize:12,marginTop:6}}>{b[1]}</div>
              </div>
            ))}
          </div>
          {/* wechat phone quick-verify */}
          <div style={{marginTop:18,background:'#fff',border:'1px solid var(--line)',borderRadius:18,padding:'16px 16px 14px',boxShadow:'var(--shadow-sm)'}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
              <Icon n="user" s={18} c="var(--leaf-deep)"/>
              <span style={{fontWeight:800,fontSize:13.5,color:'var(--ink)'}}>微信手机号快速验证</span>
              <span style={{flex:1}}/><span className="sx-pill leaf" style={{padding:'3px 9px'}}>安全加密</span>
            </div>
            <div style={{background:'var(--paper)',borderRadius:12,padding:'12px 14px',display:'flex',alignItems:'center',gap:10,border:'1px solid var(--line)'}}>
              <div style={{width:34,height:34,borderRadius:'50%',background:'var(--leaf-soft)',display:'flex',alignItems:'center',justifyContent:'center'}}><Icon n="check" s={18} c="var(--leaf-deep)"/></div>
              <div style={{flex:1}}><div style={{fontSize:10.5,color:'var(--ink-3)',fontWeight:800}}>本机号码</div><div style={{fontWeight:900,fontSize:17,color:'var(--ink)',letterSpacing:.5}}>138 **** 8866</div></div>
            </div>
            <button className="sx-btn primary" style={{width:'100%',marginTop:13}}><Icon n="check" s={18} c="#fff"/>一键授权并升级会员</button>
            <div style={{textAlign:'center',marginTop:10,fontSize:12,fontWeight:800,color:'var(--ink-2)'}}>使用其他手机号</div>
          </div>
          <div style={{flex:1}}/>
          {/* privacy */}
          <div style={{display:'flex',alignItems:'center',gap:7,justifyContent:'center',padding:'10px 0 4px',fontSize:11,color:'var(--ink-3)',fontWeight:700,textAlign:'center',lineHeight:1.4}}>
            <Icon n="check" s={13} c="var(--leaf-deep)"/>已阅读《用户协议》《隐私政策》· 信息加密存储，符合实名制要求
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window,{TripPlanner,ThemeRoutes,CouponCenter,SeasonIP,StationScan,RealNameAuth});
