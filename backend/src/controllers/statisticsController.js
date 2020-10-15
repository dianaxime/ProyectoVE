require('dotenv').config();

const {
    empty,
} = require('../helpers/validation');

const {
    errorMessage,
    successMessage,
    status,
} = require('../helpers/status');

const {
    getAssistanceOfClubQuery,
    getAssistanceOfAllClubsQuery,
    getPlayersInTournamentQuery,
    getPlayersOfSportInTournamentQuery,
    getTeamsOfTournamentQuery,
    getTeamsOfASportInTournamentQuery,
    getGenderOfTournamentQuery,
    getGenderOfSportInTournamentQuery,
    getAllScholarsQuery,
    getAllScholarsFemaleQuery,
    getAllScholarsMaleQuery,
    getCountEventsQuery,
    getParticipactionWorkshopsInTimeQuery,
    getParticipactionWorkshopQuery,
    getGenderParticipactionWorkshopsInTimeQuery,
    getGenderParticipactionOfWorkshopQuery,
    getMaleUsersQuery,
    getFemaleUsersQuery,
    getUsersByFacultyQuery,
    getUsersByCareerQuery,
    getUsersByFacultyFemaleQuery,
    getUsersByFacultyMaleQuery,
    getUsersByCareerFemaleQuery,
    getUsersByCareerMaleQuery
} = require('../repository/statistics');

