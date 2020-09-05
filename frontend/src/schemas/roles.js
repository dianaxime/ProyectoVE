import { schema } from 'normalizr';

export const role = new schema.Entity(
  'roles',
);

export const roles = new schema.Array(role);