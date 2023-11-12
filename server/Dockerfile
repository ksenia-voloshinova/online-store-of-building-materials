FROM node:14.21.3-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /server

COPY package.json package-lock.json ./
RUN  npm install --production

FROM node:14.21.3-alpine AS builder
WORKDIR /server
COPY --from=deps /server/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

FROM node:14.21.3-alpine AS runner
WORKDIR /server

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /server/node_modules ./node_modules
COPY --from=builder /server/package.json ./package.json

USER nextjs

EXPOSE 3005