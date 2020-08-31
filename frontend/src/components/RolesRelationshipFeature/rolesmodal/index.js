import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { 
    getIsRolesOpen,
    getRole,
    getSelectedRol
} from '../../../reducers';
import { connect } from 'react-redux';
import * as actionsModal from '../../../actions/modalRoles';



let Roles = ({ open, onHandle, role, selected }) => {
    const description = {
        1: 'Es el administrador del sistema. El usuario con este rol tendrá acceso a todos los módulos que comprenden la plataforma',
        2: 'El usuario con este rol tendrá acceso a los módulos de: Talleres, Equipos, Eventos, Asociaciones y Clubes; además podrá generar reportes que auxiliarán al administrador', 
        3: 'El usuario con este rol tendrá acceso a los módulos de: Talleres, Equipos, Eventos, Asociaciones y Clubes. Son los alumnos que auxilian en el departamento por horas de beca', 
        4: 'El usuario con este rol tendrá acceso al módulo de:  Asociaciones. Únicamente mostrará la información de la Asociación a la cual pertenece',
        5: 'El usuario con este rol tendrá acceso al módulo de:  Talleres. Únicamente mostrará la información del Taller a la cual pertenece',
        6: 'El usuario con este rol tendrá acceso al módulo de:  Equipos. Únicamente mostrará la información del Equipo a la cual pertenece',
        7: 'El usuario con este rol tendrá acceso al módulo de: Clubes. Únicamente mostrará la información del Club al cual pertenece.',
        8: 'El usuario con este rol tendrá acceso al módulo de: Eventos.'
    };
    return (
        <MDBContainer>
            <MDBModal isOpen={open} side position="bottom-left">
                <MDBModalHeader toggle={onHandle}><b>Permisos del {role != null && (role.role)}:</b></MDBModalHeader>
                <MDBModalBody>
                   {description[selected]}
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="red" onClick={onHandle}>Cerrar</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
}

Roles = connect(
    state => ({
        open: getIsRolesOpen(state),
        role: getRole(state, getSelectedRol(state)),
        selected: getSelectedRol(state),
    }),
    dispatch => ({
        onHandle() {
            dispatch(actionsModal.changeRoles(false));
        },
    })
)(Roles);

export default Roles;