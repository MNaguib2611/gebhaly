# Base image
FROM node:18.12.1-alpine

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json, package-lock.json and yarn.lock are copied
COPY package*.json yarn.lock ./

# Install app dependencies
RUN yarn install --frozen-lockfile

# Bundle app source
COPY . .

CMD [ "yarn", "start" ]
