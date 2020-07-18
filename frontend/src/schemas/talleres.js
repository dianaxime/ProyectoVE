import { schema } from 'normalizr';


export const taller = new schema.Entity(
  'talleres',
);
export const talleres = new schema.Array(taller);