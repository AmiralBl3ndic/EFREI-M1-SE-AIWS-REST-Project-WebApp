import React from "react";

const defaultValue = { jwtToken: null };


const AuthenticationContext = React.createContext(defaultValue);

class AuthenticationProvider extends React.Component {
	state = defaultValue;

	render() {
		return (
			<AuthenticationContext.Provider value={this.state}>
				{ this.props.children }
			</AuthenticationContext.Provider>
		);
	}
}

export default AuthenticationProvider;
