import React from "react";

const defaultValue = {
	jwtToken: null,
	storeToken: () => {},
	deleteToken: () => {}
};


export const AuthenticationContext = React.createContext(defaultValue);

class AuthenticationProvider extends React.Component {
	state = {
		jwtToken: defaultValue.jwtToken,
		storeToken: token => this.setState({ jwtToken: token }),
		deleteToken: token => this.setState( { jwtToken: defaultValue.jwtToken } )
	};

	render() {
		return (
			<AuthenticationContext.Provider value={this.state}>
				{ this.props.children }
			</AuthenticationContext.Provider>
		);
	}
}

export default AuthenticationProvider;
