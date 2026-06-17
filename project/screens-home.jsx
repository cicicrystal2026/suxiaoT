// screens-home.jsx — 公众号首页/功能聚合页 (3 warm-family variants)

function AskBar({text="问路线 · 查到站 · 要攻略…",compact=false}){
  return (
    <div style={{display:'flex',alignItems:'center',gap:8,background:'#fff',border:'1px solid var(--line)',
      borderRadius:999,padding:compact?'8px 8px 8px 16px':'11px 10px 11px 18px',boxShadow:'var(--shadow-sm)'}}>
      <Icon n="search" s={18} c="var(--ink-3)"/>
      <span style={{flex:1,color:'var(--ink-3)',fontWeight:700,fontSize:14}}>{text}</span>
      <div style={{width:34,height:34,borderRadius:'50%',background:'linear-gradient(135deg,var(--sakura),var(--sakura-deep))',
        display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'var(--shadow-pink)'}}><Icon n="mic" s={17} c="#fff"/></div>
    </div>
  );
}

const FUNCS=[
  {n:'tram',  t:'实时到站', d:'到站·拥挤度', c:'var(--sakura)', bg:'var(--sakura-soft)'},
  {n:'chat',  t:'智能问答', d:'线路·票价·换乘', c:'var(--leaf-deep)', bg:'var(--leaf-soft)'},
  {n:'route', t:'文旅推荐', d:'AI帮你排行程', c:'#C58A2E', bg:'var(--sun-soft)'},
  {n:'headset',t:'在线客服', d:'7×24全天候', c:'#4A78C9', bg:'#E7EEFA'},
];
const FUNCS2=[
  {n:'sparkle',t:'四季IP', c:'var(--sakura-deep)',bg:'var(--sakura-soft)'},
  {n:'route', t:'文旅专线', c:'var(--leaf-deep)',bg:'var(--leaf-soft)'},
  {n:'qr',    t:'沿线集章',  c:'#C58A2E',bg:'var(--sun-soft)'},
  {n:'coupon',t:'优惠券', c:'#4A78C9',bg:'#E7EEFA'},
];