/**
 * Get Assistance by club id and dates
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getAssistanceOfClub = async (req, res) => {
    
    const idc = req.params.idc;
    const startdate = req.params.startdate;
    const enddate = req.params.enddate;
    
    
    if (empty(idc) || empty(startdate) || empty(enddate)) {
        errorMessage.error = 'ID of club, startdate or enddate detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    console.log("aqui")
    getAssistanceOfClubQuery({startdate, enddate,idc})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No assistance of that club';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

/**
 * Get Assistance of all clubs and dates
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getAssistanceOfClubs = async (req, res) => {
    
    const startdate = req.params.startdate;
    const enddate = req.params.enddate;

    if (empty(startdate) || empty(enddate)) {
        errorMessage.error = 'Startdate or enddate detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    getAssistanceOfAllClubsQuery({startdate, enddate})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No assistance of clubs';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

/**
 * Get players in tournament
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getPlayersInTournament = async (req, res) => {
    
    const startdate = req.params.startdate;
    const enddate = req.params.enddate;

    if (empty(startdate) || empty(enddate)) {
        errorMessage.error = 'Startdate or enddate detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    getPlayersInTournamentQuery({startdate, enddate})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No players in that tournament';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};


/**
 * Get players of a sport in tournament
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getPlayersOfSportInTournament = async (req, res) => {
    
    const startdate = req.params.startdate;
    const enddate = req.params.enddate;

    if (empty(startdate) || empty(enddate)) {
        errorMessage.error = 'sport, Startdate or enddate detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    getPlayersOfSportInTournamentQuery({startdate, enddate})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No players in that tournament of that sport';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

/**
 * Get teams in tournament
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getTeamsOfTournament = async (req, res) => {
    
    const startdate = req.params.startdate;
    const enddate = req.params.enddate;
    

    if (empty(startdate) || empty(enddate)) {
        errorMessage.error = ' Startdate or enddate detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    getTeamsOfTournamentQuery({startdate, enddate})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No teams in that tournament';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

/**
 * Get teams of a sport in tournament
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getTeamsOfASportInTournament = async (req, res) => {
    
    const startdate = req.params.startdate;
    const enddate = req.params.enddate;

    if (empty(startdate) || empty(enddate)) {
        errorMessage.error = 'sport, Startdate or enddate detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    getTeamsOfASportInTournamentQuery({startdate, enddate})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No teams in that tournament of that sport';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

/**
 * Get genders % in tournament
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getGenderOfTournament = async (req, res) => {
    
    const startdate = req.params.startdate;
    const enddate = req.params.enddate;
    

    if (empty(startdate) || empty(enddate)) {
        errorMessage.error = ' Startdate or enddate detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    getGenderOfTournamentQuery({startdate, enddate})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'participations in that tournament';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

/**
 * Get genders % in tournament of a sport
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getGenderOfSportInTournament = async (req, res) => {
    
    const startdate = req.params.startdate;
    const enddate = req.params.enddate;

    if (empty(startdate) || empty(enddate)) {
        errorMessage.error = 'sport, Startdate or enddate detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    getGenderOfSportInTournamentQuery({startdate, enddate})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'Participation in that tournament of that sport';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

/**
 * Get Scholars
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getAllScholars = async (req, res) => {

    const startdate = req.params.startdate;
    const enddate = req.params.enddate;
    
    if (empty(startdate) || empty(enddate)) {
        errorMessage.error = 'Startdate or enddate detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    
    getAllScholarsQuery({startdate, enddate})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No scholars in that time range';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

/**
 * Get Female Scholars
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getFemaleScholars = async (req, res) => {

    const startdate = req.params.startdate;
    const enddate = req.params.enddate;
    
    if (empty(startdate) || empty(enddate)) {
        errorMessage.error = 'Startdate or enddate detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    
    getAllScholarsFemaleQuery({startdate, enddate})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No female scholars in that time range';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

/**
 * Get Male Scholars
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getMaleScholars = async (req, res) => {

    const startdate = req.params.startdate;
    const enddate = req.params.enddate;
    
    if (empty(startdate) || empty(enddate)) {
        errorMessage.error = 'Startdate or enddate detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    
    getAllScholarsMaleQuery({startdate, enddate})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No Male scholars in that time range';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

/**
 * Get Events count
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getEventCount = async (req, res) => {

    const startdate = req.params.startdate;
    const enddate = req.params.enddate;
    
    if (empty(startdate) || empty(enddate)) {
        errorMessage.error = 'Startdate or enddate detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    
    getCountEventsQuery({startdate, enddate})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'No events in that time range';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

/**
 * Get participation on workshops on certain time
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getParticipactionWorkshopsInTime = async (req, res) => {
    
    const startdate = req.params.startdate;
    const enddate = req.params.enddate;
    

    if (empty(startdate) || empty(enddate)) {
        errorMessage.error = ' Startdate or enddate detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    getParticipactionWorkshopsInTimeQuery({startdate, enddate})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'participations in workshops in that time';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

/**
 * Get participation on workshop
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getParticipactionWorkshop = async (req, res) => {
    
    const startdate = req.params.startdate;
    const enddate = req.params.enddate;
    

    if (empty(startdate) || empty(enddate)) {
        errorMessage.error = ' id of workshop detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    getParticipactionWorkshopQuery({startdate, enddate})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'no participations in workshop found';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

/**
 * Get participation on workshops on certain time
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getGenderParticipactionWorkshopsInTime = async (req, res) => {
    
    const startdate = req.params.startdate;
    const enddate = req.params.enddate;
    

    if (empty(startdate) || empty(enddate)) {
        errorMessage.error = ' Startdate or enddate detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    getGenderParticipactionWorkshopsInTimeQuery({startdate, enddate})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'no participations in workshops in that time';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

/**
 * Get participation on workshop
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/

const getGenderParticipactionOfWorkshop = async (req, res) => {
    
    const startdate = req.params.startdate;
    const enddate = req.params.enddate; 

    if (empty(startdate) || empty(enddate)) {
        errorMessage.error = ' id of workshop detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    
    getGenderParticipactionOfWorkshopQuery({startdate, enddate})
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'no participations in workshop found';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

const getMaleUsers = async (req, res) => {
    getMaleUsersQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'no male users found found';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

const getFemaleUsers = async (req, res) => {
    getFemaleUsersQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'no female users found';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

const getUsersByFaculty = async (req, res) => {
    getUsersByFacultyQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'no users found';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

const getUsersByCareer = async (req, res) => {
    getUsersByCareerQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'no users found';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

const getUsersByFacultyFemale = async (req, res) => {
    getUsersByFacultyFemaleQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'no users found';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

const getUsersByFacultyMale = async (req, res) => {
    getUsersByFacultyMaleQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'no users found';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

const getUsersByCareerFemale = async (req, res) => {
    getUsersByCareerFemaleQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'no users found';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

const getUsersByCareerMale = async (req, res) => {
    getUsersByCareerMaleQuery()
    .then(data => {
        console.log('DATA:', data); // print data;
        if (!data) {
            errorMessage.error = 'no users found';
            return res.status(status.notfound).send(errorMessage);
        }
    
        successMessage.data = data;
        return res.status(status.success).send(successMessage);
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    })
};

module.exports = {
    getAssistanceOfClub,
    getAssistanceOfClubs,
    getPlayersInTournament,
    getPlayersOfSportInTournament,
    getTeamsOfTournament,
    getTeamsOfASportInTournament,
    getGenderOfTournament,
    getGenderOfSportInTournament,
    getAllScholars,
    getFemaleScholars,
    getMaleScholars,
    getEventCount,
    getParticipactionWorkshopsInTime,
    getParticipactionWorkshop,
    getGenderParticipactionWorkshopsInTime,
    getGenderParticipactionOfWorkshop,
    getMaleUsers,
    getFemaleUsers,
    getUsersByFaculty,
    getUsersByCareer,
    getUsersByFacultyFemale,
    getUsersByFacultyMale,
    getUsersByCareerFemale,
    getUsersByCareerMale

};