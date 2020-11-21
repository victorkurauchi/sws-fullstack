import { ID } from '@datorama/akita';
import { of } from 'rxjs';
import { UserStore, userStore } from './user.store';
import { User } from './user.model';
import data from './user.data';

export class UsersService {
  constructor(private usersStore: UserStore) {}

  loadAll() {
    of(data).subscribe(entities => {
      this.usersStore.set(entities);
    });
  }

  setActive(id: ID) {
    this.usersStore.setActive(id);
  }

  updateActive(user: User) {
    this.usersStore.updateActive(user);
  }
}

export const usersService = new UsersService(userStore);
