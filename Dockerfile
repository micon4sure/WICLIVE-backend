FROM oven/bun:1 AS build

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY src/ ./src/
COPY tsconfig.json keys.json ./

RUN bun build ./src/index.ts --target bun --outdir ./build && \
    bun build ./src/set-final.ts --target bun --outdir ./build

# ---

FROM oven/bun:1-slim

WORKDIR /app

COPY --from=build /app/build/ ./build/
COPY --from=build /app/keys.json ./

RUN mkdir -p maps uploads uploads-tmp files

EXPOSE 3243

CMD ["bun", "run", "./build/index.js"]
