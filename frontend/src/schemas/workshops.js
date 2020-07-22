import { schema } from 'normalizr';

export const workshop = new schema.Entity(
  'workshops',
);

export const workshops = new schema.Array(workshop);