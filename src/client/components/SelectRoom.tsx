import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Room } from '../lib/api';

type Props = {
  rooms: Room[];
  value: Room['id'];
  onChange: (id: Room['id']) => void;
};

export const SelectRoom = ({ rooms, value, onChange }: Props) => (
  <FormControl fullWidth>
    <InputLabel shrink htmlFor="input-room">
      Room
    </InputLabel>
    <Select
      fullWidth
      id="input-room"
      value={value}
      onChange={({ target }) => onChange(target.value as string)}
    >
      {rooms.map((room) => (
        <MenuItem key={room.id} value={room.id}>
          {room.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
