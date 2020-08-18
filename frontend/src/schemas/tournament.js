import { schema } from 'normalizr';

export const tournament = new schema.Entity(
    'tournaments',
);

export const tournaments = new schema.Array(tournament);