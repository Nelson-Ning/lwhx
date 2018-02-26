import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import {
    createStore,
    compose,
    applyMiddleware
} from 'redux';
import {
    Provider
} from 'react-redux';
import thunk from 'redux-thunk';
import Routes from './router';
const middleware = [thunk];
import rootReducer from './reducers';

const appCreateStore = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

let store = appCreateStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
     <Router>
        <Routes />
    </Router>
</Provider>, document.getElementById('root')
);