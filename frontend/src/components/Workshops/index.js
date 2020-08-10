import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../reducers';
import * as actions from '../../actions/workshops';
import Workshop from '../Workshop';
import './styles.css';

const Workshops = ({ workshop, isLoading, onLoad }) => {
    useEffect(onLoad, []);
    return (

        <div>
            {
                workshop.length > 0 && !isLoading && (

                    <div className="workshopsContainer">

                        {
                            workshop.map(({ id }) => <Workshop key={id}
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
        workshop: selectors.getWorkshops(state),
        isLoading: selectors.isFetchingWorkshops(state),
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingWorkshops());
        },
    }),
)(Workshops);
