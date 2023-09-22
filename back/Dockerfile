FROM node:20-alpine

# Build arguments and Environment variables
ARG REDIS_HOST
ARG CURRENCY_FROM
ARG CURRENCY_TO
ARG API_URL
ARG API_KEY

ENV PORT=3001
ENV REDIS_HOST=${REDIS_HOST}
ENV API_URL=${API_URL}
ENV API_KEY=${API_KEY}
ENV CURRENCY_FROM=${CURRENCY_FROM}
ENV CURRENCY_TO=${CURRENCY_TO}

# Create app directory
WORKDIR /var/www

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .
RUN npm run build

# Expose NodeJS server port
EXPOSE $PORT

# Set the default command to run when starting the container
# CMD ["npm", "start"]
ENTRYPOINT ["npm", "start"]
