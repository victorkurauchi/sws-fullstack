## Description

SWS application to provide relevant information (stocks) for companies world-wide.

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/dashboard?id=victorkurauchi_sws-fullstack)

Backend will be running on http://localhost:4000 and frontend on http://localhost:3000

*Frontend deployment: https://sws-fullstack.vercel.app/*

*Backend deployment: http://sws-backend.victorkurauchi.co/companies*

*Note:*

There are integration tests on the backend to confirm that all required operations work as expected.

For the next iterations:

- [x] dockerize backend
- [x] deploy backend with Kubernetes (Digital Ocean)
- [x] deploy frontend with Vercel
- [x] e2e frontend with Cypress
- [ ] configure https certificate in Kubernetes (Digital Ocean)

### Setup docker backend (optional)

```bash
$ cd backend
$ docker build . -f .cicd/docker/Dockerfile.node
$ docker run -p 3000:4000 <image id>ab1667766129
$ open http://localhost:3000/companies
```

### Deploying to kubernetes

#### Apply kube changes

`cd backend`
`kubectl apply -f .cicd/kube`
`kubectl get pods`

#### Get ingress public IP/Host

`kubectl get ing --watch`

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
# e2e tests
$ yarn e2e

# unit tests
$ yarn test

# test coverage
$ yarn coverage
```

</details>
