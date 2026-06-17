// admin-screens-1.jsx — B端：登录 / 数据看板 / 知识库管理 / 活动配置

/* ============ B1 · 运营平台登录 ============ */
function AdminLogin(){
  return (
    <div className="adm" style={{padding:0}}>
      <ADMStyle/>
      {/* left brand */}
      <div style={{flex:'0 0 560px',background:'linear-gradient(150deg,#16203A 0%,#243456 55%,#3A2C52 100%)',position:'relative',overflow:'hidden',color:'#fff',padding:'56px 52px',display:'flex',flexDirection:'column'}}>
        <div style={{position:'absolute',width:340,height:340,borderRadius:'50%',background:'radial-gradient(circle,rgba(238,127,168,.32),transparent 70%)',right:-90,top:-70}}/>
        <div style={{position:'absolute',width:260,height:260,borderRadius:'50%',background:'radial-gradient(circle,rgba(127,166,60,.22),transparent 70%)',left:-70,bottom:40}}/>
        <div style={{display:'flex',alignItems:'center',gap:13,position:'relative'}}>
          <div style={{width:50,height:50,borderRadius:15,background:'linear-gradient(135deg,#EE7FA8,#E05E8E)',display:'flex',alignItems:'flex-end',justifyContent:'center',overflow:'hidden',boxShadow:'0 6px 16px rgba(224,94,142,.45)'}}><img src={ADM_MASCOT} style={{width:48,marginBottom:-2}}/></div>
          <div><div className="adm-display" style={{fontSize:22}}>苏小T · 运营平台</div><div style={{fontSize:12,fontWeight:700,color:'rgba(255,255,255,.55)'}}>苏州高新有轨电车 · AI导览管理后台</div></div>
        </div>
        <div style={{flex:1}}/>
        <div style={{position:'relative'}}>
          <img src={ADM_MASCOT} style={{width:120,marginBottom:14,filter:'drop-shadow(0 10px 20px rgba(0,0,0,.3))'}}/>
          <div className="adm-display" style={{fontSize:34,lineHeight:1.3}}>知识库 · 活动 · 券码<br/>推送 · 数据，一站管</div>
          <div style={{fontSize:14,fontWeight:700,color:'rgba(255,255,255,.62)',marginTop:14,lineHeight:1.7}}>纯软件、零硬件依赖，运营人员自助配置<br/>问答解决率 · 转化核销 · 客流数据实时看板</div>
        </div>
        <div style={{flex:1}}/>
        <div style={{display:'flex',gap:24,position:'relative',fontSize:12.5,fontWeight:800,color:'rgba(255,255,255,.5)'}}>
          {[['85%+','问答解决率'],['7×24','AI在线'],['一人一号','可核验溯源']].map((s,i)=>(
            <div key={i}><div className="adm-display" style={{fontSize:22,color:'#fff'}}>{s[0]}</div>{s[1]}</div>
          ))}
        </div>
      </div>
      {/* right form */}
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',background:'var(--paper)'}}>
        <div style={{width:368}}>
          <div className="adm-display" style={{fontSize:26,color:'var(--ink)'}}>欢迎回来 👋</div>
          <div style={{fontSize:13.5,fontWeight:700,color:'var(--ink-2)',marginTop:5}}>请登录你的运营管理账号</div>
          <div style={{marginTop:28}}>
            <div style={{fontSize:12.5,fontWeight:800,color:'var(--ink-2)',marginBottom:7}}>账号</div>
            <div style={{display:'flex',alignItems:'center',gap:9,background:'#fff',border:'1px solid var(--line)',borderRadius:12,padding:'13px 15px'}}>
              <AIcon n="users" s={18} c="var(--ink-3)"/><span style={{flex:1,fontSize:14,fontWeight:700,color:'var(--ink)'}}>operator@sztram</span>
            </div>
          </div>
          <div style={{marginTop:16}}>
            <div style={{fontSize:12.5,fontWeight:800,color:'var(--ink-2)',marginBottom:7}}>密码</div>
            <div style={{display:'flex',alignItems:'center',gap:9,background:'#fff',border:'1px solid var(--line)',borderRadius:12,padding:'13px 15px'}}>
              <AIcon n="shield" s={18} c="var(--ink-3)"/><span style={{flex:1,fontSize:14,fontWeight:700,color:'var(--ink-3)',letterSpacing:3}}>••••••••</span><AIcon n="eye" s={18} c="var(--ink-3)"/>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',marginTop:16,fontSize:12.5,fontWeight:800,color:'var(--ink-2)'}}>
            <div style={{width:18,height:18,borderRadius:5,background:'var(--sakura)',display:'flex',alignItems:'center',justifyContent:'center',marginRight:7}}><AIcon n="check" s={13} c="#fff"/></div>
            记住登录状态<span style={{flex:1}}/><span style={{color:'var(--sakura-deep)'}}>忘记密码？</span>
          </div>
          <button className="adm-btn primary" style={{width:'100%',justifyContent:'center',padding:'14px',marginTop:22,fontSize:15}}>登录平台</button>
          <div style={{textAlign:'center',marginTop:18,fontSize:12,fontWeight:700,color:'var(--ink-3)'}}>角色权限由系统管理员分配 · 操作全程审计</div>
        </div>
      </div>
    </div>
  );
}

