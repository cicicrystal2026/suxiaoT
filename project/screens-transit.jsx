// screens-transit.jsx — 实时到站结果页 / 个性化出行提醒与订阅

function Toggle({on=true}){
  return (
    <div style={{width:46,height:27,borderRadius:999,background:on?'linear-gradient(135deg,var(--sakura),var(--sakura-deep))':'#D9D2C7',
      position:'relative',transition:'.2s',flex:'0 0 46px'}}>
      <div style={{position:'absolute',top:3,left:on?22:3,width:21,height:21,borderRadius:'50%',background:'#fff',boxShadow:'0 2px 5px rgba(0,0,0,.2)',transition:'.2s'}}/>
    </div>
  );
}

/* ============ 实时到站结果页 ============ */
function ArrivalResult(){
  const trains=[
    {min:'5',label:'即将到站',car:'1003次',crowd:'畅通',cc:'var(--leaf-deep)',cb:'var(--leaf-soft)'},
    {min:'17',label:'17分钟',car:'1007次',crowd:'较空',cc:'var(--leaf-deep)',cb:'var(--leaf-soft)'},
    {min:'31',label:'31分钟',car:'1011次',crowd:'适中',cc:'#C58A2E',cb:'var(--sun-soft)'},
  ];
  const stations=['龙康路','龙安路','文昌路','秀岸','何山桥','长江路'];
  return (
    <Phone head={<Header title="实时到站" sub="数据每10秒刷新" right={<Icon n="clock" s={20}/>}/>} brandProps={{label:'换乘、票价问苏小T就好'}}>
      {/* station + direction */}
      <div className="sx-card" style={{padding:'13px 15px',marginTop:2}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <Icon n="pin" s={20} c="var(--sakura-deep)"/>
          <div style={{flex:1}}>
            <div style={{fontSize:11,fontWeight:800,color:'var(--ink-3)'}}>当前车站</div>
            <div className="sx-display" style={{fontSize:20,color:'var(--ink)'}}>秀岸站</div>
          </div>
          <span style={{display:'inline-flex',alignItems:'center',gap:3,fontSize:12.5,fontWeight:800,color:'var(--sakura-deep)'}}>切换 <Icon n="chevR" s={14} c="var(--sakura-deep)"/></span>
        </div>
        <div style={{display:'flex',gap:8,marginTop:11}}>
          <div style={{flex:1,textAlign:'center',background:'var(--sakura)',color:'#fff',borderRadius:12,padding:'9px',fontWeight:800,fontSize:13.5,boxShadow:'var(--shadow-pink)'}}>往 西洋山 ↑</div>
          <div style={{flex:1,textAlign:'center',background:'var(--paper)',color:'var(--ink-2)',borderRadius:12,padding:'9px',fontWeight:800,fontSize:13.5,border:'1px solid var(--line)'}}>往 龙康路 ↓</div>
        </div>
      </div>
      {/* hero next train */}
      <div style={{marginTop:13,borderRadius:22,padding:'16px 18px',background:'linear-gradient(135deg,#FCE6EE,#FBF0DA)',border:'1px solid var(--line)',position:'relative',overflow:'hidden'}}>
        <span className="sx-pill leaf" style={{position:'absolute',right:14,top:14}}>● 畅通 · 较空</span>
        <div style={{fontSize:12.5,fontWeight:800,color:'var(--sakura-deep)'}}>下一班 · 1003次 往西洋山</div>
        <div style={{display:'flex',alignItems:'baseline',gap:8,marginTop:6}}>
          <span style={{fontFamily:'var(--font-display)',fontSize:62,color:'var(--ink)',lineHeight:.9}}>5</span>
          <div style={{lineHeight:1.2}}><div style={{fontSize:17,fontWeight:900,color:'var(--ink)'}}>分钟后到站</div><div style={{fontSize:12,fontWeight:700,color:'var(--ink-2)'}}>预计 09:46 · 距你 2 站</div></div>
        </div>
        {/* approaching progress */}
        <div style={{marginTop:12,display:'flex',alignItems:'center',gap:0}}>
          {[0,1,2].map(i=>(
            <React.Fragment key={i}>
              <div style={{width:11,height:11,borderRadius:'50%',background:i===0?'var(--sakura-deep)':'#fff',border:'2px solid var(--sakura-deep)'}}/>
              {i<2&&<div style={{flex:1,height:3,background:i===0?'var(--sakura-deep)':'#E9C9D6'}}/>}
            </React.Fragment>
          ))}
          <div style={{marginLeft:8}}>🚋</div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:5,fontSize:10.5,fontWeight:800,color:'var(--ink-2)'}}><span>文昌路</span><span>龙安路</span><span>秀岸(你)</span></div>
      </div>
      {/* upcoming list */}
      <div style={{marginTop:13}}>
        <div className="sx-sect" style={{fontSize:14,marginBottom:8}}>后续班次</div>
        {trains.slice(1).map((t,i)=>(
          <div key={i} className="sx-card" style={{padding:'11px 14px',marginBottom:8,display:'flex',alignItems:'center',gap:12}}>
            <Icon n="tram" s={22} c="var(--ink)"/>
            <div style={{flex:1}}><div style={{fontWeight:800,fontSize:14}}>{t.car} · 往西洋山</div><div style={{fontSize:11,color:'var(--ink-3)',fontWeight:700}}>预计 {i===0?'09:58':'10:12'} 到站</div></div>
            <span className="sx-pill" style={{background:t.cb,color:t.cc}}>{t.crowd}</span>
            <div style={{textAlign:'right',minWidth:48}}><span style={{fontFamily:'var(--font-display)',fontSize:22,color:'var(--ink)'}}>{t.min}</span><span style={{fontSize:11,fontWeight:800,color:'var(--ink-2)'}}> 分</span></div>
          </div>
        ))}
      </div>
    </Phone>
  );
}

