import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../../reducers';
import './styles.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import * as actions from '../../../actions/associationClubRelationship';

const Person = ({
  users,
  isLoading,
  onAssign_J,
  onAssign_M,
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
                    <button className="boton_persona" onClick={() => onAssign_M(id)}>
                      Miembro
                    </button>
                    <button className="boton_persona" onClick={() => onAssign_J(id)}>
                      Junta
                    </button>
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
    users: selectors.getUsersByEmailAssociationClubRelationship(state),
    isLoading: selectors.isFetchingUsersByEmail(state),
    selectAC: selectors.getSelectedAssociationClub(state),
    associationClub: selectors.getAssociationClub(state, selectors.getSelectedAssociationClub(state)),
  }),
  dispatch => ({
    onAssign_J(userid, idac, date1, date2) {
      const startdate = moment(date1);
      const enddate = moment(date2);
      const type = "J";
      dispatch(actions.startAddingAssociationClubRelationship(uuidv4(), userid, idac, startdate.format("YYYY-MM-DD"), enddate.format("YYYY-MM-DD"), type));
    },
    onAssign_M(userid, idac, date1, date2) {
      const startdate = moment(date1);
      const enddate = moment(date2);
      const type = "M";
      dispatch(actions.startAddingAssociationClubRelationship(uuidv4(), userid, idac, startdate.format("YYYY-MM-DD"), enddate.format("YYYY-MM-DD"), type));
    },
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onAssign_J(id) {
      dispatchProps.onAssign_J(id, stateProps.selectAC, stateProps.associationClub.startdate, stateProps.associationClub.enddate, stateProps.associationClub.type);
    },
    onAssign_M(id) {
      dispatchProps.onAssign_M(id, stateProps.selectAC, stateProps.associationClub.startdate, stateProps.associationClub.enddate, stateProps.associationClub.type );
    },
  })
)(Person);
