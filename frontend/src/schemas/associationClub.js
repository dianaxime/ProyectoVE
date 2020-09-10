import { schema } from 'normalizr';

export const associationClub = new schema.Entity(
  'associationClubs',
);

export const associationClubs = new schema.Array(associationClub);