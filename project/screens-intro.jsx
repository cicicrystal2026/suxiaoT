// screens-intro.jsx — 设计说明 + 设计系统总览（手机C端 + 后台B端）

function Swatch({c,name,hex}){
  return (
    <div style={{flex:1}}>
      <div style={{height:48,borderRadius:11,background:c,border:'1px solid rgba(0,0,0,.06)'}}/>
      <div style={{fontWeight:800,fontSize:11.5,color:'var(--ink)',marginTop:5}}>{name}</div>
      <div style={{fontFamily:'monospace',fontSize:10,color:'var(--ink-3)'}}>{hex}</div>
    </div>
  );
}

function DesignBoard(){
  const mobile=[
    ['00','设计系统总览','目标 · 配色 · 字体 · 统一组件'],
    ['01','公众号首页','功能聚合 · IP英雄 · 语音入口'],
    ['02','AI智能问答','文本/语音 · 意图识别'],
    ['03','实时到站查询','结构化卡片 · 拥挤度 · 播报'],
    ['04','7×24 AI客服','RAG问答 · 一键转人工'],
    ['05','AI行程规划·输入','人群/时长/偏好 · 一句话生成'],
    ['06','AI行程规划·方案','景点+商户+券+导航'],
    ['07','文旅专线','主题专线 · 一二号线沿线'],
    ['08','沿线攻略','景点·美食·住宿·券'],
    ['09','景点/专线详情','语音导览 · 票务预订'],
    ['10','优惠券中心','领券 · 我的券包 · 核销'],
    ['11','四季IP主页','春樱夏荷秋桂冬梅 · 玩法'],
    ['12','苏小T拟人对话','出行搭子 · IP互动'],
    ['13','AI合影旅拍','上传照片 · 生成海报'],
    ['14','沿线扫码集章','AR打卡 · 集章兑奖'],
    ['15','积分商城','文创·票卡·商户券兑换'],
    ['16','站台扫码服务','灯箱二维码 · 零硬件回流'],
    ['17','手机号一键实名','渐进式实名 · 微信快验'],
    ['18','我的·个人中心','行程·积分·券·适老化'],
  ];
  const admin=[
    ['B1','运营平台登录','角色权限 · 操作审计'],
    ['B2','数据看板','咨询量·解决率·转化·核销GMV'],
    ['B3','知识库管理','三类知识 · 审核状态机制'],
    ['B4','活动配置','四季IP · 集章 · 合影 · 券'],
    ['B5','券码管理','券模板·库存·核销'],
    ['B6','消息推送','人群定向 · 触达点击'],
    ['B7','文旅专线管理','站点·票价·关联券配置'],
    ['B8','用户会员管理','身份归一·画像·积分券'],
    ['B9','角色权限管理','RBAC · 权限矩阵'],
  ];
  return (
    <div style={{width:820,background:'var(--paper)',fontFamily:'var(--font-body)',color:'var(--ink)',padding:'34px 38px'}}>
      <SXStyle/>
      <div style={{display:'flex',alignItems:'center',gap:16}}>
        <div style={{width:72,height:72,borderRadius:'50%',background:'var(--ink)',display:'flex',alignItems:'flex-end',justifyContent:'center',overflow:'hidden',boxShadow:'var(--shadow)'}}><img src={MASCOT} style={{width:74,marginBottom:-4}}/></div>
        <div>
          <div className="sx-display" style={{fontSize:29,lineHeight:1.1}}>苏小T · AI导览 高保真原型</div>
          <div style={{fontSize:13.5,fontWeight:800,color:'var(--ink-2)',marginTop:4}}>对齐 PRD V1.0 ｜ 手机端公众号H5（iPhone 15 · 393×852）+ 后台运营平台（1320×860）</div>
        </div>
      </div>
      <div style={{height:1,background:'var(--line)',margin:'20px 0'}}/>

      <div style={{display:'flex',gap:28}}>
        <div style={{flex:1}}>
          <div className="sx-display" style={{fontSize:16,marginBottom:10}}>🎯 设计目标 · 小白即会用</div>
          {[
            ['零门槛上手','大按钮、语音优先、每页一致的返回头部与底部品牌栏，降低认知负担'],
            ['IP贯穿全程','电车侠苏小T作为出行搭子，串联问答·推荐·行程·集章·积分'],
            ['渐进式实名','游客零注册即用，仅在领券/集章时一键升级会员，符合实名制'],
            ['内容可信','知识库未审核不对外输出，绝不用AI编造运营/客服数据'],
          ].map((r,i)=>(
            <div key={i} style={{display:'flex',gap:9,marginBottom:9}}>
              <div style={{width:7,height:7,borderRadius:'50%',background:'var(--sakura)',marginTop:6,flex:'0 0 7px'}}/>
              <div><b style={{fontSize:13}}>{r[0]}</b><div style={{fontSize:12,color:'var(--ink-2)',fontWeight:600,lineHeight:1.45}}>{r[1]}</div></div>
            </div>
          ))}
          <div className="sx-display" style={{fontSize:16,margin:'16px 0 9px'}}>🔤 字体</div>
          <div style={{background:'#fff',border:'1px solid var(--line)',borderRadius:13,padding:'12px 15px'}}>
            <div className="sx-display" style={{fontSize:21}}>标题 · ZCOOL KuaiLe 圆体</div>
            <div style={{fontSize:13,fontWeight:700,marginTop:3}}>正文 · Nunito + 苹方 圆润无衬线，清晰易读</div>
          </div>
        </div>
        <div style={{flex:1}}>
          <div className="sx-display" style={{fontSize:16,marginBottom:10}}>🎨 主色板（取自IP电车侠）</div>
          <div style={{display:'flex',gap:8}}>
            <Swatch c="var(--sakura)" name="樱花粉 主色" hex="#EE7FA8"/>
            <Swatch c="var(--leaf)" name="园林青绿" hex="#A7C23B"/>
            <Swatch c="var(--ink)" name="电车藏青" hex="#253559"/>
            <Swatch c="var(--sun)" name="闪电黄" hex="#F4C24A"/>
          </div>
          <div style={{display:'flex',gap:8,marginTop:9}}>
            <Swatch c="var(--paper)" name="米白底" hex="#FBF6EF"/>
            <Swatch c="var(--sakura-soft)" name="粉浅底" hex="#FCE6EE"/>
            <Swatch c="var(--leaf-soft)" name="绿浅底" hex="#EEF4D6"/>
            <Swatch c="#16203A" name="后台藏青" hex="#16203A"/>
          </div>
          <div className="sx-display" style={{fontSize:16,margin:'16px 0 9px'}}>🧩 统一组件（全页一致）</div>
          <div style={{transform:'scale(.9)',transformOrigin:'left top',width:'111%'}}>
            <div className="sx-head" style={{padding:'0 0 8px'}}>
              <div className="sx-back"><Icon n="back" s={22}/></div>
              <div className="ttl">一致的返回头部<small>页面标题</small></div>
              <div className="act"><Icon n="home" s={22}/></div>
            </div>
            <div className="sx-brand" style={{margin:'4px 0 0'}}>
              <div className="av"><img src={MASCOT} alt=""/></div>
              <div className="wm"><b>苏小T</b><span>一致的底部品牌栏 · logo+文案+按钮</span></div>
              <div className="mic"><Icon n="mic" s={22} c="#fff"/></div>
            </div>
          </div>
        </div>
      </div>

      <div style={{height:1,background:'var(--line)',margin:'20px 0'}}/>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
        <div className="sx-display" style={{fontSize:16}}>📱 手机端 C 端 · 19 屏</div>
        <span style={{fontSize:11.5,fontWeight:800,color:'var(--ink-3)'}}>微信公众号 H5 · 竖版 393×852</span>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:9}}>
        {mobile.map((p,i)=>(
          <div key={i} style={{background:'#fff',border:'1px solid var(--line)',borderRadius:11,padding:'9px 11px',display:'flex',gap:9,alignItems:'center'}}>
            <span className="sx-display" style={{fontSize:16,color:'var(--sakura)',flex:'0 0 26px'}}>{p[0]}</span>
            <div style={{minWidth:0}}><b style={{fontSize:12.5}}>{p[1]}</b><div style={{fontSize:10.5,color:'var(--ink-2)',fontWeight:600,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{p[2]}</div></div>
          </div>
        ))}
      </div>

      <div style={{display:'flex',alignItems:'center',gap:10,margin:'18px 0 12px'}}>
        <div className="sx-display" style={{fontSize:16}}>🖥️ 后台 B 端 · 运营平台 · 9 页</div>
        <span style={{fontSize:11.5,fontWeight:800,color:'var(--ink-3)'}}>Web 管理后台 · 1320×860 · 纯软件零硬件</span>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:9}}>
        {admin.map((p,i)=>(
          <div key={i} style={{background:'#fff',border:'1px solid var(--line)',borderRadius:11,padding:'9px 11px',display:'flex',gap:9,alignItems:'center'}}>
            <span className="sx-display" style={{fontSize:15,color:'#4A78C9',flex:'0 0 28px'}}>{p[0]}</span>
            <div style={{minWidth:0}}><b style={{fontSize:12.5}}>{p[1]}</b><div style={{fontSize:10.5,color:'var(--ink-2)',fontWeight:600,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{p[2]}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window,{DesignBoard});
