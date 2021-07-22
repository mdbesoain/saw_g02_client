# build environment
FROM node:13.12.0-alpine as build
RUN mkdir /app
WORKDIR /app
COPY package-lock.json /app
COPY package.json /app
RUN cd /app
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN cd ..
COPY . /app
RUN cd /app
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build/ /usr/share/nginx/html/
COPY nginx/nginx.conf /etc/nginx/conf.d/default.template
CMD sh -c "envsubst \"`env | awk -F = '{printf \" \\\\$%s\", $1}'`\" < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"

##CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
