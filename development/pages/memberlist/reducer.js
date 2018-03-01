import {
    fromJS
} from 'immutable';
const initialState = {
    "params": {
        "level": '',
        "username": '',
        "password": '',
        "institute": ''
    },
    "data": [{
        "id": '1',
        "username": 'John Brown',
        "level": "A",
        "institute": "0"
    },{
        "id": '2',
        "username": 'John Brown',
        "level": "B",
        "institute": "2"
    }]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MEMBERLIST_ADD_ACCOUNT_NUMBER':
            return fromJS(state).merge({
                params: action.params
            }).toJS();
        default:
            return state;
    }
}
export default reducer;