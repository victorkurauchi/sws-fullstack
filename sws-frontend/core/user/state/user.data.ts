import { User } from '../state/user.model';
const faker = require('faker');

const count = 10;
const data = [];

for (let i = 0; i < count; i++) {
  data.push({
    id: faker.random.number(),
    username: faker.name.findName(),
    email: faker.internet.email(),
    avatar: ''
  });
}

export default data as User[];
