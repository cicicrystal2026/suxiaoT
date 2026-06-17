// admin-shared.jsx — 苏小T 运营管理平台（B端）设计系统
// 复用品牌色（藏青/樱花粉/园林绿），桌面 SaaS 外壳：侧边导航 + 顶栏 + 内容区 + 原子组件
// 画板规格 1320 × 860

const ADM_CSS = `
.adm{
  --ink:#1B2540; --ink-2:#5A6480; --ink-3:#97A0B6; --line:#E7E3DA;
  --paper:#F5F1EA; --card:#FFFFFF;
  --navy:#16203A; --navy-2:#1F2C4D; --navy-line:rgba(255,255,255,.09);
  --sakura:#EE7FA8; --sakura-deep:#E05E8E; --sakura-soft:#FCE6EE;
  --leaf:#7FA63C; --leaf-soft:#EEF4D6; --sun:#E0A53A; --sun-soft:#FCF0CE;
  --blue:#4A78C9; --blue-soft:#E7EEFA; --rose:#D9536B; --rose-soft:#FBE7EB;
  --r:14px; --shadow:0 6px 22px rgba(27,37,64,.08); --shadow-sm:0 3px 10px rgba(27,37,64,.06);
  width:1320px;height:884px;display:flex;overflow:hidden;background:var(--paper);
  font-family:'Nunito','PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;color:var(--ink);
}
.adm *{box-sizing:border-box;}
.adm-display{font-family:'ZCOOL KuaiLe','PingFang SC',sans-serif;font-weight:400;}

/* ---------- sidebar ---------- */
.adm-side{width:236px;flex:0 0 236px;background:var(--navy);display:flex;flex-direction:column;color:#fff;}
.adm-logo{display:flex;align-items:center;gap:11px;padding:20px 20px 18px;}
.adm-logo .ic{width:42px;height:42px;border-radius:13px;background:linear-gradient(135deg,var(--sakura),var(--sakura-deep));
  display:flex;align-items:flex-end;justify-content:center;overflow:hidden;flex:0 0 42px;box-shadow:0 4px 12px rgba(224,94,142,.4);}
.adm-logo .ic img{width:40px;margin-bottom:-2px;}
.adm-logo b{font-family:'ZCOOL KuaiLe',sans-serif;font-size:17px;display:block;line-height:1.1;}
.adm-logo span{font-size:10.5px;color:rgba(255,255,255,.5);font-weight:700;}
.adm-nav{flex:1;padding:6px 12px;overflow:hidden;}
.adm-navgrp{font-size:10.5px;font-weight:800;color:rgba(255,255,255,.32);letter-spacing:1px;padding:14px 10px 7px;}
.adm-navi{display:flex;align-items:center;gap:11px;padding:9px 11px;border-radius:10px;font-size:13.5px;font-weight:700;
  color:rgba(255,255,255,.72);margin-bottom:2px;cursor:pointer;}
.adm-navi.on{background:linear-gradient(135deg,var(--sakura),var(--sakura-deep));color:#fff;box-shadow:0 6px 14px rgba(224,94,142,.35);}
.adm-navi:not(.on):hover{background:rgba(255,255,255,.06);}
.adm-navi .badge{margin-left:auto;background:rgba(255,255,255,.18);border-radius:999px;font-size:10px;font-weight:800;padding:1px 7px;}
.adm-navi.on .badge{background:rgba(255,255,255,.25);}
.adm-side .me{display:flex;align-items:center;gap:10px;padding:13px 18px;border-top:1px solid var(--navy-line);}
.adm-side .me .av{width:34px;height:34px;border-radius:50%;background:var(--sakura);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;flex:0 0 34px;}
.adm-side .me b{font-size:13px;display:block;}
.adm-side .me span{font-size:10.5px;color:rgba(255,255,255,.5);font-weight:700;}

/* ---------- main ---------- */
.adm-main{flex:1;min-width:0;display:flex;flex-direction:column;}
.adm-top{height:64px;flex:0 0 64px;background:var(--card);border-bottom:1px solid var(--line);
  display:flex;align-items:center;gap:14px;padding:0 26px;}
.adm-top .crumb{font-size:12px;color:var(--ink-3);font-weight:700;}
.adm-top h1{font-size:19px;font-weight:800;margin:0;color:var(--ink);}
.adm-top h1 .adm-display{font-size:20px;}
.adm-search{margin-left:auto;display:flex;align-items:center;gap:8px;background:var(--paper);border:1px solid var(--line);
  border-radius:999px;padding:8px 15px;width:230px;color:var(--ink-3);font-size:13px;font-weight:700;}
.adm-icbtn{width:38px;height:38px;border-radius:11px;background:var(--paper);border:1px solid var(--line);
  display:flex;align-items:center;justify-content:center;color:var(--ink-2);position:relative;}
.adm-icbtn .dot{position:absolute;top:8px;right:9px;width:7px;height:7px;border-radius:50%;background:var(--sakura-deep);border:1.5px solid var(--card);}
.adm-body{flex:1;min-height:0;overflow:hidden;padding:22px 26px;}

/* ---------- atoms ---------- */
.adm-card{background:var(--card);border:1px solid var(--line);border-radius:var(--r);box-shadow:var(--shadow-sm);}
.adm-sect{font-size:15px;font-weight:800;color:var(--ink);display:flex;align-items:center;gap:8px;}
.adm-btn{display:inline-flex;align-items:center;gap:7px;border:none;cursor:pointer;font-family:inherit;
  font-size:13px;font-weight:800;border-radius:10px;padding:9px 16px;}
.adm-btn.primary{background:linear-gradient(135deg,var(--sakura),var(--sakura-deep));color:#fff;box-shadow:0 6px 14px rgba(224,94,142,.3);}
.adm-btn.ghost{background:var(--card);color:var(--ink);border:1px solid var(--line);}
.adm-btn.navy{background:var(--navy);color:#fff;}
.adm-pill{display:inline-flex;align-items:center;gap:5px;border-radius:999px;font-weight:800;font-size:11.5px;padding:3px 10px;}
.adm-pill.green{background:var(--leaf-soft);color:#5C7E2A;}
.adm-pill.pink{background:var(--sakura-soft);color:var(--sakura-deep);}
.adm-pill.sun{background:var(--sun-soft);color:#A9772A;}
.adm-pill.blue{background:var(--blue-soft);color:var(--blue);}
.adm-pill.rose{background:var(--rose-soft);color:var(--rose);}
.adm-pill.gray{background:var(--paper);color:var(--ink-2);border:1px solid var(--line);}
.adm-table{width:100%;border-collapse:collapse;font-size:13px;}
.adm-table th{text-align:left;font-size:11.5px;font-weight:800;color:var(--ink-3);padding:11px 14px;border-bottom:1px solid var(--line);background:var(--paper);}
.adm-table td{padding:12px 14px;border-bottom:1px solid var(--line);font-weight:700;color:var(--ink);vertical-align:middle;}
.adm-table tr:last-child td{border-bottom:none;}
.adm-table tbody tr:hover{background:#FBF8F3;}
.adm-th{font-size:11.5px;font-weight:800;color:var(--ink-3);}
`;

