import { useNavigate } from 'react-router-dom';
import { MASCOT } from './Mascot';
import Icon from './Icon';

export default function BrandBar({ label = '随时问苏小T，出行更有趣', icon = 'mic' }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="sx-brand" onClick={() => navigate('/chat')}>
        <div className="av"><img src={MASCOT} alt=""/></div>
        <div className="wm"><b>苏小T</b><span>{label}</span></div>
        <div className="mic"><Icon n={icon} s={22} c="#fff"/></div>
      </div>
      <div className="sx-home"></div>
    </>
  );
}
