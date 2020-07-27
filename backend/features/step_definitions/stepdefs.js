const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const { createWorkshopQuery } = require('../../src/repository/workshop');

let resultado = {};

When('I create a new workshop with details:', async function (dataTable) {
    // Write code here that turns the phrase above into concrete actions
    const data = dataTable.rowsHash();
    resultado = await createWorkshopQuery(data);
    resultado = resultado[0];
    //return 'pending';
});

Then('the workshop is created successfully, the workshop description should be {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return assert.equal(resultado.description, string);
    //return 'pending';
});