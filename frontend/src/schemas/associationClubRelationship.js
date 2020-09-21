import { schema } from 'normalizr';

export const associationClubRelationship = new schema.Entity(
    'associationClubRelationships',
);

export const associationClubRelationships = new schema.Array(associationClubRelationship);