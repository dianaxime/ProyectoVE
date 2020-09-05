import React, { forwardRef } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import { connect } from 'react-redux';
import {
    getUsersByEmailRolesRelation,
} from '../../../reducers';
import * as actions from '../../../actions/rolesRelationship';
import * as modalAssign from '../../../actions/modalAssign';
import * as actionsAU from '../../../actions/selectedAUser';
import InputBase from '@material-ui/core/InputBase';
import { reset, Field, reduxForm } from 'redux-form';
import Chip from '@material-ui/core/Chip';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MoreIcon from '@material-ui/icons/More';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

const validate = values => {
    const errors = {};
    const requiredFields = ['email'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Obligatorio*';
        }
    })
    return errors;
};

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <InputBase className="inputWorkshop" placeholder={label}
        label={label}
        {...input}
        {...custom}
        fullWidth
    />
);

const icons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    MoreIcon: forwardRef((props, ref) => <MoreIcon {...props} ref={ref} />)
};

const description = {
    1: 'Administrador',
    2: 'Asistente',
    3: 'Auxiliar oficina',
    4: 'Miembro asociación',
    5: 'Miembro taller',
    6: 'Miembro equipo',
    7: 'Miembro club',
    8: 'Auxiliar eventos'
};

const columns = [
    { title: 'Nombre', field: 'first_name' },
    { title: 'Apellido', field: 'last_name' },
    { title: 'Correo', field: 'email' },
];

let AssignRoles = ({ data, onSelect, onHandle, handleSubmit, onSubmit }) => {
    const onEdit = (idAU) => {
        onSelect(idAU);
        onHandle();
    }
    return (
        <MaterialTable title="Asignar roles de usuario"
            icons={icons}
            columns={columns}
            data={data}
            actions={[
                {
                    icon: 'save',
                    tooltip: 'Save User',
                    onClick: (event, rowData) => onEdit(rowData.id),
                },
            ]}
            components={{
                Action: props => (
                    <button style={{ backgroundColor: '#2e2e2e' }}
                        onClick={(event) => props.action.onClick(event, props.data)}
                        variant="contained"
                        size="small"
                    >
                        <MoreIcon style={{ color: '#FFF' }} />
                    </button>
                ),
                Toolbar: props => (
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'row', height: '40px', width: '250px', float: 'right', borderBottom: 'solid', borderWidth: '1px', marginRight: '10px', marginTop: '10px' }}>
                            <IconButton edge="end" aria-label="agregar" onClick={handleSubmit(onSubmit)}>
                                <SearchIcon style={{ Color: '#2e2e2e' }} />
                            </IconButton>
                            <Field name="email" component={renderTextField} label="Buscar" ></Field>
                        </div>
                        <MTableToolbar {...props} />
                    </div>
                ),
            }}
            options={{
                actionsColumnIndex: -1,
                headerStyle: {
                    backgroundColor: '#2e2e2e',
                    color: '#FFF'
                },
                search: false,
            }}
            detailPanel={[
                {
                    tooltip: 'Mostrar Roles',
                    render: rowData =>
                        <div>
                            {
                                rowData.idrs !== null && (
                                rowData.idrs.map(s =>
                                    s !== 0 && (
                                        <Chip key={s} color="secondary" label={description[s]}
                                            style={{
                                                marginRight: 5, backgroundColor: '#2e2e2e',
                                                Color: '#FFF'
                                            }} />)
                                )
                            )
                            }
                        </div>
                },
            ]}
            localization={{
                body: {
                    emptyDataSourceMessage: 'No hay registros que mostrar',
                    addTooltip: 'Añadir',
                    deleteTooltip: 'Eliminar',
                    editTooltip: 'Editar',
                    filterRow: {
                        filterTooltip: 'Filtrar'
                    },
                    editRow: {
                        deleteText: '¿Quieres borrar este registro?',
                        cancelTooltip: 'Anular',
                        saveTooltip: 'Guardar'
                    }
                },
                grouping: {
                    placeholder: 'Arrastrar columnas ...',
                    groupedBy: 'Agrupar por:'
                },
                header: {
                    actions: 'Acciones'
                },
                pagination: {
                    labelDisplayedRows: '{from}-{to} de {count}',
                    labelRowsSelect: 'filas',
                    labelRowsPerPage: 'filas por página:',
                    firstAriaLabel: 'Primera página',
                    firstTooltip: 'Primera página',
                    previousAriaLabel: 'Página anterior',
                    previousTooltip: 'Página anterior',
                    nextAriaLabel: 'Página siguiente',
                    nextTooltip: 'Página siguiente',
                    lastAriaLabel: 'Última página',
                    lastTooltip: 'Última página'
                },
                toolbar: {
                    addRemoveColumns: 'Agregar o quitar columnas',
                    nRowsSelected: '{0} fila(s) seleccionada(s)',
                    showColumnsTitle: 'Ver columnas',
                    showColumnsAriaLabel: 'Ver columnas',
                    exportTitle: 'Exportar',
                    exportAriaLabel: 'Exportar',
                    exportName: 'Exportar en CSV',
                    searchTooltip: 'Buscar',
                    searchPlaceholder: 'Buscar'
                }
            }}
        />
    );
}

AssignRoles = reduxForm({
    form: 'searchAssignForm',
    validate
})(AssignRoles);

export default connect(
    state => ({
        data: getUsersByEmailRolesRelation(state),
    }),
    dispatch => ({
        onSelect(id) {
            dispatch(actionsAU.selectedAUser(id));
        },
        onHandle() {
            dispatch(modalAssign.changeAssign(true));
        },
        onSubmit({ email }) {
            dispatch(
                actions.startFetchingUsersByEmail(email),
                dispatch(reset('searchAssignForm')),
            );
        },
    })
)(AssignRoles);