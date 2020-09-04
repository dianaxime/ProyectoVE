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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import * as actions from '../../../actions/eventParticipation';
import {
  withStyles,
} from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
    '& label': {
      color: 'white',
    },
  },
})(TextField);

const validate = values => {
  const errors = {};
  const requiredFields = ['in', 'out'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Obligatorio*';
    }
  })
  return errors;
}

const renderTime = ({ input, label, meta: { touched, error }, ...custom }) => (
  <CssTextField
    id="time"
    size="small"
    variant="outlined"
    label={label}
    type="time"
    className="inputBuscarhora"
    {...input}
    {...custom}
  />
);

let Person = ({
  users,
  isLoading,
  onAssign,
  handleSubmit
}) => {
  return (
    <div className="all">
      <div className="hora">
        <Field label="Hora de entrada" component={renderTime} name="in" value="7:30"></Field>
        <Field label="Hora de salida" component={renderTime} name="out"></Field>
      </div>
      <div className="personas">
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
                      <IconButton edge="end" aria-label="agregar" onClick={() => handleSubmit(onAssign(id))}>
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
    </div>
  );
}

Person = reduxForm({
  form: 'AssignEventForm',
  validate
})(Person);

export default connect(
  state => ({
    users: selectors.getUsersByEmail(state),
    isLoading: selectors.isFetchingUsersByEmail(state),
    selectEvent: selectors.getSelectedEvent(state),
    event: selectors.getEvent(state, selectors.getSelectedEvent(state)),
    userid: null,
  }),
  dispatch => ({
    onSubmit(userid, ide, hours) {
      dispatch(actions.startAddingEventParticipation(uuidv4(), userid, ide, hours));
    }
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onSubmit(values) {
      const inicioMinutos = parseInt(values.in.substr(3, 2));
      const inicioHoras = parseInt(values.in.substr(0, 2));

      const finMinutos = parseInt(values.out.substr(3, 2));
      const finHoras = parseInt(values.out.substr(0, 2));

      const inicio = (inicioHoras * 60) + inicioMinutos;
      const fin = (finHoras * 60) + finMinutos;
      const resta = Math.abs(fin - inicio)
      const result = (resta/60).toFixed(2)
      dispatchProps.onSubmit(stateProps.userid, stateProps.selectEvent, result);
    },
    onAssign(id) {
      stateProps.userid = id;
    }
  })
)(Person);
