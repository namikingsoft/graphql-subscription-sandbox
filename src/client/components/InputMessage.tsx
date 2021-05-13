import React, { FormEvent } from 'react';
import {
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Send } from '@material-ui/icons/';
import { Message } from '../lib/api';

type Props = {
  onSubmit: (text: Message['text']) => void;
  loading: boolean;
};

export const InputMessage = ({ onSubmit, loading }: Props) => {
  const [text, setText] = React.useState('');

  const handleSubmit = React.useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit(text);
      setText('');
    },
    [text, onSubmit],
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <InputLabel shrink htmlFor="input-text">
          Message
        </InputLabel>
        <Input
          fullWidth
          autoFocus
          id="input-text"
          value={text}
          onChange={({ target }) => setText(target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="submit" disabled={loading}>
                <Send />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
};
