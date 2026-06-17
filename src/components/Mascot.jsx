const MASCOT = import.meta.env.BASE_URL + 'assets/suxiaot-sm.png';

export { MASCOT };
export default function Mascot({ size = 60, style = {} }) {
  return <img src={MASCOT} alt="苏小T" style={{ width: size, ...style }} draggable={false} />;
}
