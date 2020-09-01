import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { 
    getSelectedAUser,
    getIsAssignOpen,
} from '../../../reducers';
import { connect } from 'react-redux';
import * as actionsModal from '../../../actions/modalAssign';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


let Assign = ({ open, onHandle }) => {
    return (
        <MDBContainer>
            <MDBModal isOpen={open} side position="bottom-right">
                <MDBModalHeader toggle={onHandle}><b>Permisos del:</b></MDBModalHeader>
                <MDBModalBody>
                    texto
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="red" onClick={onHandle}>Cerrar</MDBBtn>
                    <MDBBtn color="green" >Asignar</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
}

Assign = connect(
    state => ({
        open: getIsAssignOpen(state),
        selected: getSelectedAUser(state),
    }),
    dispatch => ({
        onHandle() {
            dispatch(actionsModal.changeAssign(false));
        },
    })
)(Assign);

export default Assign;