var assert = require('assert');

const startAddingTournament = (id, userid, idt, startdate, enddate) => ({
    type: 'TOURNAMENT_ADD_STARTED',
    payload: {
        id,
        userid,
        idt,
        startdate,
        enddate,
    },
});

const completeAddingTournament = (oldId, tournament) => ({
    type: 'TOURNAMENT_ADD_COMPLETED',
    payload: {
        oldId,
        tournament,
    },
});

const failAddingTournament = (oldId, error) => ({
    type: 'TOURNAMENT_ADD_FAILED',
    payload: {
        oldId,
        error,
    },
});


const state = {
    byIdTournament: {},
    orderTournament: [],
    isFetchingTournament: false,
    errorTournament: null,
}

describe('Tournament', () => {

    it('should handle TOURNAMENT_ADD_STARTED', () => {
        const action = startAddingTournament(1, 5, 8, '04/09/2020', '20/09/2020');
        assert.equal(action.type, 'TOURNAMENT_ADD_STARTED');
    });

    it('should handle TOURNAMENT_ADD_COMPLETED', () => {
        const action = completeAddingTournament(1, {id: 1, userid: 5, idt: 8, startdate: '04/09/2020', enddate: '20/09/2020'});
        assert.equal(action.type, 'TOURNAMENT_ADD_COMPLETED');
    });

    it('should handle TOURNAMENT_ADD_FAILED', () => {
        const action = failAddingTournament(1, 'UNEXPECTED ERROR');
        assert.equal(action.type, 'TOURNAMENT_ADD_FAILED');
        assert.equal(action.payload.error, 'UNEXPECTED ERROR');
    });

});