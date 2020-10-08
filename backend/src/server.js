const express = require('express');
const cors = require( 'cors');
const env = require('./env');

const usersRoute = require('./routes/usersRoute');
const scholarsRoute = require('./routes/scholarsRoute');
const workshopRoute = require('./routes/workshopRoute');
const teamRoute = require('./routes/teamsRoute');
const tournamentRoute = require('./routes/tournamentsRoute');
const participationRoute = require('./routes/participationRoute');
const eventRoute = require('./routes/eventRoute');
const eventParticipationRoute = require('./routes/participationEventRoute');
const roleRelationshipRoute = require('./routes/rolesRelationshipRoute');
const roleRoute = require('./routes/roleRoute');
const ACRoute = require('./routes/association_clubRoute');
const ACParticipationRoute = require('./routes/association_clubRelationshipRoute');
const sessionRoute = require('./routes/sessionsRoute');
const assistanceRoute = require('./routes/assistanceRoute');
const statisticsRoute = require('./routes/statisticsRoute');


const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());

// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1', usersRoute);
app.use('/api/v1', scholarsRoute);
app.use('/api/v1', workshopRoute);
app.use('/api/v1', teamRoute);
app.use('/api/v1', tournamentRoute);
app.use('/api/v1', participationRoute);
app.use('/api/v1', eventRoute);
app.use('/api/v1', eventParticipationRoute);
app.use('/api/v1', roleRelationshipRoute);
app.use('/api/v1', roleRoute);
app.use('/api/v1', ACRoute);
app.use('/api/v1', ACParticipationRoute );
app.use('/api/v1', sessionRoute );
app.use('/api/v1', assistanceRoute );
app.use('/api/v1', statisticsRoute );
//app.use('/api/v1', statisticsRoute );

app.listen(env.port).on('listening', () => {
    console.log(`are live on ${env.port}`);
});