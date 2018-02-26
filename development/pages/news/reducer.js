import {
    fromJS
} from 'immutable';
const initialState = {
    "params": {
        "title": '',
        "content": '',
        "channel": [],
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEWS_CHANHE_PARAMS':
            return fromJS(state).merge({
                params: action.params
            }).toJS();
        default:
            return state;
    }
}
export default reducer;