FROM node:20.5

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN corepack pnpm install --frozen-lockfile

COPY . .

EXPOSE 5173
CMD [ "corepack", "pnpm", "dev", "--host" ]

