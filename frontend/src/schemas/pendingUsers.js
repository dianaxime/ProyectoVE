import { schema } from 'normalizr';


export const pendingUser = new schema.Entity(
  'pendingUsers',
);
export const pendingUsers = new schema.Array(pendingUser);