/* ============ B2 · 数据看板 Dashboard ============ */
function AdminDashboard(){
  // 7日趋势点（咨询量）
  const pts=[42,58,51,73,66,88,95];
  const max=100, w=560, h=150;
  const path=pts.map((v,i)=>`${(i/(pts.length-1))*w},${h-(v/max)*h}`).join(' ');
  const days=['周一','周二','周三','周四','周五','周六','周日'];
  return (
    <Admin active="dashboard" crumb="数据中心 / 数据看板" title="数据看板"
      actions={<><div className="adm-icbtn"><AIcon n="dl" s={18}/></div><button className="adm-btn ghost" style={{marginLeft:4}}><AIcon n="clock" s={15}/>近7天</button></>}>
      {/* KPI row */}
      <div style={{display:'flex',gap:14}}>
        <AStat label="今日咨询量" value="1,284" unit="次" delta="12.4%" up icon="headset" color="var(--sakura-deep)" bg="var(--sakura-soft)"/>
        <AStat label="问答自主解决率" value="87.6" unit="%" delta="2.1%" up icon="check" color="#5C7E2A" bg="var(--leaf-soft)"/>
        <AStat label="行程/券转化率" value="23.8" unit="%" delta="3.6%" up icon="route" color="var(--blue)" bg="var(--blue-soft)"/>
        <AStat label="券核销 GMV" value="¥38.2k" delta="1.2%" up={false} icon="ticket" color="#A9772A" bg="var(--sun-soft)"/>
      </div>
      <div style={{display:'flex',gap:14,marginTop:14}}>
        {/* trend chart */}
        <div className="adm-card" style={{flex:'1 1 0',padding:'17px 19px'}}>
          <div style={{display:'flex',alignItems:'center'}}>
            <div className="adm-sect"><AIcon n="chart" s={18} c="var(--sakura-deep)"/>咨询量趋势</div>
            <span style={{flex:1}}/>
            <span className="adm-pill pink">咨询量</span><span className="adm-pill gray" style={{marginLeft:6}}>转人工</span>
          </div>
          <svg viewBox={`0 0 ${w} ${h+24}`} style={{width:'100%',height:170,marginTop:8}} preserveAspectRatio="none">
            <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#EE7FA8" stopOpacity=".28"/><stop offset="1" stopColor="#EE7FA8" stopOpacity="0"/></linearGradient></defs>
            {[0,.33,.66,1].map((g,i)=><line key={i} x1="0" y1={h*g} x2={w} y2={h*g} stroke="#EFEAE1" strokeWidth="1"/>)}
            <polygon points={`0,${h} ${path} ${w},${h}`} fill="url(#ag)"/>
            <polyline points={path} fill="none" stroke="#E05E8E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            {pts.map((v,i)=><circle key={i} cx={(i/(pts.length-1))*w} cy={h-(v/max)*h} r="3.5" fill="#fff" stroke="#E05E8E" strokeWidth="2"/>)}
            {days.map((d,i)=><text key={i} x={(i/(pts.length-1))*w} y={h+18} fontSize="11" fontWeight="700" fill="#97A0B6" textAnchor={i===0?'start':i===days.length-1?'end':'middle'}>{d}</text>)}
          </svg>
        </div>
        {/* intent split */}
        <div className="adm-card" style={{flex:'0 0 340px',padding:'17px 19px'}}>
          <div className="adm-sect"><AIcon n="layers" s={18} c="var(--blue)"/>咨询意图分布</div>
          <div style={{display:'flex',flexDirection:'column',gap:13,marginTop:16}}>
            {[['出行查询','46%',46,'var(--sakura)'],['文旅问答','28%',28,'var(--leaf)'],['客服工单','18%',18,'var(--blue)'],['转人工','8%',8,'var(--sun)']].map((r,i)=>(
              <div key={i}>
                <div style={{display:'flex',fontSize:12.5,fontWeight:800,marginBottom:5}}><span style={{flex:1,color:'var(--ink-2)'}}>{r[0]}</span><span className="adm-display" style={{color:'var(--ink)'}}>{r[1]}</span></div>
                <div style={{height:9,borderRadius:999,background:'var(--paper)',overflow:'hidden'}}><div style={{width:r[1],height:'100%',borderRadius:999,background:r[3]}}/></div>
              </div>
            ))}
          </div>
          <div style={{marginTop:18,background:'var(--leaf-soft)',borderRadius:12,padding:'11px 13px',fontSize:12,fontWeight:800,color:'#5C7E2A',lineHeight:1.5}}>
            ⚡ AI 自主解决 1,124 次，节省人工坐席约 18.7 小时</div>
        </div>
      </div>
      {/* bottom: hot questions + pending audit */}
      <div style={{display:'flex',gap:14,marginTop:14}}>
        <div className="adm-card" style={{flex:'1 1 0',padding:'0'}}>
          <div style={{padding:'15px 18px 11px',display:'flex',alignItems:'center'}}><div className="adm-sect"><AIcon n="star" s={17} c="var(--sun)"/>热门问题 Top5</div><span style={{flex:1}}/><span style={{fontSize:12,fontWeight:800,color:'var(--ink-3)'}}>近7天</span></div>
          {[['樱花专列几点有？',312,'已覆盖'],['末班车时间',268,'已覆盖'],['到太湖怎么坐',201,'已覆盖'],['站台失物招领',142,'转人工'],['宠物能否乘车',98,'待补充']].map((r,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:11,padding:'10px 18px',borderTop:'1px solid var(--line)'}}>
              <span className="adm-display" style={{fontSize:16,color:i<3?'var(--sakura-deep)':'var(--ink-3)',width:18}}>{i+1}</span>
              <span style={{flex:1,fontSize:13,fontWeight:800,color:'var(--ink)'}}>{r[0]}</span>
              <span style={{fontSize:12,fontWeight:800,color:'var(--ink-3)'}}>{r[1]} 次</span>
              <span className={"adm-pill "+(r[2]==='已覆盖'?'green':r[2]==='转人工'?'blue':'sun')} style={{width:64,justifyContent:'center'}}>{r[2]}</span>
            </div>
          ))}
        </div>
        <div className="adm-card" style={{flex:'0 0 340px',padding:'15px 18px'}}>
          <div style={{display:'flex',alignItems:'center'}}><div className="adm-sect"><AIcon n="kb" s={17} c="var(--sakura-deep)"/>知识库待审</div><span className="adm-pill pink" style={{marginLeft:'auto'}}>12 条</span></div>
          <div style={{display:'flex',flexDirection:'column',gap:9,marginTop:14}}>
            {[['文旅内容','太湖湿地公园讲解词','我方初稿'],['客服FAQ','发票开具流程更新','双轨建库'],['运营数据','夏令时刻表调整','客户提供']].map((r,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:10,background:'var(--paper)',borderRadius:11,padding:'10px 12px'}}>
                <span className="adm-pill gray" style={{flex:'0 0 auto'}}>{r[0]}</span>
                <div style={{flex:1,minWidth:0}}><div style={{fontSize:12.5,fontWeight:800,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{r[1]}</div><div style={{fontSize:10.5,fontWeight:700,color:'var(--ink-3)'}}>{r[2]}</div></div>
                <AIcon n="chevR" s={15} c="var(--ink-3)"/>
              </div>
            ))}
          </div>
          <button className="adm-btn ghost" style={{width:'100%',justifyContent:'center',marginTop:13}}>前往审核</button>
        </div>
      </div>
    </Admin>
  );
}

