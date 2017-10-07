import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import * as reducers from '../redux/reducers';
import rootSaga from '../redux/sagas';
//import { client } from '../apollo/client'
import { reducer as formReducer } from 'redux-form';


const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middlewares = [thunk, sagaMiddleware, routeMiddleware];

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
    //Apollo: client.reducer(),
    form: formReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(applyMiddleware(...middlewares),
));
sagaMiddleware.run(rootSaga);
export { store, history };
