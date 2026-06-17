import AIcon from './AIcon';

export default function AdminTop({ title, crumb, actions }) {
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