/* ============ B3 · 知识库管理 ============ */
function AdminKB(){
  const tabs=[['全部',38],['运营数据',9],['客服FAQ',16],['文旅内容',13]];
  const rows=[
    ['文旅内容','太湖湿地公园 · 景点讲解词','我方建设','已通过','green','2026-06-12'],
    ['客服FAQ','樱花专列班次与时段说明','双轨建库','已通过','green','2026-06-11'],
    ['运营数据','一号线夏令时刻表（6-9月）','客户提供','待审核','sun','2026-06-15'],
    ['文旅内容','贡山岛景区 · 骑行玩法','我方建设','待审核','sun','2026-06-15'],
    ['客服FAQ','电子发票开具流程','双轨建库','已通过','green','2026-06-09'],
    ['运营数据','站台失物招领联系方式','客户提供','已驳回','rose','2026-06-08'],
    ['文旅内容','苏小T苏州话语音导览词','我方建设','待审核','sun','2026-06-14'],
  ];
  return (
    <Admin active="kb" crumb="内容运营 / 知识库管理" title="知识库管理"
      actions={<><button className="adm-btn ghost"><AIcon n="dl" s={15}/>批量导入</button><button className="adm-btn primary" style={{marginLeft:8}}><AIcon n="plus" s={15} c="#fff"/>新建条目</button></>}>
      {/* note */}
      <div style={{display:'flex',alignItems:'center',gap:10,background:'var(--sun-soft)',border:'1px solid #F0E2BE',borderRadius:12,padding:'11px 15px',marginBottom:16}}>
        <AIcon n="shield" s={18} c="#A9772A"/>
        <span style={{fontSize:12.5,fontWeight:800,color:'#8A6420'}}>内容可信机制：未审核（audit_status ≠ 通过）的条目不会对 C 端输出，从机制上杜绝 AI 编造数据。</span>
      </div>
      {/* tabs + filter */}
      <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:14}}>
        {tabs.map((t,i)=>(<span key={i} style={{padding:'7px 15px',borderRadius:999,fontSize:13,fontWeight:800,
          background:i===0?'var(--navy)':'#fff',color:i===0?'#fff':'var(--ink-2)',border:i===0?'none':'1px solid var(--line)'}}>{t[0]} <span style={{opacity:.6}}>{t[1]}</span></span>))}
        <span style={{flex:1}}/>
        <div className="adm-search" style={{margin:0,width:210}}><AIcon n="search" s={16} c="var(--ink-3)"/><span>搜索知识条目</span></div>
        <button className="adm-btn ghost"><AIcon n="filter" s={15}/>状态</button>
      </div>
      {/* table */}
      <div className="adm-card" style={{overflow:'hidden'}}>
        <table className="adm-table">
          <thead><tr><th style={{width:96}}>类型</th><th>知识条目</th><th style={{width:110}}>来源</th><th style={{width:100}}>审核状态</th><th style={{width:120}}>更新时间</th><th style={{width:120}}>操作</th></tr></thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i}>
                <td><span className={"adm-pill "+(r[0]==='文旅内容'?'pink':r[0]==='客服FAQ'?'blue':'gray')}>{r[0]}</span></td>
                <td style={{fontWeight:800}}>{r[1]}</td>
                <td style={{color:'var(--ink-2)',fontWeight:700}}>{r[2]}</td>
                <td><span className={"adm-pill "+r[4]}>{r[3]==='已通过'&&'● '}{r[3]}</span></td>
                <td style={{color:'var(--ink-3)',fontWeight:700,fontSize:12}}>{r[5]}</td>
                <td>
                  <div style={{display:'flex',gap:8,color:'var(--ink-3)'}}>
                    <AIcon n="eye" s={17}/><AIcon n="edit" s={17} c="var(--blue)"/>
                    {r[3]==='待审核'?<span className="adm-pill green" style={{cursor:'pointer'}}><AIcon n="check" s={12} c="#5C7E2A"/>审核</span>:<AIcon n="trash" s={17} c="var(--rose)"/>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{display:'flex',alignItems:'center',marginTop:14,fontSize:12.5,fontWeight:700,color:'var(--ink-3)'}}>
        共 38 条 · 待审 12 条<span style={{flex:1}}/>
        <div style={{display:'flex',gap:6}}>{['‹','1','2','3','›'].map((p,i)=>(<span key={i} style={{minWidth:32,height:32,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:9,fontWeight:800,fontSize:13,
          background:p==='1'?'var(--navy)':'#fff',color:p==='1'?'#fff':'var(--ink-2)',border:'1px solid var(--line)'}}>{p}</span>))}</div>
      </div>
    </Admin>
  );
}

