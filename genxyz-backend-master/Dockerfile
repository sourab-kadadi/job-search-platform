FROM node:14.16

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install
# If you are building your code for production
# RUN npm install --only=production
RUN npm install -g @nestjs/cli@6.14.2
RUN npm install pm2 -g


# Bundle app source
COPY . .
RUN npm run build

# Show current folder structure in logs
RUN ls -al -R

EXPOSE 2000

CMD [ "pm2-runtime", "pm2.json" ]
# CMD ["npm", "run", "start:prod"]