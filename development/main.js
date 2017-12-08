import React from 'react'
import ReactDOM from 'react-dom'
import {
	hashHistory,
	HashRouter,
	Route
} from 'react-router-dom'
import AppComponent from './components/index.js';
import Index from './pages/index'
ReactDOM.render(
	<HashRouter histroy={hashHistory}>
		<AppComponent>
			<Route exact path="/" component={Index} />
		</AppComponent>
	</HashRouter>, document.getElementById('root'));