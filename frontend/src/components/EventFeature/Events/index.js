import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../../reducers';
import * as actions from '../../../actions/events';
import Event from '../Event';
import './styles.css';

const Events = ({ event, isLoading, onLoad }) => {
    useEffect(onLoad, []);
    return (

        <div>
            {
                event.length > 0 && !isLoading && (

                    <div className="eventssContainer">

                        {
                            event.map(({ id }) => <Event key={id}
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
        event: selectors.getEvents(state),
        isLoading: selectors.isFetchingEvents(state),
        status: selectors.getEventStatus(state),
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingEvents());
        },
    }),
)(Events);
