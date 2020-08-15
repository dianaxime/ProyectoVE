import React from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../reducers';
import './styles.css';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


const Person = ({ 
    
  }) => (
    <div className='personaIn'>
        <ListItem>
            <ListItemText primary="aqui nombre" secondary="aqui correo"/>
            <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="agregar">
              <PersonAddIcon />
            </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    </div>
  );
  
  export default connect(
    
  )(Person);
