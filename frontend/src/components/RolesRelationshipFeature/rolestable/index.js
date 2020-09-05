import React, { forwardRef, useEffect } from './node_modules/react';
import MaterialTable from './node_modules/material-table';
import { connect } from './node_modules/react-redux';
import {
    getRoles
} from '../../../reducers';
import * as actions from '../../../actions/rolesRelationship';
import * as modalRoles from '../../../actions/modalRoles';
import * as actionsRol from '../../../actions/selectedRol';

import AddBox from './node_modules/@material-ui/icons/AddBox';
import ArrowDownward from './node_modules/@material-ui/icons/ArrowDownward';
import Check from './node_modules/@material-ui/icons/Check';
import ChevronLeft from './node_modules/@material-ui/icons/ChevronLeft';
import ChevronRight from './node_modules/@material-ui/icons/ChevronRight';
import Clear from './node_modules/@material-ui/icons/Clear';
import DeleteOutline from './node_modules/@material-ui/icons/DeleteOutline';
import Edit from './node_modules/@material-ui/icons/Edit';
import FilterList from './node_modules/@material-ui/icons/FilterList';
import FirstPage from './node_modules/@material-ui/icons/FirstPage';
import LastPage from './node_modules/@material-ui/icons/LastPage';
import Remove from './node_modules/@material-ui/icons/Remove';
import SaveAlt from './node_modules/@material-ui/icons/SaveAlt';
import Search from './node_modules/@material-ui/icons/Search';
import ViewColumn from './node_modules/@material-ui/icons/ViewColumn';
import FindInPageIcon from './node_modules/@material-ui/icons/FindInPage';

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
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const columns = [
    { title: 'Rol', field: 'role' },
    { title: 'Cant. Personas', field: 'coalesce' },
];

const Roles = ({ data, onLoad, onSelect, onHandle }) => {
    useEffect(onLoad, []);
    const selectRol = (idRol) => {
        onSelect(idRol);
        onHandle();
    };
    return (
        <MaterialTable title="Roles de usuario"
            icons={icons}
            columns={columns}
            data={data}
            actions={[
                {
                    icon: 'save',
                    tooltip: 'Save User',
                    onClick: (event, rowData) => selectRol(rowData.id),
                },
            ]}
            components={{
                Action: props => (
                    <button style={{backgroundColor: '#2e2e2e'}}
                        onClick={(event) => props.action.onClick(event, props.data)}
                        variant="contained"
                        size="small"
                    >
                        <FindInPageIcon  style={{color: '#FFF'}}/>
                    </button>
                ),
            }}
            options={{
                actionsColumnIndex: -1,
                headerStyle: {
                    backgroundColor: '#2e2e2e',
                    color: '#FFF'
                },
            }}
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

export default connect(
    state => ({
        data: getRoles(state),
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingRoles());
        },
        onSelect(id) {
            dispatch(actionsRol.selectedRol(id));
        },
        onHandle() {
            dispatch(modalRoles.changeRoles(true));
        }
    }),
)(Roles);