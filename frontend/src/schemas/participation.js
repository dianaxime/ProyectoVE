import { schema } from 'normalizr';

export const participation = new schema.Entity(
    'participations',
);

export const participations = new schema.Array(participation);