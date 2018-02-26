/**
 * @file actions
 **/
/* eslint-disable */
import {
    combineReducers
} from 'redux';

import Login from './pages/login/reducer.js';
import Common from './redux/reducer/index.js';
const rootReducer = combineReducers({
    Common,
    Login
})

export default rootReducer;