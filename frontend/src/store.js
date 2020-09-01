import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
    persistStore,
    persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducer from './reducers';
import mainSaga from './sagas';


const composeEnhancers =
typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
}) : compose;

export const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const persistedReducer = persistReducer(
        {
        key: 'rootx',
        storage,
        whitelist: ['auth', 'workshops', 'scholars', 'selectedWorkshop', 'participation', 'selectedTeam',  'teams' , 'tournament', 'rolesRelationship', 'selectedRol', 'selectedAUser'],
        },
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    const store = createStore(
        persistedReducer,
        composeEnhancers(
            applyMiddleware(sagaMiddleware),
        ),
    );

    const persistor = persistStore(store);

    sagaMiddleware.run(mainSaga);

    return { store, persistor };
}