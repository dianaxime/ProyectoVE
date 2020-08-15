import React from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../reducers';
import './styles.css';
import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const person = ({ 
    
  }) => (
    <div className='personaIn'>
        <p></p>
        <Button onClick={onEdit} className='buscarB'>
        </Button>
    </div>
  );
  
  export default connect(
    
  )(person);
