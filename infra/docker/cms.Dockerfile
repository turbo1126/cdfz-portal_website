FROM node:22-bookworm-slim

WORKDIR /app

COPY apps/cms/package.json apps/cms/package.json
COPY apps/cms/pnpm-lock.yaml apps/cms/pnpm-lock.yaml

WORKDIR /app/apps/cms

RUN corepack enable && pnpm install --frozen-lockfile=false

COPY apps/cms /app/apps/cms

RUN pnpm build

EXPOSE 1337

CMD ["pnpm", "start"]
