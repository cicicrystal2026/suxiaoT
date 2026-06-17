// screens-misc.jsx — AR扫码互动打卡 / 我的·个人中心

/* ============ AR 扫码互动打卡 ============ */
function ARCheckin(){
  return (
    <div className="sx-screen" style={{background:'#11151f'}}>
      <SXStyle/>
      {/* viewfinder */}
      <div style={{position:'absolute',inset:0,background:'radial-gradient(120% 80% at 50% 35%,#2a3550 0%,#161c2b 60%,#0d111a 100%)'}}/>
      {/* faux scene */}
      <div style={{position:'absolute',left:0,right:0,bottom:0,height:'42%',background:'linear-gradient(180deg,transparent,rgba(110,155,87,.18))'}}/>
      <div style={{position:'relative',zIndex:2,display:'flex',flexDirection:'column',height:'100%',color:'#fff'}}>
        <StatusBar/>
        <div className="sx-head on-dark">
          <div className="sx-back" style={{boxShadow:'none',background:'rgba(255,255,255,.2)',borderColor:'rgba(255,255,255,.3)',color:'#fff'}}><Icon n="back" s={22} c="#fff"/></div>
          <div className="ttl" style={{color:'#fff'}}>AR打卡<small style={{color:'rgba(255,255,255,.8)'}}>扫立牌 · 集章兑奖</small></div>
          <div className="act"><Icon n="sound" s={22} c="#fff"/></div>
        </div>
        {/* scan frame */}
        <div style={{flex:1,position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{width:230,height:230,position:'relative'}}>
            {[['0','0','left','top'],['0','0','right','top'],['0','0','left','bottom'],['0','0','right','bottom']].map((c,i)=>(
              <div key={i} style={{position:'absolute',[c[2]]:0,[c[3]]:0,width:34,height:34,
                borderTop:i<2?'3px solid var(--sakura)':'none',borderBottom:i>=2?'3px solid var(--sakura)':'none',
                borderLeft:i%2===0?'3px solid var(--sakura)':'none',borderRight:i%2===1?'3px solid var(--sakura)':'none',
                borderRadius:i===0?'12px 0 0 0':i===1?'0 12px 0 0':i===2?'0 0 0 12px':'0 0 12px 0'}}/>
            ))}
            <div style={{position:'absolute',left:0,right:0,top:'50%',height:2,background:'linear-gradient(90deg,transparent,var(--sakura),transparent)',boxShadow:'0 0 12px var(--sakura)'}}/>
            {/* AR mascot + callout */}
            <Mascot size={110} style={{position:'absolute',left:'50%',top:'42%',transform:'translate(-50%,-50%)',filter:'drop-shadow(0 8px 16px rgba(0,0,0,.4))'}}/>
            <div style={{position:'absolute',left:'72%',top:'14%',background:'#fff',color:'var(--ink)',borderRadius:'14px 14px 14px 4px',padding:'7px 11px',fontSize:12,fontWeight:800,boxShadow:'0 6px 14px rgba(0,0,0,.3)',whiteSpace:'nowrap'}}>找到我啦！🎉</div>
          </div>
          <div style={{position:'absolute',bottom:18,fontSize:13,fontWeight:800,color:'rgba(255,255,255,.85)'}}>对准站台「苏小T立牌」即可识别</div>
        </div>
        {/* bottom sheet */}
        <div style={{background:'var(--paper)',borderRadius:'24px 24px 0 0',padding:'14px 16px 0',color:'var(--ink)'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{flex:1}}>
              <div className="sx-display" style={{fontSize:17}}>狮子山站 · 集章打卡</div>
              <div style={{fontSize:11.5,color:'var(--ink-2)',fontWeight:700,marginTop:2}}>已集 3/6 个印章，集满兑限定文创</div>
            </div>
            <span className="sx-pill pink">还差 3 个</span>
          </div>
          {/* stamps */}
          <div style={{display:'flex',gap:9,marginTop:11}}>
            {[1,1,1,0,0,0].map((s,i)=>(
              <div key={i} style={{flex:1,aspectRatio:'1',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',
                background:s?'linear-gradient(135deg,var(--sakura),var(--sakura-deep))':'#fff',
                border:s?'none':'2px dashed var(--line)',boxShadow:s?'var(--shadow-pink)':'none'}}>
                {s? <Icon n="check" s={18} c="#fff"/> : <span style={{fontSize:16,opacity:.4}}>🌸</span>}
              </div>
            ))}
          </div>
          <div style={{display:'flex',gap:10,margin:'13px 0 0'}}>
            <button className="sx-btn primary" style={{flex:1}}><Icon n="route" s={18} c="#fff"/>AR景点导航</button>
            <button className="sx-btn leaf" style={{flex:1}}><Icon n="gift" s={18} c="#fff"/>集章兑奖</button>
          </div>
          <div className="sx-home" style={{height:26}}></div>
        </div>
      </div>
    </div>
  );
}

/* ============ 我的 / 个人中心 ============ */
function Profile(){
  const groups=[
    [['bell','我的订阅','通勤路线·活动提醒','var(--sakura-deep)','var(--sakura-soft)'],
     ['heart','我的收藏','景点·路线·攻略','#4A78C9','#E7EEFA'],
     ['coupon','我的优惠券','3张可用','#C58A2E','var(--sun-soft)']],
    [['scan','打卡集章','3/6 · 狮子山站','var(--sakura-deep)','var(--sakura-soft)'],
     ['gift','兑换记录','已兑换 2 件','var(--leaf-deep)','var(--leaf-soft)'],
     ['headset','帮助与客服','7×24在线','#4A78C9','#E7EEFA']],
  ];
  return (
    <Phone head={<Header title="我的" right={<Icon n="grid" s={20}/>}/>} brandProps={{label:'有问题随时问苏小T'}}>
      {/* user card */}
      <div style={{marginTop:2,borderRadius:20,padding:'15px 16px',background:'linear-gradient(120deg,var(--sakura-tint),var(--leaf-soft))',border:'1px solid var(--line)',boxShadow:'var(--shadow-sm)',display:'flex',alignItems:'center',gap:13}}>
        <div style={{width:58,height:58,borderRadius:'50%',background:'#fff',display:'flex',alignItems:'flex-end',justifyContent:'center',overflow:'hidden',boxShadow:'var(--shadow-sm)'}}><img src={MASCOT} style={{width:56,marginBottom:-3}}/></div>
        <div style={{flex:1}}>
          <div className="sx-display" style={{fontSize:19}}>苏游游</div>
          <div style={{display:'flex',gap:6,marginTop:5}}><span className="sx-pill pink">通勤族</span><span className="sx-pill leaf">爱文旅</span></div>
        </div>
        <Icon n="chevR" s={18} c="var(--ink-3)"/>
      </div>
      {/* stats */}
      <div style={{display:'flex',gap:10,marginTop:12}}>
        {[['出行','86','次'],['打卡','12','个'],['积分','1,280','分']].map((s,i)=>(
          <div key={i} className="sx-card" style={{flex:1,padding:'11px 0',textAlign:'center'}}>
            <div className="sx-display" style={{fontSize:20,color:'var(--ink)'}}>{s[1]}<span style={{fontSize:11,color:'var(--ink-3)'}}> {s[2]}</span></div>
            <div style={{fontSize:11,color:'var(--ink-3)',fontWeight:800,marginTop:1}}>{s[0]}</div>
          </div>
        ))}
      </div>
      {/* menu groups */}
      {groups.map((g,gi)=>(
        <div key={gi} className="sx-card" style={{marginTop:12,padding:'2px 14px'}}>
          {g.map((m,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 0',borderBottom:i<g.length-1?'1px solid var(--line)':'none'}}>
              <div style={{width:36,height:36,borderRadius:11,background:m[4],display:'flex',alignItems:'center',justifyContent:'center'}}><Icon n={m[0]} s={19} c={m[3]}/></div>
              <div style={{flex:1}}><div style={{fontWeight:800,fontSize:14}}>{m[1]}</div><div style={{fontSize:11.5,color:'var(--ink-3)',fontWeight:700}}>{m[2]}</div></div>
              <Icon n="chevR" s={16} c="var(--ink-3)"/>
            </div>
          ))}
        </div>
      ))}
      {/* 适老化大字模式 (银发族) */}
      <div style={{marginTop:10,background:'linear-gradient(120deg,#fff,var(--sun-soft))',border:'1px solid var(--line)',borderRadius:16,padding:'10px 14px',display:'flex',alignItems:'center',gap:11}}>
        <div style={{width:36,height:36,borderRadius:11,background:'var(--sun-soft)',display:'flex',alignItems:'center',justifyContent:'center'}}><span style={{fontFamily:'var(--font-display)',fontSize:18,color:'#C58A2E'}}>大</span></div>
        <div style={{flex:1}}><div style={{fontWeight:800,fontSize:14}}>适老化 · 大字语音模式</div><div style={{fontSize:11.5,color:'var(--ink-3)',fontWeight:700}}>放大文字、语音优先，长辈更好用</div></div>
        <Toggle on={false}/>
      </div>
    </Phone>
  );
}

Object.assign(window,{ARCheckin,Profile});
