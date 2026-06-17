export default function Toggle({ on = true }) {
  return (
    <div style={{ width: 46, height: 27, borderRadius: 999, background: on ? 'linear-gradient(135deg,var(--sakura),var(--sakura-deep))' : '#D9D2C7', position: 'relative', transition: '.2s', flex: '0 0 46px' }}>
      <div style={{ position: 'absolute', top: 3, left: on ? 22 : 3, width: 21, height: 21, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,.2)', transition: '.2s' }}/>
    </div>
  );
}
