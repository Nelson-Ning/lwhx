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
        "level": "C",
        "message": [{
            "publisher": "admin",
            "title": "阿萨德撒的",
            "content": "",
            "time": 1519963684968,
            "isRead": true,
            "message_type": "0",
            "id": "1"
        }, {
            "publisher": "admin",
            "title": "似懂非懂双方的首发",
            "content": "展现出现在",
            "time": 1519963684968,
            "isRead": true,
            "message_type": "1",
            "id": "2"
        }, {
            "publisher": "admin",
            "title": "撒旦撒",
            "content": "在在在",
            "time": 1519963684968,
            "isRead": false,
            "message_type": "2",
            "id": "3"
        }, {
            "publisher": "admin",
            "title": "撒旦撒",
            "content": "",
            "time": 1519963684968,
            "isRead": false,
            "message_type": "0",
            "id": "4"
        }, {
            "publisher": "admin",
            "title": "撒旦撒",
            "content": "在在在",
            "time": 1519963684968,
            "isRead": false,
            "message_type": "1",
            "id": "5"
        }]
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