function ADMStyle(){
  React.useEffect(()=>{
    if(!window.__SX_NO_WEBFONT && !document.getElementById('sx-fonts')){
      const l=document.createElement('link');l.id='sx-fonts';l.rel='stylesheet';
      l.href='https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&family=Nunito:wght@600;700;800;900&display=swap';
      document.head.appendChild(l);
    }
    if(!document.getElementById('adm-css')){
      const s=document.createElement('style');s.id='adm-css';s.textContent=ADM_CSS;document.head.appendChild(s);
    }
  },[]);
  return null;
}

const ADM_MASCOT=(window.__resources&&window.__resources.mascot)||'assets/suxiaot-sm.png';

/* ---------- admin line icons ---------- */
function AIcon({n,s=20,c='currentColor',sw=1.9}){
  const P={width:s,height:s,viewBox:'0 0 24 24',fill:'none',stroke:c,strokeWidth:sw,strokeLinecap:'round',strokeLinejoin:'round'};
  const paths={
    dash:<><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="5" rx="2"/><rect x="13" y="10" width="8" height="11" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/></>,
    kb:<><path d="M4 5a2 2 0 0 1 2-2h8l6 6v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></>,
    flag:<><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></>,
    ticket:<><path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H6a2 2 0 0 1-2-2 2 2 0 0 0 0-4z"/><path d="M14 6v12" strokeDasharray="2 2"/></>,
    send:<><path d="M5 12 20 4l-5 16-3.5-6.5z"/></>,
    route:<><circle cx="6" cy="6" r="2.2"/><circle cx="18" cy="18" r="2.2"/><path d="M8 6h6a3 3 0 0 1 0 6h-4a3 3 0 0 0 0 6h4"/></>,
    users:<><circle cx="9" cy="8" r="3.2"/><path d="M3 20c.8-3.5 3.2-5 6-5s5.2 1.5 6 5"/><path d="M16 4a3 3 0 0 1 0 6M18 20c-.3-2-1-3.4-2-4.3"/></>,
    shield:<><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="m9 12 2 2 4-4"/></>,
    search:<><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></>,
    bell:<><path d="M6 16V10a6 6 0 1 1 12 0v6l2 2H4z"/><path d="M10 21a2 2 0 0 0 4 0"/></>,
    chevR:<polyline points="9 5 16 12 9 19"/>,
    chevD:<polyline points="6 9 12 16 18 9"/>,
    plus:<><path d="M12 5v14M5 12h14"/></>,
    check:<polyline points="5 13 10 18 19 6"/>,
    x:<><path d="M6 6l12 12M18 6 6 18"/></>,
    edit:<><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/></>,
    trash:<><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></>,
    up:<><path d="M12 19V6M6 12l6-6 6 6"/></>,
    down:<><path d="M12 5v13M6 12l6 6 6-6"/></>,
    eye:<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></>,
    filter:<><path d="M3 5h18l-7 8v6l-4-2v-4z"/></>,
    dl:<><path d="M12 4v10m-4-4 4 4 4-4M5 20h14"/></>,
    clock:<><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/></>,
    chart:<><path d="M4 4v16h16"/><path d="M8 16v-4M12 16V8M16 16v-7"/></>,
    coupon:<><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M9 6v12" strokeDasharray="2 2"/></>,
    img:<><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m4 18 5-4 4 3 3-2 4 3"/></>,
    layers:<><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/></>,
    gift:<><rect x="4" y="9" width="16" height="11" rx="2"/><path d="M4 13h16M12 9v11"/><path d="M12 9C9 9 8 4 12 5c4-1 3 4 0 4z"/></>,
    pin:<><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.4"/></>,
    star:<path d="M12 4l2.4 5 5.4.5-4 3.6 1.2 5.3L12 20.8 7 18.4l1.2-5.3-4-3.6 5.4-.5z"/>,
    headset:<><path d="M5 13v-1a7 7 0 0 1 14 0v1"/><rect x="3" y="13" width="4" height="6" rx="2"/><rect x="17" y="13" width="4" height="6" rx="2"/></>,
    mic:<><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></>,
  };
  return <svg {...P}>{paths[n]||null}</svg>;
}