/* ============ 个性化出行提醒与订阅 ============ */
function Reminders(){
  const pushes=[
    {ic:'bell',c:'var(--sakura-deep)',cb:'var(--sakura-soft)',t:'出行提醒',d:'龙康路站明早7:00–8:30因樱花季人流较大，建议提前15分钟出门。',time:'今天 21:30'},
    {ic:'sparkle',c:'#C58A2E',cb:'var(--sun-soft)',t:'文旅活动',d:'本周末太湖湿地公园「萌宠市集」开张，乘电车至秀岸站可领门票券。',time:'昨天 10:12'},
  ];
  return (
    <Phone head={<Header title="出行提醒" sub="订阅路线 · 主动推送" right={<Icon n="plus" s={22}/>}/>} brandProps={{label:'想订阅哪条线？问苏小T',icon:'mic'}}>
      {/* subscribed commute */}
      <div style={{marginTop:2,borderRadius:20,padding:'14px 16px',background:'linear-gradient(135deg,#EEF4D6,#FCE6EE)',border:'1px solid var(--line)',boxShadow:'var(--shadow-sm)'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span className="sx-pill pink">通勤路线</span><span style={{flex:1}}/><Toggle on={true}/>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10,marginTop:11}}>
          <span className="sx-display" style={{fontSize:18}}>狮子山</span>
          <Icon n="route" s={20} c="var(--leaf-deep)"/>
          <span className="sx-display" style={{fontSize:18}}>龙康路</span>
        </div>
        <div style={{fontSize:12,fontWeight:800,color:'var(--ink-2)',marginTop:6}}>🕗 工作日 早 8:00–9:00 · 延误/末班车自动提醒</div>
      </div>
      {/* toggles */}
      <div className="sx-card" style={{marginTop:13,padding:'4px 15px'}}>
        {[['延误预警','线路异常第一时间通知',true],['末班车提醒','常坐班次发车前提醒',true],['文旅活动推送','樱花季·市集·音乐节',true],['苏州话语音播报','到站语音用苏州话提醒',false]].map((r,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 0',borderBottom:i<3?'1px solid var(--line)':'none'}}>
            <div style={{flex:1}}><div style={{fontWeight:800,fontSize:14}}>{r[0]}</div><div style={{fontSize:11.5,color:'var(--ink-3)',fontWeight:700}}>{r[1]}</div></div>
            <Toggle on={r[2]}/>
          </div>
        ))}
      </div>
      {/* recent pushes */}
      <div className="sx-sect" style={{fontSize:14,margin:'14px 0 8px'}}>最近推送</div>
      {pushes.map((p,i)=>(
        <div key={i} className="sx-card" style={{padding:'11px 13px',marginBottom:8,display:'flex',gap:10}}>
          <div style={{width:36,height:36,flex:'0 0 36px',borderRadius:11,background:p.cb,display:'flex',alignItems:'center',justifyContent:'center'}}><Icon n={p.ic} s={19} c={p.c}/></div>
          <div style={{flex:1}}>
            <div style={{display:'flex',alignItems:'center'}}><span style={{fontWeight:800,fontSize:13.5,flex:1}}>{p.t}</span><span style={{fontSize:10.5,color:'var(--ink-3)',fontWeight:700}}>{p.time}</span></div>
            <div style={{fontSize:12.5,color:'var(--ink-2)',fontWeight:600,lineHeight:1.45,marginTop:3}}>{p.d}</div>
          </div>
        </div>
      ))}
    </Phone>
  );
}

Object.assign(window,{Toggle,ArrivalResult,Reminders});
