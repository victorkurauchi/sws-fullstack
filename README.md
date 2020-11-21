## Description

SWS application to provide relevant information (stocks) for companies world-wide.

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/dashboard?id=victorkurauchi_sws-fullstack)

*Note:*

There are integration tests on the backend to confirm that all required operations work as expected.

For the next iterations:

- [ ] dockerize frontend and backend
- [ ] deploy backend with Kubernetes (Digital Ocean)
- [ ] deploy frontend with Vercel

<details><summary>Backend</summary>

### Technologies

- NestJS
- Jest 
- Supertest
- Dependency Injection
- TypeORM
- Sonarcloud

```bash
$ cd backend
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

</details>

<details><summary>Frontend</summary>

### Technologies

- NextJS
- Jest 
- Akita state management
- RxJS
- AntDesign
- React hooks

### Installation

```bash
$ cd sws-frontend
$ yarn install
```

### Running the app

```bash
# development
$ yarn dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ yarn test

# test coverage
$ yarn coverage
```

</details>
