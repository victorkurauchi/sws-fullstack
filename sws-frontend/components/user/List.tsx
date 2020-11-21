import React from 'react';
import { List } from 'antd';
import { User } from '../../core/user/state/user.model';
import Details from './Details';

interface Props {
  users: User[];
  onSelect: Function;
}

export default function UserList({ users, onSelect }: Props) {
  const data = users.map((user: User) => (
    <Details key={user.id} user={user} onEdit={onSelect} />
  ));

  return (
    <section>
      { data && data.length && <List itemLayout="horizontal" className="collection">{data}</List> }
    </section>
  );
}
