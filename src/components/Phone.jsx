import StatusBar from './StatusBar';
import BrandBar from './BrandBar';

export default function Phone({ head, children, brand = true, brandProps = {}, flush = false }) {
  return (
    <div className="sx-screen">
      <StatusBar/>
      {head}
      <div className={'sx-body' + (flush ? ' flush' : '')}>{children}</div>
      {brand && <BrandBar {...brandProps}/>}
    </div>
  );
}
