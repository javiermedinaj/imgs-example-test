FROM oven/bun:1.1 as build

WORKDIR /app

COPY . .

RUN bun install
RUN bun run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]