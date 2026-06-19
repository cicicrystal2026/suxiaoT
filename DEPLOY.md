# 部署指南（后端 + 前端，一个服务搞定）

本项目可作为**单个 Node 服务**部署：它同时托管 API、AI、数据库，并对外提供前端页面。一个网址即可访问完整应用（AI 问答、登录实名、领券、积分、后台），无需单独部署前端、无跨域。

> 关键环境变量
> - `DEEPSEEK_API_KEY`：你的 DeepSeek 密钥（AI 问答必需）。也可用 `ANTHROPIC_API_KEY` / `OPENAI_API_KEY`，详见 `.env.example`。
> - `AUTH_SECRET`：登录 token 的签名密钥，**生产务必设一个随机强值**。
> - `PORT`：平台通常自动注入，无需手动设。
> - `DB_PATH`（可选）：SQLite 文件路径。默认随容器（重新部署会重置数据）；要持久化就挂一块磁盘并指向它，如 `/data/data.db`。

---

## 方案一：Render（推荐，含一键蓝图）

1. 把代码推到 GitHub（已完成：`cicicrystal2026/suxiaoT`）。
2. 打开 https://render.com → 注册/登录 → **New +** → **Blueprint**。
3. 选择本仓库，Render 会自动读取根目录的 `render.yaml`。
4. 在环境变量里填入 **`DEEPSEEK_API_KEY`**（`AUTH_SECRET` 会自动生成）。
5. 点 **Apply / Create**，等待构建（Docker 多阶段，约 3-5 分钟）。
6. 完成后会得到一个 `https://suxiaot-xxxx.onrender.com` 地址——直接打开即是完整应用。
   - 健康检查：`/api/health` 应返回 `provider: deepseek`。
   - 后台：`/admin`，账号 `operator@sztram` / `sztram2026`（请尽快改密码）。

> Render 免费实例闲置会休眠，首次访问需冷启动几十秒，属正常。
> 免费版文件系统不持久（重部署重置数据）。要持久化：升级并在服务上挂 1GB 磁盘到 `/data`，再把 `render.yaml` 里 `DB_PATH=/data/data.db` 的注释打开。

---

## 方案二：Railway

1. https://railway.app → **New Project** → **Deploy from GitHub repo** → 选本仓库。
2. Railway 会自动识别根目录 `Dockerfile` 并构建。
3. 在 **Variables** 里加 `DEEPSEEK_API_KEY` 和 `AUTH_SECRET`。
4. 部署完成后在 **Settings → Networking → Generate Domain** 生成公网地址。
5. 持久化：加一个 Volume 挂到 `/data`，并设 `DB_PATH=/data/data.db`。

---

## 方案三：任意服务器 / 自己的云主机（Docker）

```bash
# 在装了 Docker 的服务器上
git clone https://github.com/cicicrystal2026/suxiaoT.git
cd suxiaoT
docker build -t suxiaot .
docker run -d --name suxiaot -p 80:8787 \
  -e DEEPSEEK_API_KEY=sk-你的密钥 \
  -e AUTH_SECRET=$(openssl rand -hex 32) \
  -e DB_PATH=/data/data.db \
  -v suxiaot-data:/data \
  suxiaot
```
访问 `http://你的服务器IP/` 即可。`-v suxiaot-data:/data` 让数据库持久化。

---

## 方案四：不用 Docker，直接 Node 运行

适合已有 Node 环境的主机：
```bash
npm ci
VITE_BASE=/ npm run build          # 前端按根路径构建
DEEPSEEK_API_KEY=sk-xxx AUTH_SECRET=xxx PORT=8787 npm run start
```
`npm run start` 即 `node server/index.js`，会自动托管 `dist/` 与 API。

---

## 关于 GitHub Pages

仓库里的 `.github/workflows/deploy.yml` 会把**纯前端**发布到 `https://cicicrystal2026.github.io/suxiaoT/`，仅供看界面（**没有后端，AI/登录/数据不可用**）。要完整功能，请用上面任一方案部署带后端的版本。

## 上线前检查清单
- [ ] 设置随机 `AUTH_SECRET`
- [ ] 修改默认管理员密码（`server/db.js` 的种子，或登录后在用户管理改）
- [ ] 配置好 `DEEPSEEK_API_KEY`
- [ ] 需要保留数据则挂载持久化磁盘并设 `DB_PATH`
- [ ] 验证 `/api/health` 的 `hasKey: true`
