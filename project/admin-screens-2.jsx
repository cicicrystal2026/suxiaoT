// admin-screens-2.jsx — B端：券码管理 / 消息推送 / 文旅专线 / 用户会员 / 角色权限

/* ============ B5 · 券码管理 ============ */
function AdminCoupon(){
  const rows=[
    ['CPN-2026-0312','湿地公园咖啡 · 满30减10','满减券','湿地咖啡馆','5,000','4,680','320','进行中','green'],
    ['CPN-2026-0298','太湖湿地门票 · 8.5折','折扣券','太湖湿地公园','3,000','2,140','860','进行中','green'],
    ['CPN-2026-0305','苏小T文创 · 满100减20','文创券','官方商城','2,000','1,912','88','进行中','green'],
    ['CPN-2026-0277','萌宠乐园 · 亲子套票','套票券','萌宠乐园','1,500','1,500','0','已抢光','sun'],
    ['CPN-2026-0260','樱花旅拍 · 高清海报券','活动券','官方','∞','6,204','—','进行中','green'],
    ['CPN-2026-0231','贡山岛骑行 · 立减15','满减券','贡山岛景区','800','120','680','已暂停','gray'],
  ];
  return (
    <Admin active="coupon" crumb="商业与触达 / 券码管理" title="券码管理"
      actions={<><button className="adm-btn ghost"><AIcon n="dl" s={15}/>核销记录</button><button className="adm-btn primary" style={{marginLeft:8}}><AIcon n="plus" s={15} c="#fff"/>新建券模板</button></>}>
      {/* stats */}
      <div style={{display:'flex',gap:14,marginBottom:16}}>
        <AStat label="在架券模板" value="18" unit="个" icon="ticket" color="var(--sakura-deep)" bg="var(--sakura-soft)"/>
        <AStat label="累计发放" value="16.5k" unit="张" delta="8.2%" up icon="send" color="var(--blue)" bg="var(--blue-soft)"/>
        <AStat label="已核销" value="9,284" unit="张" delta="5.1%" up icon="check" color="#5C7E2A" bg="var(--leaf-soft)"/>
        <AStat label="核销率" value="56.3" unit="%" delta="2.0%" up icon="chart" color="#A9772A" bg="var(--sun-soft)"/>
      </div>
      {/* filter row */}
      <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:14}}>
        {['全部','进行中','已抢光','已暂停'].map((t,i)=>(<span key={i} style={{padding:'7px 15px',borderRadius:999,fontSize:13,fontWeight:800,
          background:i===0?'var(--navy)':'#fff',color:i===0?'#fff':'var(--ink-2)',border:i===0?'none':'1px solid var(--line)'}}>{t}</span>))}
        <span style={{flex:1}}/>
        <div className="adm-search" style={{margin:0,width:210}}><AIcon n="search" s={16} c="var(--ink-3)"/><span>券名称 / 编码 / 商户</span></div>
      </div>
      {/* table */}
      <div className="adm-card" style={{overflow:'hidden'}}>
        <table className="adm-table">
          <thead><tr><th style={{width:130}}>券编码</th><th>券名称</th><th style={{width:80}}>类型</th><th style={{width:120}}>商户</th><th style={{width:74}}>发放量</th><th style={{width:74}}>已领</th><th style={{width:90}}>库存</th><th style={{width:90}}>状态</th><th style={{width:96}}>操作</th></tr></thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i}>
                <td style={{fontFamily:'monospace',fontSize:11.5,color:'var(--ink-3)',fontWeight:700}}>{r[0]}</td>
                <td style={{fontWeight:800}}>{r[1]}</td>
                <td><span className="adm-pill gray">{r[2]}</span></td>
                <td style={{color:'var(--ink-2)',fontWeight:700}}>{r[3]}</td>
                <td className="adm-display" style={{color:'var(--ink)'}}>{r[4]}</td>
                <td style={{color:'var(--ink-2)'}}>{r[5]}</td>
                <td><span style={{fontWeight:800,color:r[6]==='0'?'var(--rose)':'var(--ink)'}}>{r[6]}</span></td>
                <td><span className={"adm-pill "+r[8]}>{r[7]==='进行中'&&'● '}{r[7]}</span></td>
                <td><div style={{display:'flex',gap:9,color:'var(--ink-3)'}}><AIcon n="chart" s={17} c="var(--blue)"/><AIcon n="edit" s={17}/><AIcon n="trash" s={17} c="var(--rose)"/></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

