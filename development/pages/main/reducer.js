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
        "title": '撒撒旦撒旦阿萨德撒的撒旦撒撒旦阿萨德',
        "describe": "阿萨德撒的撒旦撒旦ad撒旦撒撒旦撒旦阿萨德撒的撒旦撒",
        "requirement": "阿萨德撒旦撒旦撒旦撒撒旦撒撒旦",
        "teacher": {
            "username": "阿萨德",
            "teacher_name": "周杰伦",
            "teacher_introduction": "撒旦撒旦",
            "teacher_title": "阿斯达",
            "teacher_direction": "萨阿德斯"
        },
        "num": 3,
    }, {
        "id": '2',
        "title": '撒撒旦撒旦阿萨德撒的撒旦撒撒旦阿萨德',
        "describe": "阿萨德撒的撒旦撒旦ad撒旦撒撒旦撒旦阿萨德撒的撒旦撒",
        "requirement": "阿萨德撒旦撒旦撒旦撒撒旦撒撒旦",
        "teacher": {
            "username": "",
            "teacher_name": "",
            "teacher_introduction": "撒旦撒打算的",
            "teacher_title": "阿斯达",
            "teacher_direction": "萨阿德斯"
        },
        "num": 3,
    }, {
        "id": '3',
        "title": '撒撒旦撒旦阿萨德撒的撒旦撒撒旦阿萨德',
        "describe": "阿萨德撒的撒旦撒旦ad撒旦撒撒旦撒旦阿萨德撒的撒旦撒",
        "requirement": "阿萨德撒旦撒旦撒旦撒撒旦撒撒旦",
        "teacher": {
            "username": "",
            "teacher_name": "",
            "teacher_introduction": "撒旦撒打算的",
            "teacher_title": "阿斯达",
            "teacher_direction": "萨阿德斯"
        },
        "num": 3,
    }, {
        "id": '4',
        "title": '撒撒旦撒旦阿萨德撒的撒旦撒撒旦阿萨德',
        "describe": "阿萨德撒的撒旦撒旦ad撒旦撒撒旦撒旦阿萨德撒的撒旦撒",
        "requirement": "阿萨德撒旦撒旦撒旦撒撒旦撒撒旦",
        "teacher": {
            "username": "",
            "teacher_name": "",
            "teacher_introduction": "撒旦撒打算的",
            "teacher_title": "阿斯达",
            "teacher_direction": "萨阿德斯"
        },
        "num": 3,
    }, {
        "id": '5',
        "title": '撒撒旦撒旦阿萨德撒的撒旦撒撒旦阿萨德',
        "describe": "阿萨德撒的撒旦撒旦ad撒旦撒撒旦撒旦阿萨德撒的撒旦撒",
        "requirement": "阿萨德撒旦撒旦撒旦撒撒旦撒撒旦",
        "teacher": {
            "username": "",
            "teacher_name": "",
            "teacher_introduction": "撒旦撒打算的",
            "teacher_title": "阿斯达",
            "teacher_direction": "萨阿德斯"
        },
        "num": 3,
    }, {
        "id": '6',
        "title": '撒撒旦撒旦阿萨德撒的撒旦撒撒旦阿萨德',
        "describe": "阿萨德撒的撒旦撒旦ad撒旦撒撒旦撒旦阿萨德撒的撒旦撒",
        "requirement": "阿萨德撒旦撒旦撒旦撒撒旦撒撒旦",
        "teacher": {
            "username": "",
            "teacher_name": "",
            "teacher_introduction": "撒旦撒打算的",
            "teacher_title": "阿斯达",
            "teacher_direction": "萨阿德斯"
        },
        "num": 3,
    }, {
        "id": '7',
        "title": '撒撒旦撒旦阿萨德撒的撒旦撒撒旦阿萨德',
        "describe": "阿萨德撒的撒旦撒旦ad撒旦撒撒旦撒旦阿萨德撒的撒旦撒",
        "requirement": "阿萨德撒旦撒旦撒旦撒撒旦撒撒旦",
        "teacher": {
            "username": "",
            "teacher_name": "",
            "teacher_introduction": "撒旦撒打算的",
            "teacher_title": "阿斯达",
            "teacher_direction": "萨阿德斯"
        },
        "num": 3,
    }, {
        "id": '8',
        "title": '撒撒旦撒旦阿萨德撒的撒旦撒撒旦阿萨德',
        "describe": "阿萨德撒的撒旦撒旦ad撒旦撒撒旦撒旦阿萨德撒的撒旦撒",
        "requirement": "阿萨德撒旦撒旦撒旦撒撒旦撒撒旦",
        "teacher": {
            "username": "",
            "teacher_name": "",
            "teacher_introduction": "撒旦撒打算的",
            "teacher_title": "阿斯达",
            "teacher_direction": "萨阿德斯"
        },
        "num": 3,
    }, {
        "id": '9',
        "title": '撒撒旦撒旦阿萨德撒的撒旦撒撒旦阿萨德',
        "describe": "阿萨德撒的撒旦撒旦ad撒旦撒撒旦撒旦阿萨德撒的撒旦撒",
        "requirement": "阿萨德撒旦撒旦撒旦撒撒旦撒撒旦",
        "teacher": {
            "username": "",
            "teacher_name": "",
            "teacher_introduction": "撒旦撒打算的",
            "teacher_title": "阿斯达",
            "teacher_direction": "萨阿德斯"
        },
        "num": 3,
    }, {
        "id": '10',
        "title": '撒撒旦撒旦阿萨德撒的撒旦撒撒旦阿萨德',
        "describe": "阿萨德撒的撒旦撒旦ad撒旦撒撒旦撒旦阿萨德撒的撒旦撒",
        "requirement": "阿萨德撒旦撒旦撒旦撒撒旦撒撒旦",
        "teacher": {
            "username": "",
            "teacher_name": "",
            "teacher_introduction": "撒旦撒打算的",
            "teacher_title": "阿斯达",
            "teacher_direction": "萨阿德斯"
        },
        "num": 3,
    }, {
        "id": '11',
        "title": '撒撒旦撒旦阿萨德撒的撒旦撒撒旦阿萨德',
        "describe": "阿萨德撒的撒旦撒旦ad撒旦撒撒旦撒旦阿萨德撒的撒旦撒",
        "requirement": "阿萨德撒旦撒旦撒旦撒撒旦撒撒旦",
        "teacher": {
            "username": "",
            "teacher_name": "",
            "teacher_introduction": "撒旦撒打算的",
            "teacher_title": "阿斯达",
            "teacher_direction": "萨阿德斯"
        },
        "num": 3,
    }, {
        "id": '12',
        "title": '撒撒旦撒旦阿萨德撒的撒旦撒撒旦阿萨德',
        "describe": "阿萨德撒的撒旦撒旦ad撒旦撒撒旦撒旦阿萨德撒的撒旦撒",
        "requirement": "阿萨德撒旦撒旦撒旦撒撒旦撒撒旦",
        "teacher": {
            "username": "",
            "teacher_name": "",
            "teacher_introduction": "撒旦撒打算的",
            "teacher_title": "阿斯达",
            "teacher_direction": "萨阿德斯"
        },
        "num": 3,
    }, {
        "id": '13',
        "title": '撒撒旦撒旦阿萨德撒的撒旦撒撒旦阿萨德',
        "describe": "阿萨德撒的撒旦撒旦ad撒旦撒撒旦撒旦阿萨德撒的撒旦撒",
        "requirement": "阿萨德撒旦撒旦撒旦撒撒旦撒撒旦",
        "teacher": {
            "username": "",
            "teacher_name": "",
            "teacher_introduction": "撒旦撒打算的",
            "teacher_title": "阿斯达",
            "teacher_direction": "萨阿德斯"
        },
        "num": 3,
    }]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default: return state;
    }
}
export default reducer;