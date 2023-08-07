FROM node:20.5

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN corepack pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000
CMD [ "corepack", "pnpm", "start:dev" ]
