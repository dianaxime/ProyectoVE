import { schema } from 'normalizr';

export const eventParticipation = new schema.Entity(
    'eventParticipations',
);

export const eventParticipations = new schema.Array(eventParticipation);