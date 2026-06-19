# ---- 构建前端 ----
FROM node:20-bookworm AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# 单服务托管：前端从根路径提供（非 GitHub Pages 子路径）
ENV VITE_BASE=/
RUN npm run build

# ---- 运行时（同时托管 API + 前端 dist）----
FROM node:20-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
# 复用构建阶段已编译好的依赖（含 better-sqlite3 原生模块，glibc x64 兼容）
COPY package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY server ./server
COPY --from=build /app/dist ./dist
# 平台会注入 PORT；服务读取 process.env.PORT
EXPOSE 8787
CMD ["node", "server/index.js"]
