import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import HomeIcon from '@material-ui/icons/Home';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import BrushIcon from '@material-ui/icons/Brush';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ViewModuleRoundedIcon from '@material-ui/icons/ViewModuleRounded';
import SecurityIcon from '@material-ui/icons/Security';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Collapse from '@material-ui/core/Collapse';
import { connect } from 'react-redux';
import { getAuthToken, getIsOpen } from '../../reducers';
import * as actions from '../../actions/changeDrawer';
import * as actionsAuth from '../../actions/auth';
import * as actionsModal from '../../actions/modalChange';
import * as actionsUpdate from '../../actions/modalUpdate';
import * as actionsScholar from '../../actions/modalScholarship';
import ChangeModal from '../ChangeModal';
import UpdateModal from '../UpdateModal';
import ScholarshipHoursModal from '../scholarshipHoursModal';
import './styles.css';
import { Link } from "react-router-dom";
import { URL } from '../../settings';
import SportsIcon from '@material-ui/icons/Sports';
import EventNoteIcon from '@material-ui/icons/EventNote';

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    maxWidth: 360,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: '#F1F1F2',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  title: {
    flexGrow: 1,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Nav = ({ isAuth, open, setOpen, logout, onHandle, onUpdate, onScholar }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const openA = Boolean(anchorEl);
  const [openW, setOpenW] = useState(null);
  const [openT, setOpenT] = useState(null);
  const [openRT, setOpenRT] = useState(null);
  const [openE, setOpenE] = useState(null);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenW(false);
    setOpenT(false);
    setOpenRT(false);
    setOpenE(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const update = () => {
    handleClose();
    onUpdate();
  }

  const scholar = () => {
    handleClose();
    onScholar();
  }

  const handle = () => {
    handleClose();
    onHandle();
  }

  const handleClickWorkshop = () => {
    setOpenW(!openW);
  };

  const handleClickTeam = () => {
    setOpenT(!openT);
  };

  const handleClickRT = () => {
    setOpenRT(!openRT);
  };

  const handleClickEvent = () => {
    setOpenE(!openE);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
          color: 'green',
        })}
      >
        <Toolbar style={{ background: 'green' }}>
          {
            isAuth && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
            )
          }
          <Typography variant="h6" className={classes.title}>
            Vida Estudiantil
            </Typography>
          {isAuth && (
            <div>
              <img src={require('./logouvg.png')} alt="logo" className="logo" />
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openA}
                onClose={handleClose}
              >
                <MenuItem onClick={update}>Actualizar Perfil</MenuItem>
                <MenuItem onClick={handle}>Cambiar Contraseña</MenuItem>
                <MenuItem onClick={scholar}>Voluntariado</MenuItem>
                <MenuItem onClick={() => logout()}>Salir</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/" className={classes.link} onClick={handleDrawerClose}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Inicio"} />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleClickWorkshop}>
            <ListItemIcon>
              <BrushIcon />
            </ListItemIcon>
            <ListItemText primary="Talleres" />
            {openW ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openW} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/creartaller" className={classes.link} onClick={handleDrawerClose}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ListItemText primary={"Crear"} />
                    <ListItemSecondaryAction>
                      <NoteAddIcon />
                    </ListItemSecondaryAction>
                  </ListItemIcon>
                </ListItem>
              </Link>
              <Link to="/talleres" className={classes.link} onClick={handleDrawerClose}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ListItemText primary={"Ver todos"} />
                    <ListItemSecondaryAction>
                      <ViewModuleRoundedIcon />
                    </ListItemSecondaryAction>
                  </ListItemIcon>
                </ListItem>
              </Link>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleClickTeam}>
            <ListItemIcon>
              <SportsIcon />
            </ListItemIcon>
            <ListItemText primary="Equipos" />
            {openT ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openT} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/crearequipo" className={classes.link} onClick={handleDrawerClose}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ListItemText primary={"Crear"} />
                    <ListItemSecondaryAction>
                      <NoteAddIcon />
                    </ListItemSecondaryAction>
                  </ListItemIcon>
                </ListItem>
              </Link>
              <Link to="/equipos" className={classes.link} onClick={handleDrawerClose}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ListItemText primary={"Ver todos"} />
                    <ListItemSecondaryAction>
                      <ViewModuleRoundedIcon />
                    </ListItemSecondaryAction>
                  </ListItemIcon>
                </ListItem>
              </Link>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleClickRT}>
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText primary="Autorización" />
            {openRT ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openRT} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/authorization" className={classes.link} onClick={handleDrawerClose}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ListItemText primary={"Autorización de usuarios"} />
                    <ListItemSecondaryAction>
                      <VerifiedUserIcon />
                    </ListItemSecondaryAction>
                  </ListItemIcon>
                </ListItem>
              </Link>
              <Link to="/roles" className={classes.link} onClick={handleDrawerClose}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ListItemText primary={"Roles de usuario"} />
                    <ListItemSecondaryAction>
                      <AssignmentIndIcon />
                    </ListItemSecondaryAction>
                  </ListItemIcon>
                </ListItem>
              </Link>
              <Link to="/asignaroles" className={classes.link} onClick={handleDrawerClose}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ListItemText primary={"Asignación de Roles"} />
                    <ListItemSecondaryAction>
                      <SupervisedUserCircleIcon />
                    </ListItemSecondaryAction>
                  </ListItemIcon>
                </ListItem>
              </Link>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleClickEvent}>
            <ListItemIcon>
              <EventNoteIcon />
            </ListItemIcon>
            <ListItemText primary="Eventos" />
            {openE ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openE} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/crearevento" className={classes.link} onClick={handleDrawerClose}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ListItemText primary={"Crear"} />
                    <ListItemSecondaryAction>
                      <NoteAddIcon />
                    </ListItemSecondaryAction>
                  </ListItemIcon>
                </ListItem>
              </Link>
              <Link to="/eventos" className={classes.link} onClick={handleDrawerClose}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ListItemText primary={"Ver todos"} />
                    <ListItemSecondaryAction>
                      <ViewModuleRoundedIcon />
                    </ListItemSecondaryAction>
                  </ListItemIcon>
                </ListItem>
              </Link>
            </List>
          </Collapse>
        </List>
        <Divider />
      </Drawer>
      <ChangeModal />
      <UpdateModal />
      <ScholarshipHoursModal />
    </div>
  );
}

export default connect(
  state => ({
    isAuth: getAuthToken(state) !== null,
    open: getIsOpen(state),
  }),
  dispatch => ({
    logout() {
      dispatch(actionsAuth.logout());
      window.location.href = URL;
    },
    setOpen(open) {
      dispatch(actions.changeDrawer(open));
    },
    onHandle() {
      dispatch(actionsModal.changeChange(true));
    },
    onUpdate() {
      dispatch(actionsUpdate.changeUpdate(true));
    },
    onScholar() {
      dispatch(actionsScholar.changeScholar(true));
    },
  }),
)(Nav);