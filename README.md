# REST API Boilerplate using TypeScript

## Introduction

`TypeScript` + `NodeJS` + practice repository for learning REST API server. You can also look at the boilerplate project. Functions are separated by `controller`, `service`, `repository`, and `model`.

The features are as follows.

1. Apply dependency injection pattern using [typedi](https://github.com/pleerock/typedi) and .
2. Apply [routing-controllers](https://github.com/typestack/routing-controllers) to handle controller routing
3. Apply ORM with [typeorm](https://github.com/typeorm/typeorm)
4. Apply tests using [jest](https://github.com/facebook/jest) (unit, integration, e2e)
5. Provide API docs using [swagger](https://github.com/scottie1984/swagger-ui-express)

## Installation

1.  [Install Node.js](https://nodejs.org/en/download/).
2.  Install `mysql` and run.
3.  Execute `npm install` to install the development dependencies.
4.  Create DB table (see `.env` file)
5.  `npm run start`
6.  `npm run migration:run`

## CLI Interface

1. test : `npm run test`
2. db migration create : `npm run migration:create`
3. db migration run : `npm run migration:run`

## API Specification

After running the API server, check the server `'hostname'+/swagger`.

## Improvement needs

1. Exception handling is required. I'll proceed with error handling.(Note. [ERROR Handling](https://github.com/typestack/routing-controllers#throw-http-errors))
2. There is no test implementation for all the logic.
3. API docs details are incomplete
