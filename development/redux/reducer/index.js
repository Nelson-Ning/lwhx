/**
 * 公共 reducer
 */
import {
    fromJS
} from 'immutable';
const initialState = {
    loading: false,
    hide: false,
    userInfo: {
        "name": "2999",
        "level": "A",
        "token": "sadsadsadasxxx"
    }
};

/**
 * 公共reducer
 * @return
 */
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING': // 用于页面和区块的加载中状态
            return fromJS(state).merge({
                loading: action.loading
            }).toJS();
        case 'CHANGE_ASIDE':
            return fromJS(state).merge({
                hide: action.hide
            }).toJS();
        case 'CHANGE_USERINFO':
            return fromJS(state).merge({
                userInfo: action.userInfo
            }).toJS();
        default:
            return state;
    }
}

export default reducer;