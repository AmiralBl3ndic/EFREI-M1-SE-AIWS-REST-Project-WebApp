import React from 'react';

import AuthenticationProvider, {AuthenticationContext} from "./context/AuthenticationProvider";

import AuthView from "./views/AuthView";
import HomeView from "./views/HomeView";

export default class App extends React.Component {
	state = {
		isLoggedIn: false
	};

	render() {
		return (
			<AuthenticationProvider>
				<AuthenticationContext.Consumer>
					{value => (
						<div className="vh-100">
							{(value.jwtToken === null || value.jwtToken === "") && <AuthView />}
							{(value.jwtToken !== null && value.jwtToken !== "") && <HomeView />}
						</div>
					)}
				</AuthenticationContext.Consumer>
			</AuthenticationProvider>
		);
	}
}
