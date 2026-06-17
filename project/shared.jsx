// shared.jsx — design system + reusable chrome for 苏小T AI导览 prototypes
// Exports phone frame, status bar, header(back), unified bottom brand bar,
// mascot, rounded line-icon set, and small UI atoms. All screens reuse these.

const SX_CSS = `
:root{
  --ink:#253559;          /* 电车脸藏青 — 主文字 */
  --ink-2:#5A6480;        /* 次级文字 */
  --ink-3:#9AA2B8;        /* 占位/弱文字 */
  --paper:#FBF6EF;        /* 米白底 */
  --paper-2:#F4ECE1;      /* 米白稍深分隔 */
  --card:#FFFFFF;
  --line:#EFE7DB;         /* 描边 */
  --sakura:#EE7FA8;       /* 樱花粉 主色 */
  --sakura-deep:#E05E8E;
  --sakura-soft:#FCE6EE;  /* 粉色浅底 */
  --sakura-tint:#FBEFF4;
  --leaf:#A7C23B;         /* 园林青绿(IP嫩绿压深) */
  --leaf-deep:#6E9B57;
  --leaf-soft:#EEF4D6;
  --sun:#F4C24A;          /* 闪电黄 点缀 */
  --sun-soft:#FCF0CE;
  --sky:#EAF1F6;
  --shadow:0 8px 24px rgba(37,53,89,.10);
  --shadow-sm:0 4px 12px rgba(37,53,89,.08);
  --shadow-pink:0 10px 22px rgba(224,94,142,.28);
  --r-lg:26px; --r-md:18px; --r-sm:12px;
  --font-display:'ZCOOL KuaiLe','PingFang SC','Hiragino Sans GB',sans-serif;
  --font-body:'Nunito','PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;
}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
.sx-screen{
  width:393px;height:852px;position:relative;display:flex;flex-direction:column;
  background:var(--paper);color:var(--ink);font-family:var(--font-body);
  overflow:hidden;font-size:15px;line-height:1.5;
}
.sx-screen *{font-family:var(--font-body);}
.sx-display{font-family:var(--font-display);font-weight:400;letter-spacing:.5px;}

/* ---------- status bar (iPhone 15 dynamic island) ---------- */
.sx-status{height:54px;flex:0 0 54px;position:relative;display:flex;align-items:flex-end;
  justify-content:space-between;padding:0 26px 8px;font-weight:800;font-size:15px;color:var(--ink);z-index:5;}
.sx-status .t{font-variant-numeric:tabular-nums;letter-spacing:.3px;}
.sx-status .r{display:flex;align-items:center;gap:6px;}
.sx-island{position:absolute;top:11px;left:50%;transform:translateX(-50%);
  width:122px;height:35px;background:#11151f;border-radius:20px;z-index:6;}
.sx-island::after{content:"";position:absolute;right:11px;top:50%;transform:translateY(-50%);
  width:10px;height:10px;border-radius:50%;background:#1d2738;box-shadow:inset 0 0 0 2px #11151f;}

/* ---------- app header / back ---------- */
.sx-head{flex:0 0 auto;display:flex;align-items:center;gap:10px;padding:6px 16px 10px;position:relative;z-index:4;}
.sx-back{width:40px;height:40px;border-radius:50%;background:var(--card);border:1px solid var(--line);
  display:flex;align-items:center;justify-content:center;color:var(--ink);box-shadow:var(--shadow-sm);flex:0 0 40px;cursor:pointer;}
.sx-head .ttl{flex:1;text-align:center;font-family:var(--font-display);font-size:19px;color:var(--ink);}
.sx-head .ttl small{display:block;font-family:var(--font-body);font-size:11px;color:var(--ink-2);font-weight:700;letter-spacing:.5px;margin-top:1px;}
.sx-head .act{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--ink);flex:0 0 40px;}
.sx-head.on-dark .sx-back{background:rgba(255,255,255,.22);border-color:rgba(255,255,255,.35);color:#fff;backdrop-filter:blur(6px);}
.sx-head.on-dark .ttl,.sx-head.on-dark .ttl small,.sx-head.on-dark .act{color:#fff;}

/* ---------- body ---------- */
.sx-body{flex:1;min-height:0;overflow:hidden;padding:2px 16px 0;}
.sx-body.flush{padding:0;}

/* ---------- unified bottom brand bar (consistent on all pages) ---------- */
.sx-brand{flex:0 0 auto;margin:8px 12px 0;height:62px;border-radius:22px;
  background:linear-gradient(100deg,#fff 0%,var(--sakura-tint) 100%);
  border:1px solid var(--line);box-shadow:var(--shadow);
  display:flex;align-items:center;gap:11px;padding:0 10px 0 12px;position:relative;}
.sx-brand .av{width:42px;height:42px;border-radius:50%;background:var(--ink);flex:0 0 42px;
  display:flex;align-items:flex-end;justify-content:center;overflow:hidden;box-shadow:inset 0 0 0 2px #fff,0 3px 8px rgba(37,53,89,.25);}
.sx-brand .av img{width:46px;margin-bottom:-4px;}
.sx-brand .wm{flex:1;line-height:1.15;}
.sx-brand .wm b{font-family:var(--font-display);font-size:16px;color:var(--ink);display:block;}
.sx-brand .wm span{font-size:11px;color:var(--ink-2);font-weight:700;}
.sx-brand .mic{width:46px;height:46px;border-radius:50%;flex:0 0 46px;
  background:linear-gradient(135deg,var(--sakura) 0%,var(--sakura-deep) 100%);
  display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:var(--shadow-pink);}
.sx-home{flex:0 0 24px;height:24px;display:flex;align-items:center;justify-content:center;}
.sx-home::after{content:"";width:134px;height:5px;border-radius:3px;background:var(--ink);opacity:.85;}

/* ---------- atoms ---------- */
.sx-card{background:var(--card);border:1px solid var(--line);border-radius:var(--r-md);box-shadow:var(--shadow-sm);}
.sx-pill{display:inline-flex;align-items:center;gap:5px;border-radius:999px;font-weight:800;font-size:12px;padding:5px 11px;}
.sx-pill.pink{background:var(--sakura-soft);color:var(--sakura-deep);}
.sx-pill.leaf{background:var(--leaf-soft);color:var(--leaf-deep);}
.sx-pill.sun{background:var(--sun-soft);color:#B5862A;}
.sx-pill.navy{background:#E7ECF6;color:var(--ink);}
.sx-btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;border:none;cursor:pointer;
  font-family:var(--font-display);font-size:16px;border-radius:16px;padding:13px 20px;}
.sx-btn.primary{background:linear-gradient(135deg,var(--sakura) 0%,var(--sakura-deep) 100%);color:#fff;box-shadow:var(--shadow-pink);}
.sx-btn.ghost{background:#fff;color:var(--ink);border:1.5px solid var(--line);}
.sx-btn.leaf{background:linear-gradient(135deg,#B9D24E,var(--leaf-deep));color:#fff;box-shadow:0 8px 18px rgba(110,155,87,.3);}
.sx-sect{font-family:var(--font-display);font-size:17px;color:var(--ink);display:flex;align-items:center;gap:7px;}
.sx-muted{color:var(--ink-2);}
.sx-photo{background:linear-gradient(135deg,#e9eef4,#dfe6ee);position:relative;overflow:hidden;}
.sx-photo.ph::after{content:attr(data-ph);position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
  font-family:monospace;font-size:11px;color:#9aa6b8;background:repeating-linear-gradient(45deg,#eef2f7 0 10px,#e6ecf3 10px 20px);}
`;

