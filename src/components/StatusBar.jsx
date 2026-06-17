export default function StatusBar() {
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
