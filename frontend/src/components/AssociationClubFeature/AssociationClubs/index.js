import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../../reducers';
import * as actions from '../../../actions/associationClub';
import AssociationClub from '../AssociationClub';
import './styles.css';

const AssociationClubs = ({ associationClub, isLoading, onLoad }) => {
    useEffect(onLoad, []);
    return (

        <div>
            {
                associationClub.length > 0 && !isLoading && (

                    <div className="associationClubsContainer">

                        {
                            associationClub.map(({ id }) => <AssociationClub key={id}
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
        associationClub: selectors.getAssociationClubs(state),
        isLoading: selectors.isFetchingAssociationClubs(state),
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingAssociationClubs());
        },
    }),
)(AssociationClubs);
