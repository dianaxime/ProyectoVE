const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const { createWorkshopQuery } = require('../../src/repository/workshop');
const { createTeamQuery } = require('../../src/repository/team');

let workshop = {};
let team = {};

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