function SXStyle(){
  React.useEffect(()=>{
    if(!window.__SX_NO_WEBFONT && !document.getElementById('sx-fonts')){
      const l=document.createElement('link');l.id='sx-fonts';l.rel='stylesheet';
      l.href='https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&family=Nunito:wght@600;700;800;900&display=swap';
      document.head.appendChild(l);
    }
    if(!document.getElementById('sx-css')){
      const s=document.createElement('style');s.id='sx-css';s.textContent=SX_CSS;document.head.appendChild(s);
    }
  },[]);
  return null;
}

const MASCOT=(window.__resources&&window.__resources.mascot)||'assets/suxiaot-sm.png';
const TRAM=(window.__resources&&window.__resources.tram)||'assets/tram-sm.jpg';
function Mascot({size=60,style={}}){return <img src={MASCOT} alt="苏小T" style={{width:size,...style}} draggable={false}/>;}

/* ---------- rounded line icons ---------- */
function Icon({n,s=22,c='currentColor',sw=1.9,fill='none'}){
  const P={width:s,height:s,viewBox:'0 0 24 24',fill,stroke:c,strokeWidth:sw,strokeLinecap:'round',strokeLinejoin:'round'};
  const paths={
    back:<polyline points="15 5 8 12 15 19"/>,
    home:<><path d="M4 11.5 12 4l8 7.5"/><path d="M6 10.5V20h12v-9.5"/></>,
    mic:<><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></>,
    send:<><path d="M5 12 20 5l-5 15-3.5-6.5z"/></>,
    pin:<><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.4"/></>,
    tram:<><rect x="6" y="3" width="12" height="13" rx="3"/><path d="M9 3 7 1M15 3l2-2M6 9h12"/><circle cx="9.5" cy="12.5" r="1"/><circle cx="14.5" cy="12.5" r="1"/><path d="M8 16l-2 5M16 16l2 5"/></>,
    ticket:<><path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H6a2 2 0 0 1-2-2 2 2 0 0 0 0-4z"/><path d="M14 6v12" strokeDasharray="2 2"/></>,
    bell:<><path d="M6 16V10a6 6 0 1 1 12 0v6l2 2H4z"/><path d="M10 21a2 2 0 0 0 4 0"/></>,
    gift:<><rect x="4" y="9" width="16" height="11" rx="2"/><path d="M4 13h16M12 9v11"/><path d="M12 9C9 9 8 4 12 5c4-1 3 4 0 4z"/></>,
    scan:<><path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"/><path d="M4 12h16"/></>,
    user:<><circle cx="12" cy="8" r="3.5"/><path d="M5 20c1-4 4-5.5 7-5.5S18 16 19 20"/></>,
    search:<><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></>,
    clock:<><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/></>,
    heart:<><path d="M12 20s-7-4.6-7-9.5A4 4 0 0 1 12 7a4 4 0 0 1 7 3.5C19 15.4 12 20 12 20z"/></>,
    star:<><path d="M12 4l2.4 5 5.4.5-4 3.6 1.2 5.3L12 20.8 7 18.4l1.2-5.3-4-3.6 5.4-.5z"/></>,
    chat:<><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 4V7a2 2 0 0 1 2-2z"/></>,
    camera:<><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.5"/></>,
    plus:<><path d="M12 5v14M5 12h14"/></>,
    check:<><polyline points="5 13 10 18 19 6"/></>,
    chevR:<polyline points="9 5 16 12 9 19"/>,
    food:<><path d="M7 3v8M5 3v4a2 2 0 0 0 4 0V3M7 11v10"/><path d="M16 3c-2 0-3 3-3 6h6c0-3-1-6-3-6zM16 9v12"/></>,
    coupon:<><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M9 6v12" strokeDasharray="2 2"/><path d="M14 11h3M14 14h3"/></>,
    route:<><circle cx="6" cy="6" r="2.2"/><circle cx="18" cy="18" r="2.2"/><path d="M8 6h6a3 3 0 0 1 0 6h-4a3 3 0 0 0 0 6h4"/></>,
    play:<polygon points="8 5 19 12 8 19"/>,
    sound:<><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6"/></>,
    qr:<><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><path d="M13 13h3v3M20 13v7M16 20h-3"/></>,
    leaf:<><path d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14z"/><path d="M5 19c3-3 6-5 9-6"/></>,
    sparkle:<><path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6z"/><path d="M18 16l.8 2 .2.2"/></>,
    grid:<><rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/></>,
    headset:<><path d="M5 13v-1a7 7 0 0 1 14 0v1"/><rect x="3" y="13" width="4" height="6" rx="2"/><rect x="17" y="13" width="4" height="6" rx="2"/><path d="M19 19a4 4 0 0 1-4 3h-2"/></>,
  };
  return <svg {...P}>{paths[n]||null}</svg>;
}