function FuncTileBig({f}){
  return (
    <div style={{flex:1,background:'#fff',border:'1px solid var(--line)',borderRadius:18,padding:'12px 8px 11px',
      display:'flex',flexDirection:'column',alignItems:'center',gap:6,boxShadow:'var(--shadow-sm)'}}>
      <div style={{width:46,height:46,borderRadius:15,background:f.bg,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Icon n={f.n} s={24} c={f.c}/></div>
      <div style={{fontWeight:800,fontSize:13,color:'var(--ink)'}}>{f.t}</div>
      {f.d&&<div style={{fontSize:10,color:'var(--ink-3)',fontWeight:700}}>{f.d}</div>}
    </div>
  );
}

function HomeHead(){
  return (
    <div className="sx-head">
      <div style={{display:'flex',alignItems:'center',gap:9}}>
        <div style={{width:38,height:38,borderRadius:'50%',background:'var(--ink)',display:'flex',alignItems:'flex-end',justifyContent:'center',overflow:'hidden',boxShadow:'inset 0 0 0 2px #fff'}}>
          <img src={MASCOT} style={{width:40,marginBottom:-3}}/></div>
        <div style={{lineHeight:1.1}}>
          <div className="sx-display" style={{fontSize:18}}>苏小T导览</div>
          <div style={{fontSize:10,color:'var(--ink-2)',fontWeight:800}}>苏州有轨电车 · AI出行管家</div>
        </div>
      </div>
      <div style={{flex:1}}/>
      <div className="sx-back" style={{boxShadow:'none'}}><Icon n="scan" s={20}/></div>
    </div>
  );
}

/* ============ Variant A — 推荐：暖白 + IP英雄 + 大磁贴 ============ */
function HomeA(){
  return (
    <Phone head={<HomeHead/>} brandProps={{label:'随时问苏小T，出行更有趣'}}>
      {/* hero */}
      <div style={{position:'relative',borderRadius:24,overflow:'hidden',marginTop:4,
        background:'linear-gradient(135deg,#FCE6EE 0%,#FBF0DA 55%,#EEF4D6 100%)',padding:'16px 16px 18px',boxShadow:'var(--shadow-sm)'}}>
        <div style={{display:'flex',alignItems:'flex-start',gap:6}}>
          <div style={{flex:1}}>
            <div style={{fontSize:12,fontWeight:800,color:'var(--sakura-deep)'}}>嗨，欢迎来苏州！👋</div>
            <div className="sx-display" style={{fontSize:23,color:'var(--ink)',marginTop:4,lineHeight:1.25}}>我是苏小T<br/>想去哪儿都问我</div>
          </div>
          <Mascot size={88} style={{marginTop:-6,marginRight:-4,filter:'drop-shadow(0 6px 10px rgba(37,53,89,.18))'}}/>
        </div>
        <div style={{marginTop:6}}><AskBar/></div>
      </div>
      {/* primary funcs */}
      <div style={{display:'flex',gap:9,marginTop:14}}>{FUNCS.map((f,i)=><FuncTileBig key={i} f={f}/>)}</div>
      {/* 今日樱花专列 banner */}
      <div style={{marginTop:14,borderRadius:20,overflow:'hidden',position:'relative',boxShadow:'var(--shadow-sm)',height:118}}>
        <img src={TRAM} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(37,53,89,.74) 0%,rgba(37,53,89,.15) 70%)'}}/>
        <div style={{position:'absolute',left:16,top:0,bottom:0,display:'flex',flexDirection:'column',justifyContent:'center',gap:6}}>
          <span className="sx-pill pink" style={{alignSelf:'flex-start'}}>🌸 当季主推</span>
          <div className="sx-display" style={{color:'#fff',fontSize:19,lineHeight:1.2}}>6.5km樱花专列<br/>带你一路追春</div>
          <div style={{display:'inline-flex',alignItems:'center',gap:4,color:'#fff',fontSize:12,fontWeight:800,opacity:.95}}>查看赏樱路线 <Icon n="chevR" s={14} c="#fff"/></div>
        </div>
      </div>
      {/* secondary funcs */}
      <div style={{display:'flex',gap:9,marginTop:14}}>
        {FUNCS2.map((f,i)=>(
          <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
            <div style={{width:52,height:52,borderRadius:16,background:f.bg,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'var(--shadow-sm)'}}><Icon n={f.n} s={24} c={f.c}/></div>
            <div style={{fontSize:11,fontWeight:800,color:'var(--ink)'}}>{f.t}</div>
          </div>
        ))}
      </div>
    </Phone>
  );
}

/* ============ Variant B — 实景杂志风：夕阳大图开屏 ============ */
function HomeB(){
  return (
    <div className="sx-screen">
      <SXStyle/>
      {/* full-bleed photo hero */}
      <div style={{position:'absolute',top:0,left:0,right:0,height:320,overflow:'hidden'}}>
        <img src={TRAM} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(37,53,89,.45) 0%,rgba(37,53,89,0) 30%,rgba(251,246,239,.2) 78%,var(--paper) 100%)'}}/>
      </div>
      <div style={{position:'relative',zIndex:2,flex:1,display:'flex',flexDirection:'column'}}>
        <StatusBar/>
        <div className="sx-head on-dark" style={{paddingTop:0}}>
          <div className="sx-display" style={{fontSize:18,color:'#fff'}}>苏小T导览</div>
          <div style={{flex:1}}/>
          <div className="sx-back" style={{boxShadow:'none',background:'rgba(255,255,255,.22)',borderColor:'rgba(255,255,255,.35)',color:'#fff'}}><Icon n="scan" s={20} c="#fff"/></div>
        </div>
        <div style={{padding:'4px 18px 0',color:'#fff'}}>
          <div style={{fontSize:12,fontWeight:800,letterSpacing:1,opacity:.92}}>苏州高新区 · 有轨电车1号线</div>
          <div className="sx-display" style={{fontSize:27,lineHeight:1.2,marginTop:4,textShadow:'0 2px 12px rgba(0,0,0,.3)'}}>跟着电车<br/>慢慢游苏州</div>
        </div>
        <div style={{flex:1}}/>
        {/* glass ask + funcs anchored over fade */}
        <div style={{padding:'0 16px'}}>
          <div style={{background:'rgba(255,255,255,.7)',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,.7)',borderRadius:22,padding:14,boxShadow:'var(--shadow)'}}>
            <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:12}}>
              <Mascot size={42}/>
              <div style={{flex:1,lineHeight:1.2}}><b style={{fontFamily:'var(--font-display)',fontSize:15}}>苏小T在线</b><div style={{fontSize:11,color:'var(--ink-2)',fontWeight:700}}>问我线路、到站、票价、玩法</div></div>
              <span className="sx-pill leaf">● 在线</span>
            </div>
            <AskBar compact/>
            <div style={{display:'flex',gap:8,marginTop:12}}>
              {FUNCS.map((f,i)=>(
                <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:5}}>
                  <div style={{width:46,height:46,borderRadius:15,background:f.bg,display:'flex',alignItems:'center',justifyContent:'center'}}><Icon n={f.n} s={23} c={f.c}/></div>
                  <div style={{fontSize:11,fontWeight:800,color:'var(--ink)'}}>{f.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{display:'flex',gap:8,padding:'12px 16px 0',overflow:'hidden'}}>
          {FUNCS2.map((f,i)=>(
            <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:5}}>
              <div style={{width:46,height:46,borderRadius:15,background:'#fff',border:'1px solid var(--line)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'var(--shadow-sm)'}}><Icon n={f.n} s={22} c={f.c}/></div>
              <div style={{fontSize:11,fontWeight:800,color:'var(--ink)'}}>{f.t}</div>
            </div>
          ))}
        </div>
        <div style={{flex:1}}/>
        <BrandBar/>
      </div>
    </div>
  );
}

