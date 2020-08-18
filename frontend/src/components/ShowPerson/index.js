import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../reducers';
import './styles.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Typography from '@material-ui/core/Typography';
import * as actions from '../../actions/participation';

const Person = ({
  users,
  isLoading,
  onDelete,
  onLoad,
}) => {
  useEffect(onLoad, []);
  return (
    <div className='personaIn'>
      {
        users.length > 0 && !isLoading ? (
          <List className="listaper">
            {
              users.map(({ id, first_name, last_name, email }) =>
                <ListItem key={id} className="inputPersona">
                  <ListItemText primary={first_name + " " + last_name} secondary={
                    <Typography component="span"
                      variant="body2" className="inputPersonaS">{email}</Typography>
                  } />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="agregar" onMouseDown={() => onDelete(id)}>
                      <DeleteOutlineIcon className="inputDeleteP" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            }
          </List>
        ) : (
            <p className="inputPersonaS">No hay personas asignadas a este taller</p>
          )
      }
    </div>
  );
}

export default connect(
  state => ({
    users: selectors.getParticipations(state),
    isLoading: selectors.isFetchingUsersByEmail(state),
    selectWS: selectors.getSelectedWorkshop(state),
    workshop: selectors.getWorkshop(state, selectors.getSelectedWorkshop(state)),
  }),
  dispatch => ({
    onLoad(idw) {
      dispatch(actions.startFetchingParticipation(idw));
    },
    onDelete(idw, userid) {
      if ( idw != null && userid != null) {
        dispatch(actions.startRemovingParticipation(idw, userid));
      }
    },
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onLoad() {
      dispatchProps.onLoad(stateProps.selectWS);
    },
    onDelete(id) {
      if (id != null) {
        dispatchProps.onDelete(stateProps.selectWS, id);
      }
    },
  })
)(Person);