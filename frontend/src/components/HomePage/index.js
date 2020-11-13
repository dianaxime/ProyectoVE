import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { getAuthToken, getIsOpen } from '../../reducers';
import { URL } from '../../settings';
import Nav from '../Nav';
import { makeStyles } from '@material-ui/core/styles';
import './style_home.css';
import Footer from '../Footer';
import { Carousel } from 'react-bootstrap'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
}));

const Home = ({ open}) => {
    const classes = useStyles();
    
    
    return (
        <div className="bghome">
            <Nav />
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <h1>Home de Prueba</h1>
                <div className="CarouselDiv"> 
                <Carousel>
                    <Carousel.Item style={{'height':"375px"}} >
                        <img style={{'height':"350px"}}
                        className="d-block w-100"
                        src="https://www.htmlcsscolor.com/preview/gallery/008F2E.png"
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h3>Equipos</h3>
                        <p>Evalúa las estadísticas de los torneos deportivos</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item style={{'height':"375px"}} >
                        <img style={{'height':"350px"}}
                        className="d-block w-100"
                        src="https://www.htmlcsscolor.com/preview/gallery/008F2E.png"
                        alt="Second slide"
                        />

                        <Carousel.Caption>
                        <a href="/asociacionesClubs"> 
                            <h3>Clubes y Asociaciones</h3>
                            <p>Conoce sus estadísticas del mes para saber su nivel de participación</p>
                        </a>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item style={{'height':"375px"}} >
                        <img style={{'height':"350px"}}
                        className="d-block w-100"
                        src="https://www.htmlcsscolor.com/preview/gallery/008F2E.png"
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        <h3>Asistencia</h3>
                        <p>Toma asistencia o revisa la asistencia de una reunión realizada anteriormente</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                </div>                
            </main>
            <div className="footer">
                <Footer />
            </div>
        </div>
    );
}

export default connect(
    state => ({
        isAuth: getAuthToken(state) !== null,
        open: getIsOpen(state),
    }),
    undefined,
    (stateProps, disptachProps, ownProps) => {
        if (!stateProps.isAuth) {
            window.location.href = URL + 'auth';
        }
        return ({
            ...stateProps,
            ...disptachProps,
            ...ownProps,
        });
    }
)(Home);