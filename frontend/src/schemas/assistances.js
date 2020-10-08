import { schema } from 'normalizr';

export const assistance = new schema.Entity(
    'assistances',
);

export const assistances = new schema.Array(assistance);