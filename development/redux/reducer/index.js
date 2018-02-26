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
        "token": "sadsadsadasxxx",
        "message": [
            {
                "publisher": "admin",
                "title": "阿萨德撒的",
                "content": "自行车自行车自行车自行车自行车自行车自行车自行车自行车自行车自行车自行车自行车自行车",
                "isRead": true,
                "canReply": false
            }, {
                "publisher": "admin",
                "title": "",
                "content": "展现出现在",
                "isRead": true,
                "canReply": false
            }, {
                "publisher": "admin",
                "title": "撒旦撒",
                "content": "在在在",
                "isRead": false,
                "canReply": false
            }
        ]
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