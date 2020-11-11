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

const selectedTournament = index => ({
    type: 'TOURNAMENT_SELECTED',
    payload: {
        index,
    },
});


const state = {
    byIdTournament: {},
    orderTournament: [],
    isFetchingTournament: false,
    errorTournament: null,
}

const startAddingParticipation = (id, userid, idw, startdate, enddate) => ({
    type: 'PARTICIPATION_ADD_STARTED',
    payload: {
        id,
        userid,
        idw,
        startdate,
        enddate,
    },
});

const completeAddingParticipation = (oldId, tournament) => ({
    type: 'PARTICIPATION_ADD_COMPLETED',
    payload: {
        oldId,
        tournament,
    },
});

const failAddingParticipation = (oldId, error) => ({
    type: 'PARTICIPATION_ADD_FAILED',
    payload: {
        oldId,
        error,
    },
});

const selectedParticipation = index => ({
    type: 'PARTICIPATION_SELECTED',
    payload: {
        index,
    },
});

const stateW = {
    byIdParticipation: {},
    orderParticipation: [],
    isFetchingParticipation: false,
    errorParticipation: null,
}

describe('Participation', () => {

    it('should handle PARTICIPATION_ADD_STARTED', () => {
        const action = startAddingParticipation(1, 5, 8, '04/09/2020', '20/09/2020');
        assert.equal(action.type, 'PARTICIPATION_ADD_STARTED');
    });

    it('should handle PARTICIPATION_ADD_STARTED', () => {
        const action = startAddingParticipation(1, 5, 8, '04/09/2020', '20/09/2020');
        assert.equal(action.payload.startdate, '04/09/2020');
    });

    it('should handle PARTICIPATION_ADD_COMPLETED', () => {
        const action = completeAddingParticipation(1, {id: 1, userid: 5, idw: 8, startdate: '04/09/2020', enddate: '20/09/2020'});
        assert.equal(action.type, 'PARTICIPATION_ADD_COMPLETED');
    });

    it('should handle PARTICIPATION_ADD_COMPLETED', () => {
        const action = completeAddingParticipation(1, {id: 1, userid: 5, idw: 8, startdate: '04/09/2020', enddate: '20/09/2020'});
        assert.equal(action.payload.tournament.userid, 5);
    });

    it('should handle PARTICIPATION_ADD_FAILED', () => {
        const action = failAddingParticipation(1, 'UNEXPECTED ERROR');
        assert.equal(action.type, 'PARTICIPATION_ADD_FAILED');
    });

    it('should handle PARTICIPATION_ADD_FAILED', () => {
        const action = failAddingParticipation(1, 'UNEXPECTED ERROR');
        assert.equal(action.payload.error, 'UNEXPECTED ERROR');
    });

    it('should handle PARTICIPATION_SELECTED', () => {
        const action = selectedParticipation(10);
        assert.equal(action.type, 'PARTICIPATION_SELECTED');
    });

    it('should handle PARTICIPATION_SELECTED', () => {
        const action = selectedParticipation(10);
        assert.equal(action.payload.index, 10);
    });

});

describe('Tournament', () => {

    it('should handle TOURNAMENT_ADD_STARTED', () => {
        const action = startAddingTournament(1, 5, 8, '04/09/2020', '20/09/2020');
        assert.equal(action.type, 'TOURNAMENT_ADD_STARTED');
    });

    it('should handle TOURNAMENT_ADD_STARTED', () => {
        const action = startAddingTournament(1, 5, 8, '04/09/2020', '20/09/2020');
        assert.equal(action.payload.startdate, '04/09/2020');
    });

    it('should handle TOURNAMENT_ADD_COMPLETED', () => {
        const action = completeAddingTournament(1, {id: 1, userid: 5, idt: 8, startdate: '04/09/2020', enddate: '20/09/2020'});
        assert.equal(action.type, 'TOURNAMENT_ADD_COMPLETED');
    });

    it('should handle TOURNAMENT_ADD_COMPLETED', () => {
        const action = completeAddingTournament(1, {id: 1, userid: 5, idt: 8, startdate: '04/09/2020', enddate: '20/09/2020'});
        assert.equal(action.payload.tournament.userid, 5);
    });

    it('should handle TOURNAMENT_ADD_FAILED', () => {
        const action = failAddingTournament(1, 'UNEXPECTED ERROR');
        assert.equal(action.type, 'TOURNAMENT_ADD_FAILED');
    });

    it('should handle TOURNAMENT_ADD_FAILED', () => {
        const action = failAddingTournament(1, 'UNEXPECTED ERROR');
        assert.equal(action.payload.error, 'UNEXPECTED ERROR');
    });

    it('should handle TOURNAMENT_SELECTED', () => {
        const action = selectedTournament(10);
        assert.equal(action.type, 'TOURNAMENT_SELECTED');
    });

    it('should handle TOURNAMENT_SELECTED', () => {
        const action = selectedTournament(10);
        assert.equal(action.payload.index, 10);
    });

});