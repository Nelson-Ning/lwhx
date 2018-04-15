import React from 'react'
import ReactDOM from 'react-dom'
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import Routes from './router';
import {
	AJAX
} from './utils/index.js';
import {
	message
} from 'antd';
const Ajax = new AJAX();

Ajax.get({
	url: 'api/user/judgeLogin',
}).then(result => {
	if (0 === +result.errno) {
		const code = result.ret.userInfo.code
		if (code === 403) {
			message.error(result.ret.userInfo.tip)
		} else if (code === 200) {
			const {
				name,
				level,
				college,
				user_id
			} = result.ret.userInfo;
			sessionStorage.setItem("name", name);
			sessionStorage.setItem("level", level);
			sessionStorage.setItem("college", college);
			sessionStorage.setItem("user_id", user_id);
		} else {
			message.error('服务器请求失败');
		}
	}
})

ReactDOM.render(
	<Router>
      <Routes />
    </Router>, document.getElementById('root')
);