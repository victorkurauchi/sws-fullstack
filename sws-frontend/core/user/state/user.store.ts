import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { User } from './user.model';

export interface UsersState extends EntityState<User> {}

@StoreConfig({ name: 'users' })
export class UserStore extends EntityStore<UsersState, User> {
}

export const userStore = new UserStore();
