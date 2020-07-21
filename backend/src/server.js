const express = require('express');
const cors = require( 'cors');
const env = require('./env');

const usersRoute = require('./routes/usersRoute');
const scholarsRoute = require('./routes/scholarsRoute');
const workshopRoute = require('./routes/workshopRoute');
const teamRoute = require('./routes/teamsRoute');
const tournamentRoute = require('./routes/tournamentsRoute');
const participationRoute = require('./routes/participationRoute');

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

app.listen(env.port).on('listening', () => {
    console.log(`are live on ${env.port}`);
});