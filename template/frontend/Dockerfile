# stage1 - build react app first 
FROM node:16-alpine3.15 as build
ARG REACT_APP_BASE_API_URL
ARG PORT
ARG CHOKIDAR_USEPOLLING

ENV REACT_APP_BASE_API_URL=$REACT_APP_BASE_API_URL
ENV PORT=$PORT
ENV CHOKIDAR_USEPOLLING=$CHOKIDAR_USEPOLLING

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
COPY ./package-lock.json /app/
RUN npm install --legacy-peer-deps
COPY . /app
RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.20-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE ${PORT}
CMD ["nginx", "-g", "daemon off;"]