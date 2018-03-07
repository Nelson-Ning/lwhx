import {
    fromJS
} from 'immutable';
const initialState = {
    "data": [{
        "id": '1',
        "name": 'asdasd',
        "title": "撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦",
        "requirement": "撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦"
    }, {
        "id": '2',
        "name": 'asdasd',
        "title": "撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦",
        "requirement": "撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦"
    }]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default: return state;
    }
}
export default reducer;