function StatusBar(){
  return (
    <div className="sx-status">
      <div className="sx-island"></div>
      <div className="t">9:41</div>
      <div className="r" aria-hidden>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="var(--ink)"><rect x="0" y="7" width="3" height="5" rx="1"/><rect x="5" y="4" width="3" height="8" rx="1"/><rect x="10" y="2" width="3" height="10" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1" opacity=".35"/></svg>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" stroke="var(--ink)" strokeWidth="1.4"><path d="M1 4.5C3.5 2 6 1 8.5 1S13.5 2 16 4.5"/><path d="M3.5 7C5 5.6 6.7 5 8.5 5s3.5.6 5 2"/><path d="M6 9.4c.8-.7 1.6-1 2.5-1s1.7.3 2.5 1"/></svg>
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="1" y="1" width="21" height="11" rx="3" stroke="var(--ink)" strokeOpacity=".4"/><rect x="3" y="3" width="16" height="7" rx="1.5" fill="var(--ink)"/><rect x="23" y="4.5" width="2" height="4" rx="1" fill="var(--ink)" fillOpacity=".4"/></svg>
      </div>
    </div>
  );
}

function Header({title,sub,onDark=false,right=null,back=true}){
  return (
    <div className={"sx-head"+(onDark?" on-dark":"")}>
      {back? <div className="sx-back"><Icon n="back" s={22}/></div> : <div style={{width:40}}/>}
      <div className="ttl">{title}{sub&&<small>{sub}</small>}</div>
      <div className="act">{right}</div>
    </div>
  );
}

// unified bottom brand bar — IDENTICAL on every page
function BrandBar({label="随时问苏小T，出行更有趣",icon="mic"}){
  return (
    <>
      <div className="sx-brand">
        <div className="av"><img src={MASCOT} alt=""/></div>
        <div className="wm"><b>苏小T</b><span>{label}</span></div>
        <div className="mic"><Icon n={icon} s={22} c="#fff"/></div>
      </div>
      <div className="sx-home"></div>
    </>
  );
}

// full phone scaffold
function Phone({head,children,brand=true,brandProps={},flush=false}){
  return (
    <div className="sx-screen">
      <SXStyle/>
      <StatusBar/>
      {head}
      <div className={"sx-body"+(flush?" flush":"")}>{children}</div>
      {brand && <BrandBar {...brandProps}/>}
    </div>
  );
}

Object.assign(window,{SXStyle,Icon,Mascot,StatusBar,Header,BrandBar,Phone,MASCOT,TRAM});
