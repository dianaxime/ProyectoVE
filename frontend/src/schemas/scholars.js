import { schema } from 'normalizr';

export const scholar = new schema.Entity(
    'scholars',
);

export const scholars = new schema.Array(scholar);