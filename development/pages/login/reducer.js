import {
    combineReducers
} from 'redux';
import {
    fromJS
} from 'immutable';
const initialState = {
    "loginInfo": {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_GOLOGIN':
            return fromJS(state).merge({
                loginInfo: action.loginInfo
            }).toJS();
        default:
            return state;
    }
}
export default reducer;