/* ============ B6 · 消息推送 ============ */
function AdminPush(){
  const rows=[
    ['樱花专列今日发车提醒','出行提醒','通勤族 · 订阅用户','已发送','green','12,840','38.2%','06-15 07:00'],
    ['太湖亲子游 · 周末套票上新','活动推广','亲子/家庭游客','已发送','green','8,210','24.6%','06-14 10:00'],
    ['夏荷季集章活动预告','活动推广','全部会员','待发送','sun','—','—','06-20 09:00'],
    ['苏州话语音导览上线','功能通知','银发用户','草稿','gray','—','—','未设置'],
    ['末班车时刻调整通知','出行提醒','一号线订阅','已发送','green','5,602','41.0%','06-12 21:30'],
  ];
  return (
    <Admin active="push" crumb="商业与触达 / 消息推送" title="消息推送"
      actions={<button className="adm-btn primary"><AIcon n="plus" s={15} c="#fff"/>新建推送</button>}>
      <div style={{display:'flex',gap:14}}>
        {/* left: compose preview */}
        <div className="adm-card" style={{flex:'0 0 360px',padding:'18px 20px',alignSelf:'flex-start'}}>
          <div className="adm-sect" style={{marginBottom:14}}><AIcon n="send" s={18} c="var(--sakura-deep)"/>新建推送</div>
          <div style={{fontSize:12,fontWeight:800,color:'var(--ink-2)',marginBottom:6}}>推送标题</div>
          <div style={{background:'var(--paper)',border:'1px solid var(--line)',borderRadius:10,padding:'11px 13px',fontSize:13.5,fontWeight:800,color:'var(--ink)'}}>樱花专列今日发车提醒</div>
          <div style={{fontSize:12,fontWeight:800,color:'var(--ink-2)',margin:'13px 0 6px'}}>推送人群</div>
          <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>
            {[['通勤族',true],['亲子游客',false],['银发用户',false],['全部会员',false]].map((t,i)=>(
              <span key={i} className={"adm-pill "+(t[1]?'pink':'gray')} style={{padding:'6px 12px',fontSize:12}}>{t[1]&&'✓ '}{t[0]}</span>
            ))}
          </div>
          <div style={{fontSize:12,fontWeight:800,color:'var(--ink-2)',margin:'13px 0 6px'}}>发送时间</div>
          <div style={{display:'flex',gap:8}}>
            <span className="adm-pill pink" style={{padding:'6px 12px',fontSize:12}}>定时 06-15 07:00</span>
            <span className="adm-pill gray" style={{padding:'6px 12px',fontSize:12}}>立即发送</span>
          </div>
          {/* phone preview */}
          <div style={{marginTop:16,background:'var(--navy)',borderRadius:14,padding:'13px 14px',display:'flex',gap:11,alignItems:'flex-start'}}>
            <div style={{width:34,height:34,borderRadius:9,background:'linear-gradient(135deg,var(--sakura),var(--sakura-deep))',display:'flex',alignItems:'flex-end',justifyContent:'center',overflow:'hidden',flex:'0 0 34px'}}><img src={ADM_MASCOT} style={{width:32,marginBottom:-1}}/></div>
            <div style={{flex:1,color:'#fff'}}>
              <div style={{fontSize:12.5,fontWeight:800}}>苏小T导览</div>
              <div style={{fontSize:11.5,fontWeight:700,color:'rgba(255,255,255,.78)',marginTop:3,lineHeight:1.5}}>🌸 樱花专列今日 7:30 首班发车，龙康路—秀岸段每7.5分一班，点我查实时到站～</div>
            </div>
          </div>
          <button className="adm-btn primary" style={{width:'100%',justifyContent:'center',marginTop:14}}><AIcon n="send" s={15} c="#fff"/>确认推送</button>
        </div>
        {/* right: history */}
        <div className="adm-card" style={{flex:1,overflow:'hidden',alignSelf:'flex-start'}}>
          <div style={{padding:'15px 18px 12px',display:'flex',alignItems:'center'}}><div className="adm-sect"><AIcon n="clock" s={17} c="var(--blue)"/>推送记录</div><span style={{flex:1}}/><span style={{fontSize:12,fontWeight:800,color:'var(--ink-3)'}}>近30天</span></div>
          <table className="adm-table">
            <thead><tr><th>推送内容</th><th style={{width:96}}>类型</th><th style={{width:130}}>人群</th><th style={{width:80}}>状态</th><th style={{width:80}}>触达</th><th style={{width:74}}>点击率</th></tr></thead>
            <tbody>
              {rows.map((r,i)=>(
                <tr key={i}>
                  <td><div style={{fontWeight:800}}>{r[0]}</div><div style={{fontSize:11,fontWeight:700,color:'var(--ink-3)',marginTop:2}}>{r[7]}</div></td>
                  <td><span className="adm-pill gray">{r[1]}</span></td>
                  <td style={{color:'var(--ink-2)',fontWeight:700,fontSize:12}}>{r[2]}</td>
                  <td><span className={"adm-pill "+r[4]}>{r[3]==='已发送'&&'● '}{r[3]}</span></td>
                  <td className="adm-display" style={{color:'var(--ink)'}}>{r[5]}</td>
                  <td><span style={{fontWeight:800,color:r[6]==='—'?'var(--ink-3)':'#5C7E2A'}}>{r[6]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Admin>
  );
}

/* ============ B7 · 文旅专线管理 ============ */
function AdminRoute(){
  const rows=[
    ['樱花专列','春樱','龙康路 · 文昌路 · 秀岸 · 何山桥 · 长江路 · 西洋山','6','¥4 起','上架','green','9,284'],
    ['太湖亲子线','通用','狮子山 · 龙康路 · 秀岸 · 太湖湿地','4','¥40 套票','上架','green','3,150'],
    ['沿线美食探店','通用','狮子山 · 文昌路 · 何山桥 · 长江路 · 西洋山','5','含5张券','上架','green','1,860'],
    ['园林文化线','秋桂','狮子山 · 何山桥 · 长江路','3','¥80 联票','上架','green','920'],
    ['夏荷骑行线','夏荷','秀岸 · 太湖湿地 · 贡山岛','3','¥30 起','待上架','sun','—'],
  ];
  return (
    <Admin active="route" crumb="内容运营 / 文旅专线" title="文旅专线管理"
      actions={<button className="adm-btn primary"><AIcon n="plus" s={15} c="#fff"/>新建专线</button>}>
      <div style={{display:'flex',alignItems:'center',gap:10,background:'var(--blue-soft)',border:'1px solid #CFE0F5',borderRadius:12,padding:'11px 15px',marginBottom:16}}>
        <AIcon n="route" s={18} c="var(--blue)"/>
        <span style={{fontSize:12.5,fontWeight:800,color:'#345C99'}}>专线聚焦一号线、二号线沿线，关联景点 / 商户 / 券 / 一键导航，避免泛数据。配置后实时同步 C 端「文旅专线」。</span>
      </div>
      <div style={{display:'flex',gap:14,marginBottom:16}}>
        <AStat label="在架专线" value="8" unit="条" icon="route" color="var(--sakura-deep)" bg="var(--sakura-soft)"/>
        <AStat label="关联景点" value="32" unit="个" icon="pin" color="#5C7E2A" bg="var(--leaf-soft)"/>
        <AStat label="入驻商户" value="46" unit="家" icon="gift" color="var(--blue)" bg="var(--blue-soft)"/>
        <AStat label="专线带动出行" value="15.2k" unit="人次" delta="9.4%" up icon="users" color="#A9772A" bg="var(--sun-soft)"/>
      </div>
      <div className="adm-card" style={{overflow:'hidden'}}>
        <table className="adm-table">
          <thead><tr><th style={{width:130}}>专线名称</th><th style={{width:70}}>主题</th><th>途经站点</th><th style={{width:60}}>站数</th><th style={{width:100}}>票价/套票</th><th style={{width:90}}>状态</th><th style={{width:90}}>带动出行</th><th style={{width:96}}>操作</th></tr></thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i}>
                <td style={{fontWeight:800}}>{r[0]}</td>
                <td><span className={"adm-pill "+(r[1]==='春樱'?'pink':r[1]==='夏荷'||r[1]==='秋桂'?'sun':'gray')}>{r[1]}</span></td>
                <td style={{color:'var(--ink-2)',fontWeight:700,fontSize:12,maxWidth:300}}>{r[2]}</td>
                <td className="adm-display" style={{color:'var(--ink)'}}>{r[3]}</td>
                <td style={{fontWeight:800,color:'var(--sakura-deep)'}}>{r[4]}</td>
                <td><span className={"adm-pill "+r[6]}>{r[5]==='上架'&&'● '}{r[5]}</span></td>
                <td style={{fontWeight:800}}>{r[7]}</td>
                <td><div style={{display:'flex',gap:9,color:'var(--ink-3)'}}><AIcon n="edit" s={17} c="var(--blue)"/><AIcon n="eye" s={17}/><AIcon n="trash" s={17} c="var(--rose)"/></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

/* ============ B8 · 用户会员管理 ============ */
function AdminUser(){
  const rows=[
    ['苏游游','138****8866','会员','通勤族','1,280','3','86','2026-06-15','已实名'],
    ['Lina_W','159****2031','会员','亲子游客','2,460','5','42','2026-06-15','已实名'],
    ['游客_8f2a','—','游客','—','0','0','2','2026-06-14','未实名'],
    ['老周','136****7745','会员','银发用户','620','1','158','2026-06-13','已实名'],
    ['苏州小赵','187****9920','会员','青年探店','3,150','8','64','2026-06-13','已实名'],
    ['游客_3c91','—','游客','—','0','0','1','2026-06-12','未实名'],
    ['Amy陈','152****4408','会员','外地游客','880','2','12','2026-06-11','已实名'],
  ];
  return (
    <Admin active="user" crumb="用户与权限 / 用户会员" title="用户会员管理"
      actions={<><button className="adm-btn ghost"><AIcon n="dl" s={15}/>导出</button><button className="adm-btn ghost" style={{marginLeft:8}}><AIcon n="filter" s={15}/>筛选画像</button></>}>
      <div style={{display:'flex',gap:14,marginBottom:16}}>
        <AStat label="总用户" value="48,260" delta="6.8%" up icon="users" color="var(--sakura-deep)" bg="var(--sakura-soft)"/>
        <AStat label="实名会员" value="31,840" delta="9.1%" up icon="shield" color="#5C7E2A" bg="var(--leaf-soft)"/>
        <AStat label="今日活跃 DAU" value="5,124" delta="4.2%" up icon="chart" color="var(--blue)" bg="var(--blue-soft)"/>
        <AStat label="会员实名率" value="66.0" unit="%" delta="3.0%" up icon="check" color="#A9772A" bg="var(--sun-soft)"/>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:14}}>
        {['全部','会员','游客','已实名','未实名'].map((t,i)=>(<span key={i} style={{padding:'7px 15px',borderRadius:999,fontSize:13,fontWeight:800,
          background:i===0?'var(--navy)':'#fff',color:i===0?'#fff':'var(--ink-2)',border:i===0?'none':'1px solid var(--line)'}}>{t}</span>))}
        <span style={{flex:1}}/>
        <div className="adm-search" style={{margin:0,width:220}}><AIcon n="search" s={16} c="var(--ink-3)"/><span>昵称 / 手机号 / UnionID</span></div>
      </div>
      <div className="adm-card" style={{overflow:'hidden'}}>
        <table className="adm-table">
          <thead><tr><th style={{width:150}}>用户</th><th style={{width:120}}>手机号</th><th style={{width:74}}>身份</th><th style={{width:100}}>人群画像</th><th style={{width:80}}>积分</th><th style={{width:70}}>持券</th><th style={{width:80}}>出行次数</th><th style={{width:100}}>实名状态</th><th style={{width:64}}>操作</th></tr></thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i}>
                <td><div style={{display:'flex',alignItems:'center',gap:9}}>
                  <div style={{width:32,height:32,borderRadius:'50%',background:r[2]==='游客'?'var(--paper)':'var(--sakura-soft)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,color:r[2]==='游客'?'var(--ink-3)':'var(--sakura-deep)',flex:'0 0 32px'}}>{r[0][0]}</div>
                  <span style={{fontWeight:800}}>{r[0]}</span></div></td>
                <td style={{fontFamily:'monospace',fontSize:12,color:'var(--ink-2)',fontWeight:700}}>{r[1]}</td>
                <td><span className={"adm-pill "+(r[2]==='会员'?'pink':'gray')}>{r[2]}</span></td>
                <td style={{color:'var(--ink-2)',fontWeight:700,fontSize:12}}>{r[3]}</td>
                <td className="adm-display" style={{color:'var(--ink)'}}>{r[4]}</td>
                <td style={{fontWeight:800}}>{r[5]}</td>
                <td style={{fontWeight:800}}>{r[6]}</td>
                <td><span className={"adm-pill "+(r[8]==='已实名'?'green':'gray')}>{r[8]==='已实名'&&'● '}{r[8]}</span></td>
                <td><AIcon n="eye" s={17} c="var(--ink-3)"/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

/* ============ B9 · 角色权限管理 ============ */
function AdminRole(){
  const roles=[
    {name:'超级管理员',n:2,c:'var(--sakura-deep)',cb:'var(--sakura-soft)',desc:'全部模块 + 系统设置 + 权限分配',perms:['数据看板','知识库','活动','券码','推送','专线','用户','权限']},
    {name:'内容运营',n:5,c:'#5C7E2A',cb:'var(--leaf-soft)',desc:'知识库 / 活动 / 专线 内容配置与审核',perms:['数据看板','知识库','活动','专线']},
    {name:'商业运营',n:3,c:'var(--blue)',cb:'var(--blue-soft)',desc:'券码 / 推送 / 商户与转化运营',perms:['数据看板','券码','推送','用户']},
    {name:'客服专员',n:8,c:'#A9772A',cb:'var(--sun-soft)',desc:'查看会话 / 转人工处理 / FAQ反馈',perms:['数据看板','知识库']},
  ];
  const matrix=['数据看板','知识库管理','活动配置','券码管理','消息推送','文旅专线','用户会员','角色权限'];
  const access=[
    [1,1,1,1,1,1,1,1],
    [1,2,1,0,0,1,0,0],
    [1,0,0,1,1,0,2,0],
    [1,3,0,0,0,0,0,0],
  ];
  const lvl={0:['—','gray'],1:['编辑','green'],2:['审核','blue'],3:['只读','sun']};
  return (
    <Admin active="role" crumb="用户与权限 / 角色权限" title="角色权限管理"
      actions={<button className="adm-btn primary"><AIcon n="plus" s={15} c="#fff"/>新建角色</button>}>
      {/* role cards */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:14,marginBottom:16}}>
        {roles.map((r,i)=>(
          <div key={i} className="adm-card" style={{padding:'15px 17px'}}>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <div style={{width:40,height:40,borderRadius:12,background:r.cb,display:'flex',alignItems:'center',justifyContent:'center'}}><AIcon n="shield" s={21} c={r.c}/></div>
              <div><div style={{fontWeight:800,fontSize:14.5,color:'var(--ink)'}}>{r.name}</div><div style={{fontSize:11.5,fontWeight:800,color:'var(--ink-3)'}}>{r.n} 名成员</div></div>
            </div>
            <div style={{fontSize:11.5,fontWeight:700,color:'var(--ink-2)',marginTop:11,lineHeight:1.5,minHeight:34}}>{r.desc}</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:5,marginTop:10,paddingTop:11,borderTop:'1px solid var(--line)'}}>
              {r.perms.slice(0,4).map((p,j)=>(<span key={j} className="adm-pill gray" style={{fontSize:10.5,padding:'2px 8px'}}>{p}</span>))}
              {r.perms.length>4&&<span className="adm-pill gray" style={{fontSize:10.5,padding:'2px 8px'}}>+{r.perms.length-4}</span>}
            </div>
          </div>
        ))}
      </div>
      {/* permission matrix */}
      <div className="adm-card" style={{overflow:'hidden'}}>
        <div style={{padding:'15px 18px 12px',display:'flex',alignItems:'center'}}><div className="adm-sect"><AIcon n="shield" s={17} c="var(--sakura-deep)"/>权限矩阵</div>
          <span style={{flex:1}}/>
          <div style={{display:'flex',gap:8}}>{Object.values(lvl).map((l,i)=>(<span key={i} className={"adm-pill "+l[1]}>{l[0]}</span>))}</div>
        </div>
        <table className="adm-table">
          <thead><tr><th style={{width:150}}>角色 \ 模块</th>{matrix.map((m,i)=>(<th key={i} style={{textAlign:'center'}}>{m}</th>))}</tr></thead>
          <tbody>
            {roles.map((r,i)=>(
              <tr key={i}>
                <td><div style={{display:'flex',alignItems:'center',gap:8}}><div style={{width:9,height:9,borderRadius:3,background:r.c}}/><span style={{fontWeight:800}}>{r.name}</span></div></td>
                {access[i].map((a,j)=>(<td key={j} style={{textAlign:'center'}}>
                  {a===0?<span style={{color:'var(--ink-3)'}}>—</span>:<span className={"adm-pill "+lvl[a][1]} style={{justifyContent:'center'}}>{lvl[a][0]}</span>}
                </td>))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{marginTop:14,fontSize:12,fontWeight:700,color:'var(--ink-3)',display:'flex',alignItems:'center',gap:7}}>
        <AIcon n="shield" s={15} c="var(--ink-3)"/>角色权限隔离，所有配置、审核、券码、推送操作均记录操作日志，可审计可追溯。</div>
    </Admin>
  );
}

Object.assign(window,{AdminCoupon,AdminPush,AdminRoute,AdminUser,AdminRole});
