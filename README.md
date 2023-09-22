# Currency Exchange App

## Content table
- [Test requirements](#test-requirements)
- [Solution](#solution)
  - [Requirements](#requirements)
  - [How to run](#how-to-run)
  - [Used technologies](#used-technologies)
- [Author](#author)


## Test requirements
- Your task is to develop a TypeScript / React application that interacts with the [Currency Converter API][#1]. The goal is to continuously fetch and display the currency conversion rates between USD and BRL for the last 24 hours.

## Solution
### Requirements
- Docker
- Docker Compose
- Node.js (v20.6.1)
- Redis Stack Server

### How to run
- Clone this repository
- Create a `.env` file in the root of the project and add the following variables:
```
API_URL=https://currency-converter5.p.rapidapi.com
API_KEY=YOUR_API_KEY
CURRENCY_FROM=USD
CURRENCY_TO=BRL
```
    - `API_URL` is the URL of the [Currency Converter API][#1]
    - `API_KEY` is the API Key of the [Currency Converter API][#1]
    - `CURRENCY_FROM` is the currency that you want to convert from
    - `CURRENCY_TO` is the currency that you want to convert to
- Run `docker-compose build` to build the application
- Run `docker-compose up -d redis` to start the Redis Stack Server on detached mode
- Run `docker-compose up -d back` to start the backend on detached mode
- Run `docker-compose up -d front` to start the frontend on detached mode
- Open your browser and access `http://localhost:3000`

### Used technologies
- [Node.js][#2] (v20.6.1)
- [React][#3] (v18.2.0)
- [Next.js][#4] (v13.4.19)
- [Fastify][#5] (v4.0.0)
- [Redis][#6] (v7.2.0)
- [Docker][#7]
- [Docker Compose][#8]
- [TypeScript][#9] (v5.2.2)

## Author
[Josue Daniel Bustamante](https://github.com/josuedanielbust)


[#1]: https://rapidapi.com/natkapral/api/currency-converter5
[#2]: https://nodejs.org/en/
[#3]: https://reactjs.org/
[#4]: https://nextjs.org/
[#5]: https://www.fastify.io/
[#6]: https://redis.io/
[#7]: https://www.docker.com/
[#8]: https://docs.docker.com/compose/
[#9]: https://www.typescriptlang.org/
