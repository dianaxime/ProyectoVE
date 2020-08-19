import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../../reducers';
import * as actions from '../../../actions/teams';
import Team from '../Team';
import './styles.css';

const Teams = ({ team, isLoading, onLoad }) => {
    useEffect(onLoad, []);
    return (

        <div>
            {
                team.length > 0 && !isLoading && (

                    <div className="workshopsContainer">

                        {
                            team.map(({ id }) => <Team key={id}
                                id={id} />)
                        }
                    </div>
                )
            }
        </div>
    );
};

export default connect(
    state => ({
        team: selectors.getTeams(state),
        isLoading: selectors.isFetchingTeams(state),
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingTeams());
        },
    }),
)(Teams);
