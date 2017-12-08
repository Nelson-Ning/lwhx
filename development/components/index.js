import React from "react";
import Top from "./header.js"
import Contents from "./content.js"
import './common.scss'
class MyComponent extends React.Component {
	render() {
		return (
			<div>
		<Top></Top>
		<Contents></Contents>
      </div>
		)
	}

}
module.exports = MyComponent;