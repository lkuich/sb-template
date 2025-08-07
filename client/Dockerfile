FROM node:24 AS base

ENV CYPRESS_INSTALL_BINARY=0
ENV STORYBLOK_VERSION=published
ENV NEXT_PUBLIC_SITE_URL=http://localhost:8080

WORKDIR /app
COPY package.json pnpm** ./

FROM base AS package
COPY .npmrc package.json pnpm** tsconfig** ./
COPY client ./client
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile && rm -f .npmrc

FROM package AS dev
CMD ["pnpm", "dev"]
