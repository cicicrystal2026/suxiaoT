import AdminSide from './AdminSide';
import AdminTop from './AdminTop';

export default function Admin({ active, title, crumb, actions, children }) {
  return (
    <div className="adm">
      <AdminSide active={active}/>
      <div className="adm-main">
        <AdminTop title={title} crumb={crumb} actions={actions}/>
        <div className="adm-body">{children}</div>
      </div>
    </div>
  );
}
