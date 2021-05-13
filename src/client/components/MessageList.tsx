import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';
import { Person } from '@material-ui/icons/';
import { Message } from '../lib/api';

type Props = {
  messages: Message[];
};

export const MessageList = ({ messages }: Props) => (
  <List component="nav">
    {messages.map((message) => (
      <ListItem key={message.id}>
        <ListItemAvatar>
          <Avatar>
            <Person />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={message.text}
          secondary={String(new Date(message.createdAt))}
        />
      </ListItem>
    ))}
  </List>
);
