FROM node:14.21.3-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /src

COPY package.json package-lock.json ./
RUN  npm install --production

FROM node:14.21.3-alpine AS builder
WORKDIR /src
COPY --from=deps /src/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM node:14.21.3-alpine AS runner
WORKDIR /src

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /src/.next ./.next
COPY --from=builder /src/node_modules ./node_modules
COPY --from=builder /src/package.json ./package.json

USER nextjs

EXPOSE 3000
