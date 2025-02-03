import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { userReducer, appReducer, categoriesReducer, accountsReducer } from './reducers';

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	categories: categoriesReducer,
	accounts: accountsReducer,
});

const composeEnhangers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhangers(applyMiddleware(thunk)));
