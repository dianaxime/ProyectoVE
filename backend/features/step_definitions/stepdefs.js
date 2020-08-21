const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const { createWorkshopQuery } = require('../../src/repository/workshop');
const { createTeamQuery } = require('../../src/repository/team');
const { createParticipationQuery } = require('../../src/repository/participation');
const { createTournamentQuery } = require('../../src/repository/tournament');

let workshop = {};
let team = {};
let participation = {};
let tournament = {};

When('I create a new workshop with details:', async function (dataTable) {
    // Write code here that turns the phrase above into concrete actions
    const dataWS = dataTable.rowsHash();
    workshop = await createWorkshopQuery(dataWS);
    workshop = workshop[0];
    //return 'pending';
});

Then('the workshop is created successfully, the workshop description should be {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return assert.equal(workshop.description, string);
    //return 'pending';
});

When('I create a new team with details:', async function (dataTable) {
    // Write code here that turns the phrase above into concrete actions
    const dataTeam = dataTable.rowsHash();
    team = await createTeamQuery(dataTeam);
    team = team[0];
    // return 'pending';
});

Then('the team is created successfully, the team sport should be {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return assert.equal(team.sport, string);
    // return 'pending';
});

When('I create a new participation with details:', async function (dataTable) {
    // Write code here that turns the phrase above into concrete actions
    const dataP = dataTable.rowsHash();
    participation = await createParticipationQuery(dataP);
    participation = participation[0];
    //return 'pending';
});

Then('the participation is created successfully, the userid should be {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return assert.equal(participation.userid, string);
    // return 'pending';
});

When('I create a new tournament with details:', async function (dataTable) {
    // Write code here that turns the phrase above into concrete actions
    const dataT = dataTable.rowsHash();
    tournament = await createTournamentQuery(dataT);
    tournament = tournament[0];
    //return 'pending';
});

Then('the tournament is created successfully, the userid should be {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return assert.equal(tournament.userid, string);
    // return 'pending';
});