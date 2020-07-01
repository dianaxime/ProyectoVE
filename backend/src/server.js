import express from 'express';
import 'babel-polyfill';
import cors from 'cors';
import env from './env';

import usersRoute from './routes/usersRoute';
import seedRoute from './app/routes/seedRoute';

const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());

// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1', usersRoute);
app.use('/api/v1', seedRoute);

app.listen(env.port).on('listening', () => {
    console.log(`are live on ${env.port}`);
});

export default app;