/* ============ Variant C — 对话优先：极简、IP居中、大问答入口 ============ */
function HomeC(){
  return (
    <Phone head={<HomeHead/>}>
      <div style={{display:'flex',flexDirection:'column',height:'100%',alignItems:'center'}}>
        <div style={{flex:'0 0 8px'}}/>
        <div style={{position:'relative'}}>
          <div style={{position:'absolute',inset:'-14px -14px',borderRadius:'50%',background:'radial-gradient(circle,var(--sakura-soft),transparent 70%)'}}/>
          <Mascot size={132} style={{position:'relative',filter:'drop-shadow(0 10px 16px rgba(37,53,89,.16))'}}/>
        </div>
        <div className="sx-display" style={{fontSize:22,marginTop:6,textAlign:'center',lineHeight:1.3}}>有什么可以帮你？</div>
        <div style={{fontSize:13,color:'var(--ink-2)',fontWeight:700,marginTop:4}}>语音、打字都行，小白也能用</div>
        {/* big mic */}
        <div style={{marginTop:18,width:84,height:84,borderRadius:'50%',background:'linear-gradient(135deg,var(--sakura),var(--sakura-deep))',
          display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'var(--shadow-pink)',position:'relative'}}>
          <div style={{position:'absolute',inset:-9,borderRadius:'50%',border:'2px solid var(--sakura)',opacity:.4}}/>
          <Icon n="mic" s={36} c="#fff"/></div>
        <div style={{fontSize:12,fontWeight:800,color:'var(--sakura-deep)',marginTop:9}}>按住说话，问我任何事</div>
        {/* suggestion chips */}
        <div style={{display:'flex',flexWrap:'wrap',gap:8,justifyContent:'center',marginTop:18,padding:'0 8px'}}>
          {['下一班车几点到？','去苏州乐园怎么坐？','樱花专列在哪段？','周末带娃去太湖','末班车几点'].map((t,i)=>(
            <span key={i} style={{background:'#fff',border:'1px solid var(--line)',borderRadius:999,padding:'9px 14px',fontSize:13,fontWeight:800,color:'var(--ink)',boxShadow:'var(--shadow-sm)'}}>{t}</span>
          ))}
        </div>
        <div style={{flex:1}}/>
        <div style={{display:'flex',gap:9,width:'100%',paddingBottom:4}}>
          {FUNCS.map((f,i)=><FuncTileBig key={i} f={f}/>)}
        </div>
      </div>
    </Phone>
  );
}

Object.assign(window,{HomeA,HomeB,HomeC,AskBar,FuncTileBig,HomeHead,FUNCS,FUNCS2});
