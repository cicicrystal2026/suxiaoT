import { useNavigate } from 'react-router-dom';
import AIcon from './AIcon';

const MASCOT = import.meta.env.BASE_URL + 'assets/suxiaot-sm.png';

const ADM_NAV = [
  { grp: '数据中心', items: [['dash', '数据看板', 'dashboard']] },
  { grp: '内容运营', items: [['kb', '知识库管理', 'kb', 12], ['flag', '活动配置', 'activity'], ['route', '文旅专线', 'route']] },
  { grp: '商业与触达', items: [['ticket', '券码管理', 'coupon'], ['send', '消息推送', 'push']] },
  { grp: '用户与权限', items: [['users', '用户会员', 'user'], ['shield', '角色权限', 'role']] },
];

export default function AdminSide({ active }) {
  const navigate = useNavigate();
  return (
    <div className="adm-side">
      <div className="adm-logo">
        <div className="ic"><img src={MASCOT} alt=""/></div>
        <div><b>苏小T</b><span>AI导览 · 运营平台</span></div>
      </div>
      <div className="adm-nav">
        {ADM_NAV.map((g, gi) => (
          <div key={gi}>
            <div className="adm-navgrp">{g.grp}</div>
            {g.items.map((it, i) => (
              <div key={i} className={'adm-navi' + (it[2] === active ? ' on' : '')} onClick={() => navigate('/admin/' + it[2])}>
                <AIcon n={it[0]} s={18} c={it[2] === active ? '#fff' : 'rgba(255,255,255,.7)'}/>
                <span>{it[1]}</span>
                {it[3] && <span className="badge">{it[3]}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="me">
        <div className="av">运</div>
        <div style={{ flex: 1 }}><b>运营管理员</b><span>苏州高新有轨电车</span></div>
        <AIcon n="chevR" s={15} c="rgba(255,255,255,.4)"/>
      </div>
    </div>
  );
}
