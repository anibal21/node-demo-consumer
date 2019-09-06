FROM keymetrics/pm2:latest-alpine

# Create folder for the project
RUN mkdir -p /usr/src/api

# Copy pm2.json
COPY pm2.json /usr/src/api

# Positioning in the folder
WORKDIR /usr/src/api

# Copy package.json to the folder
COPY package.json /usr/src/api/

# Install dependencies
RUN [ "npm", "install" ]

# Copy all files to source folder
COPY . /usr/src/api

# build dependencies
RUN [ "npm", "run","build" ]

# Positioning in the folder
WORKDIR /usr/src/api/dist

# Copy pm2.json
COPY pm2.json /usr/src/api/dist

# Copy pm2.json
COPY package.json /usr/src/api/dist

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

# Expose ports needed to use Keymetrics.io
EXPOSE 443 43554 5000

# Start pm2.json process file
CMD ["pm2-runtime", "start", "pm2.json"]
