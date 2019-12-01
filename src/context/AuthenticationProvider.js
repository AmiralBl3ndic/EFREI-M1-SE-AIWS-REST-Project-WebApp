import React from "react";
import {JWT_STORAGE} from "../constants";

const defaultValue = {
	jwtToken: null,
	storeToken: () => {},
	deleteToken: () => {}
};


export const AuthenticationContext = React.createContext(defaultValue);

class AuthenticationProvider extends React.Component {
	state = {
		jwtToken: defaultValue.jwtToken,
		storeToken: token => {
			this.setState({ jwtToken: token });
			localStorage.setItem(JWT_STORAGE, token);
		},
		deleteToken: token => {
			this.setState({ jwtToken: defaultValue.jwtToken });
			localStorage.removeItem(JWT_STORAGE);
		}
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
