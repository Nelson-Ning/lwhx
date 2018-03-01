/**
 * @file actions
 **/
/* eslint-disable */
import {
    combineReducers
} from 'redux';

import Login from './pages/login/reducer.js';
import Common from './redux/reducer/index.js';
import News from './pages/news/reducer.js';
import MemberList from './pages/memberlist/reducer.js';
const rootReducer = combineReducers({
    Common,
    Login,
    News,
    MemberList
})

export default rootReducer;