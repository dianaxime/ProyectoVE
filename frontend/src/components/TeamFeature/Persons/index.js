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
import * as actions from '../../../actions/tournament';

const Person = ({
  users,
  isLoading,
  onAssign,
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
                    <IconButton edge="end" aria-label="agregar" onClick={() => onAssign(id)}>
                      <PersonAddIcon className="inputPersona" />
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
    users: selectors.getUsersByEmailTournament(state),
    isLoading: selectors.isFetchingUsersByEmailTournament(state),
    selectT: selectors.getSelectedTeam(state),
    team: selectors.getTeam(state, selectors.getSelectedTeam(state)),
  }),
  dispatch => ({
    onAssign(userid, idt, date1, date2) {
      const startdate = moment(date1);
      const enddate = moment(date2);
      dispatch(actions.startAddingTournament(uuidv4(), userid, idt, startdate.format("YYYY-MM-DD"), enddate.format("YYYY-MM-DD")));
    }
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onAssign(id) {
      dispatchProps.onAssign(id, stateProps.selectT, stateProps.team.startdate, stateProps.team.enddate);
    },
  })
)(Person);
