import {
    fromJS
} from 'immutable';
const initialState = {
    "params": {
        "title": '',
        "content": '',
        "channel": [],
        "id": "",
        "status": "",
        "publisher": "",
        "istop":false
    },
    "message": [{
        "id": '1',
        "title": 'John Brown',
        "content": 32,
        "status": "0",
        "channel": ["1", "2"],
        "publisher": 'zhangsan',
        "istop": true,
    }, {
        "id": '2',
        "title": 'John Brown',
        "content": 32,
        "status": "1",
        "channel": ["1", "2"],
        "publisher": 'zhangsan',
        "istop": false,
    }, {
        "id": '3',
        "title": 'John Brown',
        "content": 32,
        "status": "0",
        "channel": ["1", "2"],
        "publisher": 'zhangsan',
        "istop": true,
    }]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEWS_CHANHE_PARAMS':
            return fromJS(state).merge({
                params: action.params
            }).toJS();
        case 'NEWS_CHANHE_MESSAGE':
            return fromJS(state).merge({
                message: action.message
            }).toJS();
        default:
            return state;
    }
}
export default reducer;