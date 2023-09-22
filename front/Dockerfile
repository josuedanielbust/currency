FROM node:20-alpine

# Build arguments and Environment variables
ARG API_URL
ARG CURRENCY_FROM
ARG CURRENCY_TO
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV API_URL=${API_URL}
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
CMD ["npm", "start"]
