import React from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../../reducers';
import './styles.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Typography from '@material-ui/core/Typography';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import BlockIcon from '@material-ui/icons/Block';
import * as actions from '../../../actions/assistances';

const Person = ({
  users,
  isLoading,
  onDelete,
  onLoad,
}) => {
  //useEffect(onLoad, []);
  return (
    <div className='personaIn'>
      {
        users.length > 0 && !isLoading ? (
          <List className="listaper">
            {
              users.map(({ id, first_name, last_name, email, late }) =>
                <ListItem key={id} className="inputPersona">
                  {
                    late === 'p' && (
                      <DoneOutlineIcon className="myIcon"/>
                    )
                  }
                  {
                    late === 't' && (
                      <AccessTimeIcon className="myIcon"/>
                    )
                  }
                  {
                    late === 'a' && (
                      <BlockIcon className="myIcon"/>
                    )
                  }
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
            <p className="inputPersonaS">No hay personas asignadas</p>
          )
      }
    </div>
  );
}

export default connect(
  state => ({
    users: selectors.getAssistances(state),
    isLoading: selectors.isFetchingUsersByEmail(state),
    selectAC: selectors.getSelectedAssociationClub(state),
    assistance: selectors.getSelectedSession(state),
  }),
  dispatch => ({
    /*onLoad(idw) {
      dispatch(actions.startFetchingAssistances(idw));
    },*/
    onDelete(idw, userid, idac) {
      if (idw != null && userid != null) {
        dispatch(actions.startRemovingAssistance(userid, idw, idac));
      }
    },
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    /*onLoad() {
      dispatchProps.onLoad(stateProps.selectAC);
    },*/
    onDelete(id) {
      if (id != null) {
        dispatchProps.onDelete(stateProps.assistance, id, stateProps.selectAC);
      }
    },
  })
)(Person);