FROM node:18-alpine AS builder
WORKDIR "/app"
COPY . .
RUN cd client && npm i && npm run build && npm prune --production
RUN cd microservice && npm i && npm run build && npm prune --production
FROM node:18-alpine AS production
WORKDIR "/app"
RUN mkdir client microservice

COPY --from=builder /app/client/package.json ./client/package.json 
COPY --from=builder /app/client/package-lock.json ./client/package-lock.json
COPY --from=builder /app/client/dist ./client/dist
COPY --from=builder /app/client/node_modules ./client/node_modules

COPY --from=builder /app/microservice/package.json ./microservice/package.json 
COPY --from=builder /app/microservice/package-lock.json ./microservice/package-lock.json
COPY --from=builder /app/microservice/dist ./microservice/dist
COPY --from=builder /app/microservice/node_modules ./microservice/node_modules

CMD [ "ash", "-c", "node microservice/dist/main & node client/dist/main"]