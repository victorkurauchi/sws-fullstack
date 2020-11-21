import React from 'react';
import { List, Avatar, Image } from 'antd';
import { User } from '../../core/user/state/user.model';

interface Props {
  user: User;
  onEdit: Function;
}

export default function Details({ user, onEdit }: Props) {
  const { username, email, id } = user;

  return (
    <List.Item className="collection-item avatar">
      <Avatar
        src={<Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
      />
      <span className="title">{username}</span>
      <p>{email}</p>
      <span className="secondary-content">
        <i
          className="material-icons"
          onClick={onEdit(id)}
        >
          edit
        </i>
      </span>
    </List.Item>
  );
}
