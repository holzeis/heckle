FROM node:16-alpine

# Create app directory
WORKDIR /usr

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
RUN npm ci
RUN npm run build

## this is stage two , where the app actually runs
FROM node:16-alpine

LABEL org.opencontainers.image.source="https://github.com/holzeis/heckle"

# Create app directory
WORKDIR /usr

COPY package*.json ./
RUN npm ci --only=production
COPY --from=0 /usr/dist .
RUN npm install pm2 -g

EXPOSE 3000
EXPOSE 2000

CMD ["pm2-runtime","app.js"]