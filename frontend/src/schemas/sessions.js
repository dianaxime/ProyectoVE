import { schema } from 'normalizr';

export const session = new schema.Entity(
    'sessions',
);

export const sessions = new schema.Array(session);