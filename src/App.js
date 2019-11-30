import React from 'react';

import AuthView from "./views/AuthView";

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn: false
		};
	}

	render() {
		return (
			<div className="vh-10">
				{!this.state.isLoggedIn && <AuthView />}
			</div>
		);
	}
}
