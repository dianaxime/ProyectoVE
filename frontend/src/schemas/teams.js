import { schema } from 'normalizr';

export const teams = new schema.Entity(
  'teams',
);

export const teams = new schema.Array(teams);