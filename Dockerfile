FROM node:boron

RUN npm install yarn -g

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY . /app
RUN yarn

#RUN npm install

EXPOSE 8080
CMD [ "npm", "prod" ]