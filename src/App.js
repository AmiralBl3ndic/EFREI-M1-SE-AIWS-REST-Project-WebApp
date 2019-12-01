import React from 'react';

import AuthenticationProvider from "./context/AuthenticationProvider";

import AuthView from "./views/AuthView";

export default class App extends React.Component {
	state = {
		isLoggedIn: false
	};

	render() {
		return (
			<AuthenticationProvider>
				<div className="vh-100">
					{!this.state.isLoggedIn && <AuthView />}
				</div>
			</AuthenticationProvider>
		);
	}
}
