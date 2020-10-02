import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../../reducers';
import './styles.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import BlockIcon from '@material-ui/icons/Block';
import Typography from '@material-ui/core/Typography';
import * as actions from '../../../actions/assistances';

const Person = ({
  users,
  isLoading,
  onTime,
  onLate,
  onAbsent,
}) => (
    <div className='personaIn'>
      {
        users.length > 0 && !isLoading ? (
          <List className="listaper">
            {
              users.map(({id, first_name, last_name, email}) =>
                <ListItem key={id} className="inputPersona">
                  <ListItemText primary={first_name + " " + last_name} secondary={
                      <Typography component="span"
                      variant="body2" className="inputPersonaS">{email}</Typography>
                    }/>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="agregar" onClick={() => onTime(id)}>
                      <DoneOutlineIcon className="inputPersona" />
                    </IconButton>
                    <IconButton edge="end" aria-label="agregar" onClick={() => onLate(id)}>
                      <AccessTimeIcon className="inputPersona" />
                    </IconButton>
                    <IconButton edge="end" aria-label="agregar" onClick={() => onAbsent(id)}>
                      <BlockIcon className="inputPersona" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            }
          </List>
        ) : (
          <p className="inputPersonaS">No hay usuarios para mostrar</p>
        )
      }
    </div>
  );

export default connect(
  state => ({
    users: selectors.getUsersByEmailAssistance(state),
    isLoading: selectors.isFetchingUsersByEmail(state),
    selectAC: selectors.getSelectedSession(state),
    assistance: selectors.getSession(state, selectors.getSelectedSession(state)),
  }),
  dispatch => ({
    onAssign(userid, ids, late) {
      dispatch(actions.startAddingAssistance(uuidv4(), userid, ids, late));
    },
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onTime(id) {
      dispatchProps.onAssign(id, stateProps.selectAC, 'p');
    },
    onLate(id) {
      dispatchProps.onAssign(id, stateProps.selectAC, 't');
    },
    onAbsent(id) {
      dispatchProps.onAssign(id, stateProps.selectAC, 'a');
    },
  })
)(Person);
