import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { getIsRolesOpen } from '../../reducers';
import { connect } from 'react-redux';
import * as actionsModal from '../../actions/modalRoles';

const ADMIN = 'Es el administrador del sistema. El usuario con este rol tendrá acceso a todos los módulos que comprenden la plataforma'; 
const ASISTENTE = 'El usuario con este rol tendrá acceso a los módulos de: Talleres, Equipos, Eventos, Asociaciones y Clubes; además podrá generar reportes que auxiliarán al administrador'; 
const AUXOFICINA = 'El usuario con este rol tendrá acceso a los módulos de: Talleres, Equipos, Eventos, Asociaciones y Clubes. Son los alumnos que auxilian en el departamento por horas de beca'; 
const ASOCIACION = 'El usuario con este rol tendrá acceso al módulo de:  Asociaciones. Únicamente mostrará la información de la Asociación a la cual pertenece'; 
const TALLER = 'El usuario con este rol tendrá acceso al módulo de:  Talleres. Únicamente mostrará la información del Taller a la cual pertenece'; 
const EQUIPO = 'El usuario con este rol tendrá acceso al módulo de:  Equipos. Únicamente mostrará la información del Equipo a la cual pertenece';
const CLUB = 'El usuario con este rol tendrá acceso al módulo de: Clubes. Únicamente mostrará la información del Club al cual pertenece.'
const AUXEVENTOS = 'El usuario con este rol tendrá acceso al módulo de: Eventos.'


let Roles = ({ open, onHandle }) => {
    return (
        <MDBContainer>
            <MDBModal isOpen={open}>
                <MDBModalHeader toggle={onHandle}><b>Permisos del rol seleccionado:</b></MDBModalHeader>
                <MDBModalBody>
                   Texto
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
    }),
    dispatch => ({
        onHandle() {
            dispatch(actionsModal.changeRoles(false));
        },
    })
)(Roles);

export default Roles;