# ---- Backend Dockerfile ----
FROM oven/bun:1.1 as base

WORKDIR /app

COPY . .

RUN bun install

EXPOSE 3000

CMD ["bun", "run", "server/server.ts"]