/* ============ B4 · 活动配置 ============ */
function AdminActivity(){
  const acts=[
    {t:'樱花季 · 集章打卡赢徽章',season:'春樱',type:'集章活动',status:'进行中',sc:'green',date:'03.15 – 04.15',join:'8,420',ph:'var(--sakura-soft)',badge:'🌸'},
    {t:'AI合影旅拍 · 樱花限定模板',season:'春樱',type:'AIGC活动',status:'进行中',sc:'green',date:'03.01 – 04.30',join:'3,156',ph:'var(--sakura-soft)',badge:'📸'},
    {t:'太湖亲子游 · 套票立减',season:'通用',type:'券活动',status:'进行中',sc:'green',date:'长期',join:'1,902',ph:'var(--leaf-soft)',badge:'🎟️'},
    {t:'夏荷季 · 湿地骑行打卡',season:'夏荷',type:'集章活动',status:'待发布',sc:'sun',date:'06.20 – 08.31',join:'—',ph:'var(--leaf-soft)',badge:'🪷'},
    {t:'秋桂季 · 园林文化专线',season:'秋桂',type:'专线活动',status:'草稿',sc:'gray',date:'未设置',join:'—',ph:'var(--sun-soft)',badge:'🍂'},
  ];
  return (
    <Admin active="activity" crumb="内容运营 / 活动配置" title="活动配置"
      actions={<button className="adm-btn primary"><AIcon n="plus" s={15} c="#fff"/>新建活动</button>}>
      {/* season switch + stats */}
      <div style={{display:'flex',gap:14,marginBottom:16}}>
        <div className="adm-card" style={{flex:1,padding:'14px 18px',display:'flex',alignItems:'center',gap:16}}>
          <span style={{fontSize:12.5,fontWeight:800,color:'var(--ink-2)'}}>四季 IP 主题</span>
          <div style={{display:'flex',gap:8}}>
            {[['🌸 春樱',true],['🪷 夏荷',false],['🍂 秋桂',false],['❄️ 冬梅',false]].map((s,i)=>(
              <span key={i} style={{padding:'7px 14px',borderRadius:999,fontSize:13,fontWeight:800,
                background:s[1]?'linear-gradient(135deg,var(--sakura),var(--sakura-deep))':'#fff',color:s[1]?'#fff':'var(--ink-2)',
                border:s[1]?'none':'1px solid var(--line)',boxShadow:s[1]?'0 4px 12px rgba(224,94,142,.3)':'none'}}>{s[0]}</span>
            ))}
          </div>
          <span style={{flex:1}}/>
          <span style={{fontSize:12,fontWeight:700,color:'var(--ink-3)'}}>当前主题将同步至 C 端四季 IP 主页</span>
        </div>
        <AStat label="进行中活动" value="3" unit="个" icon="flag" color="#5C7E2A" bg="var(--leaf-soft)"/>
        <AStat label="累计参与" value="13.4k" unit="人次" icon="users" color="var(--sakura-deep)" bg="var(--sakura-soft)"/>
      </div>
      {/* activity cards */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:14}}>
        {acts.map((a,i)=>(
          <div key={i} className="adm-card" style={{padding:0,overflow:'hidden'}}>
            <div style={{height:84,background:a.ph,display:'flex',alignItems:'center',justifyContent:'center',fontSize:34,position:'relative'}}>
              {a.badge}
              <span className={"adm-pill "+a.sc} style={{position:'absolute',top:11,right:11,background:'#fff'}}>{a.status==='进行中'&&'● '}{a.status}</span>
            </div>
            <div style={{padding:'13px 15px'}}>
              <div style={{display:'flex',gap:6,marginBottom:8}}><span className="adm-pill gray">{a.season}</span><span className="adm-pill pink">{a.type}</span></div>
              <div style={{fontWeight:800,fontSize:14.5,color:'var(--ink)',lineHeight:1.35,minHeight:38}}>{a.t}</div>
              <div style={{display:'flex',alignItems:'center',gap:6,marginTop:9,fontSize:12,fontWeight:700,color:'var(--ink-3)'}}>
                <AIcon n="clock" s={14} c="var(--ink-3)"/>{a.date}<span style={{flex:1}}/><AIcon n="users" s={14} c="var(--ink-3)"/>{a.join}</div>
              <div style={{display:'flex',gap:8,marginTop:13,borderTop:'1px solid var(--line)',paddingTop:12}}>
                <button className="adm-btn ghost" style={{flex:1,justifyContent:'center',padding:'8px'}}><AIcon n="edit" s={14}/>编辑</button>
                <button className="adm-btn ghost" style={{flex:1,justifyContent:'center',padding:'8px'}}><AIcon n="chart" s={14}/>数据</button>
              </div>
            </div>
          </div>
        ))}
        {/* new card */}
        <div className="adm-card" style={{padding:0,overflow:'hidden',border:'1.5px dashed var(--line)',background:'transparent',boxShadow:'none',display:'flex',alignItems:'center',justifyContent:'center',minHeight:230,flexDirection:'column',gap:10,color:'var(--ink-3)'}}>
          <div style={{width:52,height:52,borderRadius:16,background:'#fff',border:'1px solid var(--line)',display:'flex',alignItems:'center',justifyContent:'center'}}><AIcon n="plus" s={26} c="var(--sakura-deep)"/></div>
          <span style={{fontSize:13,fontWeight:800}}>新建活动</span>
          <span style={{fontSize:11,fontWeight:700}}>集章 · 合影 · 券 · 专线</span>
        </div>
      </div>
    </Admin>
  );
}

Object.assign(window,{AdminLogin,AdminDashboard,AdminKB,AdminActivity});
