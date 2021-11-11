FROM node:alpine
WORKDIR /site
COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./ ./
RUN npm i
RUN npm run build
CMD ["npm", "run", "start"]