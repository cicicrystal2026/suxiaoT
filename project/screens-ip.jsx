// screens-ip.jsx — AI海报打卡 / 积分商城兑换

/* ============ AI 海报打卡生成 ============ */
function PosterMaker(){
  return (
    <Phone head={<Header title="AI海报打卡" sub="一键生成专属打卡图" right={<Icon n="gift" s={20}/>}/>} brandProps={{label:'换个风格？让苏小T重画'}}>
      {/* poster preview */}
      <div style={{display:'flex',justifyContent:'center',marginTop:4}}>
        <div style={{width:212,height:300,borderRadius:18,overflow:'hidden',position:'relative',boxShadow:'var(--shadow)',
          background:'linear-gradient(160deg,#FDEAF1 0%,#FBF0DA 50%,#EEF4D6 100%)',border:'4px solid #fff'}}>
          {/* photo slot */}
          <div style={{position:'absolute',top:14,left:14,right:14,height:160,borderRadius:12,
            background:'repeating-linear-gradient(45deg,#eef2f7 0 10px,#e6ecf3 10px 20px)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:5,color:'#9aa6b8'}}>
            <Icon n="camera" s={26} c="#9aa6b8"/><span style={{fontFamily:'monospace',fontSize:10}}>点击放入你的照片</span>
          </div>
          {/* sakura dots */}
          <div style={{position:'absolute',top:8,right:10,fontSize:16}}>🌸</div>
          <div style={{position:'absolute',top:150,left:8,fontSize:13}}>🌸</div>
          {/* mascot + caption */}
          <Mascot size={52} style={{position:'absolute',bottom:54,right:8}}/>
          <div style={{position:'absolute',left:0,right:0,bottom:0,padding:'10px 14px 12px'}}>
            <div className="sx-display" style={{fontSize:17,color:'var(--ink)'}}>春日追樱 · 太湖</div>
            <div style={{fontSize:10.5,fontWeight:800,color:'var(--sakura-deep)',marginTop:2}}>苏州有轨电车 · 秀岸站 · 2026.03.28</div>
          </div>
        </div>
      </div>
      {/* templates */}
      <div className="sx-sect" style={{fontSize:13.5,margin:'14px 0 8px'}}>挑个模板</div>
      <div style={{display:'flex',gap:9}}>
        {[['樱花季','linear-gradient(160deg,#FDEAF1,#EEF4D6)',true],['太湖蓝','linear-gradient(160deg,#E7EEFA,#EAF1F6)',false],['复古票','linear-gradient(160deg,#FBF0DA,#F4ECE1)',false],['电车侠','linear-gradient(160deg,#EEF4D6,#FCE6EE)',false]].map((t,i)=>(
          <div key={i} style={{flex:1,textAlign:'center'}}>
            <div style={{height:62,borderRadius:12,background:t[1],border:t[2]?'2.5px solid var(--sakura)':'1px solid var(--line)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              {t[2]&&<Icon n="check" s={18} c="var(--sakura-deep)"/>}</div>
            <div style={{fontSize:11,fontWeight:800,color:t[2]?'var(--sakura-deep)':'var(--ink-2)',marginTop:4}}>{t[0]}</div>
          </div>
        ))}
      </div>
      {/* caption mood */}
      <div className="sx-sect" style={{fontSize:13.5,margin:'14px 0 8px'}}>AI文案 · 选个心情</div>
      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
        {['🌸 春日追樱','😋 边吃边逛','🚋 慢游苏州','👨‍👩‍👧 亲子时光','✍️ 自己写'].map((t,i)=>(
          <span key={i} style={{background:i===0?'var(--sakura)':'#fff',color:i===0?'#fff':'var(--ink)',border:i===0?'none':'1px solid var(--line)',
            borderRadius:999,padding:'8px 14px',fontSize:12.5,fontWeight:800,boxShadow:i===0?'var(--shadow-pink)':'var(--shadow-sm)'}}>{t}</span>
        ))}
      </div>
      <div style={{display:'flex',gap:10,marginTop:16}}>
        <button className="sx-btn primary" style={{flex:1}}><Icon n="sparkle" s={18} c="#fff"/>生成海报 <span style={{fontSize:11,opacity:.9}}>+10积分</span></button>
        <button className="sx-btn ghost" style={{flex:'0 0 auto',padding:'13px 16px'}}><Icon n="send" s={18}/></button>
      </div>
    </Phone>
  );
}

/* ============ 积分商城 / 兑换 ============ */
function PointsMall(){
  const tabs=['文创','票卡','商户券'];
  const goods=[
    {ph:'苏小T徽章',sub:'限量金属徽章',pt:'800',c:'var(--sakura-soft)'},
    {ph:'电车次卡',sub:'10次乘车券',pt:'1200',c:'#E7EEFA'},
    {ph:'樱花帆布袋',sub:'樱花季文创',pt:'600',c:'var(--leaf-soft)'},
    {ph:'湿地门票',sub:'太湖湿地公园',pt:'1500',c:'var(--sun-soft)'},
  ];
  return (
    <Phone head={<Header title="积分商城" sub="坐电车·玩苏州 攒积分" right={<Icon n="clock" s={20}/>}/>} brandProps={{label:'怎么攒积分？问问苏小T'}}>
      {/* balance */}
      <div style={{marginTop:2,borderRadius:20,padding:'15px 17px',background:'linear-gradient(120deg,var(--ink) 0%,#33446e 100%)',position:'relative',overflow:'hidden',boxShadow:'var(--shadow)'}}>
        <Mascot size={70} style={{position:'absolute',right:8,bottom:-6,opacity:.95}}/>
        <div style={{fontSize:12,fontWeight:800,color:'rgba(255,255,255,.8)'}}>我的积分</div>
        <div style={{display:'flex',alignItems:'baseline',gap:6,marginTop:2}}>
          <span className="sx-display" style={{fontSize:36,color:'#fff'}}>1,280</span>
          <span style={{fontSize:12,fontWeight:800,color:'var(--leaf)'}}>分</span>
        </div>
        <div style={{display:'flex',gap:8,marginTop:8}}>
          <span style={{background:'rgba(255,255,255,.15)',color:'#fff',borderRadius:999,padding:'4px 11px',fontSize:11,fontWeight:800}}>今日已签到 +5</span>
          <span style={{background:'var(--sakura)',color:'#fff',borderRadius:999,padding:'4px 11px',fontSize:11,fontWeight:800}}>赚积分攻略</span>
        </div>
      </div>
      {/* tabs */}
      <div style={{display:'flex',gap:8,marginTop:13}}>
        {tabs.map((t,i)=>(<span key={i} style={{padding:'7px 16px',borderRadius:999,fontSize:13,fontWeight:800,background:i===0?'var(--sakura)':'#fff',color:i===0?'#fff':'var(--ink-2)',border:i===0?'none':'1px solid var(--line)',boxShadow:i===0?'var(--shadow-pink)':'none'}}>{t}</span>))}
        <span style={{flex:1}}/><span style={{fontSize:12,fontWeight:800,color:'var(--ink-2)',alignSelf:'center'}}>我的兑换 ›</span>
      </div>
      {/* goods grid */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:11,marginTop:12}}>
        {goods.map((g,i)=>(
          <div key={i} className="sx-card" style={{padding:9}}>
            <div className="sx-photo ph" data-ph={g.ph} style={{height:84,borderRadius:12,background:g.c}}/>
            <div style={{fontWeight:800,fontSize:13.5,marginTop:8}}>{g.ph}</div>
            <div style={{fontSize:11,color:'var(--ink-3)',fontWeight:700,marginTop:1}}>{g.sub}</div>
            <div style={{display:'flex',alignItems:'center',marginTop:8}}>
              <span style={{flex:1,fontFamily:'var(--font-display)',fontSize:16,color:'var(--sakura-deep)'}}>{g.pt}<span style={{fontSize:11}}> 分</span></span>
              <span style={{background:'linear-gradient(135deg,var(--sakura),var(--sakura-deep))',color:'#fff',borderRadius:999,padding:'6px 14px',fontSize:12,fontWeight:800,boxShadow:'var(--shadow-pink)'}}>兑换</span>
            </div>
          </div>
        ))}
      </div>
    </Phone>
  );
}

Object.assign(window,{PosterMaker,PointsMall});
