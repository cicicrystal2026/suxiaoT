# 苏小T · AI 导览（苏州高新有轨电车）

一个面向有轨电车乘客的 AI 出行导览应用 + 运营管理后台。

- **手机端（C 端，19 个页面）**：智能问答、实时到站、文旅推荐、四季 IP、优惠券、积分商城、AR 集章、个人中心等
- **管理后台（B 端，9 个页面）**：数据看板、知识库审核、活动 / 券码 / 推送 / 专线 / 用户 / 角色权限
- **AI 问答**：苏小T 由大模型驱动，**只依据后台「已通过」的知识条目作答**，从机制上避免编造（迷你 RAG）

> 在线预览（纯前端界面，无 AI / 无后端数据）：https://cicicrystal2026.github.io/suxiaoT/

---

## 技术栈

| 层 | 技术 |
|----|------|
| 前端 | Vite 5 + React 18 + React Router v6 |
| 后端 | Node + Express 5 |
| 数据库 | SQLite（better-sqlite3，零配置） |
| AI | 可切换 provider：**DeepSeek** / OpenAI 兼容 / Anthropic |

---

## 本地运行（推荐 DeepSeek）

### 1. 安装依赖
```bash
npm install
```

### 2. 配置密钥
复制 `.env.example` 为 `.env`，填入你的 DeepSeek 密钥：
```bash
cp .env.example .env
```
```ini
# .env
DEEPSEEK_API_KEY=sk-你的DeepSeek密钥
# CHAT_MODEL=deepseek-chat   # 可选，默认就是 deepseek-chat
```
> DeepSeek 密钥申请：https://platform.deepseek.com/api_keys
> 也可改用 Anthropic（`ANTHROPIC_API_KEY`）或其它 OpenAI 兼容服务，详见 `.env.example`。

### 3. 启动（开两个终端）
```bash
# 终端 1：后端（AI 代理 + 数据接口，端口 8787）
npm run server

# 终端 2：前端（端口 5173，已配好 /api 代理到后端）
npm run dev
```

### 4. 打开
- 手机端：http://localhost:5173/suxiaoT/
- 管理后台：http://localhost:5173/suxiaoT/admin

> 在浏览器里按 F12 → 切换设备工具栏，用手机视图看 C 端效果最佳（按 393px 手机屏设计）。

---

## 体验亮点

- **和苏小T对话**：进「智能问答」，问「末班车几点」「到太湖怎么走」「樱花专列几点发车」——回答由大模型实时流式生成，且基于知识库事实。
- **知识库控制 AI**：进后台「知识库管理」，把一条「待审核」点成「通过」或「驳回」——苏小T 能引用的依据会随之实时变化。这就是设计里「未审核不输出、杜绝编造」机制的落地。

---

## 目录结构

```
server/            # 后端
  index.js         #   Express：/api/chat（流式）+ 数据接口 + 生产托管 dist
  llm.js           #   provider 自动切换 + 苏小T 人设 + 知识依据拼装
  db.js            #   SQLite 建表 + 种子数据
src/
  components/      # 共享组件（手机端 + admin）
  screens/mobile/  # 19 个 C 端页面
  screens/admin/   # 9 个 B 端页面
  lib/api.js       # 前端调用后端的封装（含流式对话）
  styles/          # 设计系统 CSS（sx.css 手机端 / adm.css 后台）
```

---

## 部署

👉 **完整部署步骤见 [DEPLOY.md](./DEPLOY.md)**（Render 一键蓝图 / Railway / Docker / 裸 Node 四种方案）。

一句话：本项目是**单个 Node 服务**——`docker build` 后运行，它会同时托管 API、AI、数据库和前端页面，一个网址访问完整应用。仓库已附 `Dockerfile`、`render.yaml`。

> ⚠️ GitHub Pages（`.github/workflows/deploy.yml`）只发布**纯前端**到 `https://cicicrystal2026.github.io/suxiaoT/`，仅供看界面；AI / 登录 / 数据需要按 DEPLOY.md 部署带后端的版本。

---

## 实现状态

**已完成**
- 28 个页面 UI 与路由
- AI 问答（流式、知识库接地、provider 可切换）
- SQLite 数据层（券 / 积分 / 知识库）+ 知识库审核读写

**待开发（下一步）**
- 更多页面接入真实后端数据（券中心、积分商城等）
- 登录与实名（微信授权 / 手机号）
- 券核销、积分、消息推送等业务写操作
- 实时到站（需对接电车运营方数据源）
