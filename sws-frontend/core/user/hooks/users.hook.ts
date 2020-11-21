import { useState, useEffect } from 'react';
import { Observable, Subscription } from 'rxjs';
import { User } from '../state/user.model';
import { usersService } from '../state/user.service';
import { usersQuery } from '../state/user.query';

interface UserState { users: User[]; active: User | null; }

function onEmit<T>(source$:Observable<T>, nextFn:(value: T) => void): Subscription {
  return source$.subscribe(nextFn, console.error);
}

/**
 * Custom Hook to manage a view Model for Users view components
 */
export function useUsersFacade(): [UserState, Function, Function] {
  const setActive = (id: string) => usersService.setActive(id);
  const setUser = (newUser: User) => usersService.updateActive(newUser);
  const [state, setState] = useState({ users: [], active: null } as UserState); 

  /**
   * Load all users and build selectors for `users` or `active` state changes
   * Manage subscriptions with auto-cleanup
   */
  useEffect(() => {
    usersService.loadAll();
    
    const subscriptions: Subscription[] = [
      onEmit<User[]>(usersQuery.users$, users => setState(state => ({ ...state, users  })) ),
      // onEmit<User>(usersQuery.active$, active => setState(state => ({ ...state, active })) )
    ];

    return () => { subscriptions.map(it => it.unsubscribe()) };
  },[]);

  return [state, setActive, setUser]
}
