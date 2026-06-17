import { useNavigate } from 'react-router-dom';
import Icon from './Icon';

export default function Header({ title, sub, onDark = false, right = null, back = true }) {
  const navigate = useNavigate();
  return (
    <div className={'sx-head' + (onDark ? ' on-dark' : '')}>
      {back
        ? <div className="sx-back" onClick={() => navigate(-1)}><Icon n="back" s={22}/></div>
        : <div style={{ width: 40 }}/>
      }
      <div className="ttl">{title}{sub && <small>{sub}</small>}</div>
      <div className="act">{right}</div>
    </div>
  );
}
