import React, {
	Component
} from 'react';
import {
	Route
} from 'react-router-dom'
import {
	Layout
} from 'antd'
import './content.scss'
import index from '../pages/index'
const {
	Content
} = Layout

export default class Contents extends Component {

	render() {
		return (
			<Content className="content">
				<Route path="/index" component={index} />
			</Content>
		)
	}
}