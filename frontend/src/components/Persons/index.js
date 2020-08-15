import React from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../reducers';
import './style_persons.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
// import actions from '../../actions/';

const Person = ({
  users,
  isLoading
}) => (
    <div className='personaIn'>
      <List>
        {
          users.length > 0 && !isLoading && (
            <div>
              {
                users.map(({id, first_name, email}) => 
                  <ListItem key={id}>
                    <ListItemText primary={first_name} secondary={email} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="agregar">
                        <PersonAddIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                
                )
              }
            </div>
          )
        }
      </List>
    </div>
  );

export default connect(
  state => ({
    users: selectors.getUsersByEmail(state),
    isLoading: selectors.isFetchingUsersByEmail(state),
  }),
  dispatch => ({
    onAssign(){
      // dispatch(actions.)
    }
  }),
)(Person);