// nav model — shared across all admin pages for consistency
const ADM_NAV=[
  {grp:'数据中心',items:[['dash','数据看板','dashboard']]},
  {grp:'内容运营',items:[['kb','知识库管理','kb',12],['flag','活动配置','activity'],['route','文旅专线','route']]},
  {grp:'商业与触达',items:[['ticket','券码管理','coupon'],['send','消息推送','push']]},
  {grp:'用户与权限',items:[['users','用户会员','user'],['shield','角色权限','role']]},
];

function AdminSide({active}){
  return (
    <div className="adm-side">
      <div className="adm-logo">
        <div className="ic"><img src={ADM_MASCOT} alt=""/></div>
        <div><b>苏小T</b><span>AI导览 · 运营平台</span></div>
      </div>
      <div className="adm-nav">
        {ADM_NAV.map((g,gi)=>(
          <div key={gi}>
            <div className="adm-navgrp">{g.grp}</div>
            {g.items.map((it,i)=>(
              <div key={i} className={"adm-navi"+(it[2]===active?' on':'')}>
                <AIcon n={it[0]} s={18} c={it[2]===active?'#fff':'rgba(255,255,255,.7)'}/>
                <span>{it[1]}</span>
                {it[3]&&<span className="badge">{it[3]}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="me">
        <div className="av">运</div>
        <div style={{flex:1}}><b>运营管理员</b><span>苏州高新有轨电车</span></div>
        <AIcon n="chevR" s={15} c="rgba(255,255,255,.4)"/>
      </div>
    </div>
  );
}

function AdminTop({title,crumb,actions}){
  return (
    <div className="adm-top">
      <div>
        <div className="crumb">{crumb}</div>
        <h1>{title}</h1>
      </div>
      <div className="adm-search"><AIcon n="search" s={16} c="var(--ink-3)"/><span>搜索内容、用户、订单…</span></div>
      <div className="adm-icbtn"><AIcon n="bell" s={18}/><span className="dot"/></div>
      {actions}
    </div>
  );
}

// full admin scaffold
function Admin({active,title,crumb,actions,children}){
  return (
    <div className="adm">
      <ADMStyle/>
      <AdminSide active={active}/>
      <div className="adm-main">
        <AdminTop title={title} crumb={crumb} actions={actions}/>
        <div className="adm-body">{children}</div>
      </div>
    </div>
  );
}

// KPI stat card
function AStat({label,value,unit,delta,up=true,icon,color='var(--sakura-deep)',bg='var(--sakura-soft)'}){
  return (
    <div className="adm-card" style={{flex:1,padding:'15px 17px'}}>
      <div style={{display:'flex',alignItems:'center',gap:9}}>
        <div style={{width:38,height:38,borderRadius:11,background:bg,display:'flex',alignItems:'center',justifyContent:'center'}}><AIcon n={icon} s={20} c={color}/></div>
        <span style={{fontSize:12.5,fontWeight:800,color:'var(--ink-2)'}}>{label}</span>
        {delta&&<span className={"adm-pill "+(up?'green':'rose')} style={{marginLeft:'auto'}}>
          <AIcon n={up?'up':'down'} s={12} c={up?'#5C7E2A':'var(--rose)'}/>{delta}</span>}
      </div>
      <div style={{display:'flex',alignItems:'baseline',gap:4,marginTop:11}}>
        <span className="adm-display" style={{fontSize:30,color:'var(--ink)',lineHeight:1}}>{value}</span>
        {unit&&<span style={{fontSize:13,fontWeight:800,color:'var(--ink-3)'}}>{unit}</span>}
      </div>
    </div>
  );
}

Object.assign(window,{ADMStyle,AIcon,Admin,AdminSide,AdminTop,AStat,ADM_NAV,ADM_MASCOT});
