// server/arrivals.js — 实时到站服务（provider 抽象）
// 默认 mock：按发车间隔生成会"倒计时"的到站数据；拿到苏州有轨电车官方接口后实现 official() 即可无缝切换。
import crypto from 'node:crypto';

const PROVIDER = process.env.ARRIVALS_PROVIDER || 'mock';
const HEADWAY = Number(process.env.ARRIVALS_HEADWAY_SEC || 450); // 发车间隔，默认 7.5 分钟
const LINES = { '1号线': ['西洋山', '龙康路'], '2号线': ['太湖大道', '孵化基地'] };
const CROWD = ['畅通', '较空', '适中', '较拥挤'];

const hashNum = (s) => parseInt(crypto.createHash('md5').update(s).digest('hex').slice(0, 8), 16);
const fmtClock = (addMin) => {
  const d = new Date(Date.now() + addMin * 60000);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

function mock(station, line) {
  const now = Date.now() / 1000;
  const hour = new Date().getHours();
  const peak = (hour >= 7 && hour < 9) || (hour >= 17 && hour < 19);
  const bucket = Math.floor(now / 300); // 同一 5 分钟内拥挤度稳定，不闪烁
  const towardsList = LINES[line] || LINES['1号线'];
  const directions = towardsList.map((towards) => {
    const phase = hashNum(station + towards) % HEADWAY;
    const t = HEADWAY - ((now + phase) % HEADWAY);
    const baseMin = Math.max(1, Math.round(t / 60));
    const trains = [0, 1, 2].map((k) => {
      const etaMin = baseMin + Math.round((k * HEADWAY) / 60);
      const car = `${1000 + (hashNum(station + towards + k) % 900)}次`;
      const ci = peak ? 3 : hashNum(station + towards + k + bucket) % 3;
      return { etaMin, etaClock: fmtClock(etaMin), car, status: CROWD[ci] };
    });
    return { towards, primary: trains[0], upcoming: trains.slice(1) };
  });
  return { station, line, source: 'mock', updatedAt: new Date().toISOString(), directions };
}

export async function getArrivals(station, line = '1号线') {
  if (PROVIDER === 'official') return official(station, line);
  return mock(station, line);
}

// ===== 真实接口接入位（拿到苏州有轨电车官方实时数据后在此实现）=====
// 设环境变量 ARRIVALS_PROVIDER=official，并补全下面逻辑即可，无需改动前端。
async function official(station, line) {
  // const r = await fetch(`${process.env.ARRIVALS_API_URL}?station=${encodeURIComponent(station)}`, {
  //   headers: { Authorization: `Bearer ${process.env.ARRIVALS_API_KEY}` },
  // });
  // const raw = await r.json();
  // return normalize(raw, station, line); // 把官方字段映射为 { station,line,directions:[{towards,primary,upcoming}] }
  throw new Error('official 实时到站接口尚未配置：请实现 server/arrivals.js 的 official()');
}
