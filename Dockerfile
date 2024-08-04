FROM node:22.5.1 as builder

EXPOSE 3000

WORKDIR /public

# DEVELOPMENT STAGE
FROM builder as development
ENV NODE_ENV=development

USER node

CMD ["npm", "run", "start:dev"]

# PRODUCTION STAGE
FROM builder as production

ENV NODE_ENV=production

COPY --chown=node package*.json ./
COPY --chown=node node_modules ./node_modules
RUN npm prune --production
COPY --chown=node dist ./dist

USER node

CMD ["/bin/sh", "-c", "npm run start:prod"]
