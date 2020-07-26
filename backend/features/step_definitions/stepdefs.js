const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const { createWorksop } = require('../../src/controllers/workshopController');

When('I create a new workshop with details:', function (dataTable) {
    // Write code here that turns the phrase above into concrete actions
    const data = dataTable.rowsHash();
    createWorksop(data);
    //return 'pending';
});

Then('the workshop is created successfully', function () {
    // Write code here that turns the phrase above into concrete actions
    return true;
});