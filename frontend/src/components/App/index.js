import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from '../../store';

import AuthPage from '../AuthPage';
import HomePage from '../HomePage';
import AuthorizePage from '../AuthorizePage';
import TokenRefresh from '../TokenRefresh';
/* Workshops */
import AddWorkshopPage from '../WorkshopFeature/AddWorkshopPage';
import WorkshopsPage from '../WorkshopFeature/WorkshopsPage';
import EditWorkshopPage from '../WorkshopFeature/EditWorkshopPage';
import SelectedWorkshopPage from '../WorkshopFeature/SelectedWorkshopPage';
/* Teams */
import AddTeamPage from '../TeamFeature/AddTeamPage';
import TeamsPage from '../TeamFeature/TeamsPage';
import EditTeamPage from '../TeamFeature/EditTeamPage';
import SelectedTeamPage from '../TeamFeature/SelectedTeamPage';
import RolesPage from '../RolesRelationshipFeature/RolesPage';
import AssignPage from '../RolesRelationshipFeature/AssignPage';

/* Events */
import AddEventPage from '../EventFeature/AddEventPage';
import EventsPage from '../EventFeature/EventsPage';
import EditEventPage from '../EventFeature/EditEventPage';
import SelectedEventPage from '../EventFeature/SelectedEventPage';

/* Association Club */
import AddAssociationClubPage from '../AssociationClubFeature/AddAssociationClubPage';
import AssosiationClubsPage from '../AssociationClubFeature/AssosiationClubsPage';
import EditAssociationClubPage from '../AssociationClubFeature/EditAssociationClubPage';
import SelectedAssociationClubPage from '../AssociationClubFeature/SelectedAssociationClubPage';

/* Sessions */
import AddSessionPage from '../SessionsFeature/AddSessionPage';
import EditSessionPage from '../SessionsFeature/EditSessionPage';
import SessionPage from '../SessionsFeature/SessionsPage';
import SelectedACSessionsPage from '../SessionsFeature/SelectedACSessionsPage';
import StatisticsClubPage from '../SessionsFeature/StatisticsClubPage';

import 'fontsource-roboto';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


const { store, persistor } = configureStore();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <TokenRefresh reviewTime={300000} />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/auth" component={AuthPage} />
          <Route exact path="/authorization" component={AuthorizePage}/>
          <Route exact path="/creartaller" component={AddWorkshopPage} />
          <Route exact path="/talleres" component={WorkshopsPage} />
          <Route exact path="/taller" component={SelectedWorkshopPage} />
          <Route exact path="/editartaller" component={EditWorkshopPage} />
          <Route exact path="/crearequipo" component={AddTeamPage} />
          <Route exact path="/equipos" component={TeamsPage} />
          <Route exact path="/equipo" component={SelectedTeamPage} />
          <Route exact path="/editarequipo" component={EditTeamPage} />
          <Route exact path="/crearevento" component={AddEventPage} />
          <Route exact path="/eventos" component={EventsPage} />
          <Route exact path="/evento" component={SelectedEventPage} />
          <Route exact path="/editarevento" component={EditEventPage} />
          <Route exact path="/roles" component={RolesPage} />
          <Route exact path="/asignaroles" component={AssignPage} />
          <Route exact path="/crearAsociacionClub" component={AddAssociationClubPage} />
          <Route exact path="/asociacionesClubs" component={AssosiationClubsPage} />
          <Route exact path="/editarAsociacionClub" component={EditAssociationClubPage} />
          <Route exact path="/asociacionesClub" component={SelectedAssociationClubPage} />
          <Route exact path="/session" component={AddSessionPage} />
          <Route exact path="/editarsession" component={EditSessionPage} />
          <Route exact path="/sessions" component={SessionPage} />
          <Route exact path="/sessionsclub" component={SelectedACSessionsPage} />
          <Route exact path="/statisticsclub" component={StatisticsClubPage} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default App;