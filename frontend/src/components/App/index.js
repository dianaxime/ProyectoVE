import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from '../../store';

import AuthPage from '../AuthPage';
import HomePage from '../HomePage';
import AuthorizePage from '../AuthorizePage';
import AddWorkshopPage from '../WorkshopFeature/AddWorkshopPage';
import WorkshopsPage from '../WorkshopFeature/WorkshopsPage';
import EditWorkshopPage from '../WorkshopFeature/EditWorkshopPage';
import SelectedWorkshopPage from '../WorkshopFeature/SelectedWorkshopPage';
import TokenRefresh from '../TokenRefresh';
import AddTeamPage from '../TeamFeature/AddTeamPage';
import TeamsPage from '../TeamFeature/TeamsPage';
import EditTeamPage from '../TeamFeature/EditTeamPage';
import SelectedTeamPage from '../TeamFeature/SelectedTeamPage';
import RolesPage from '../RolesRelationshipFeature/RolesPage';

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
          <Route exact path="/roles" component={RolesPage} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default App;