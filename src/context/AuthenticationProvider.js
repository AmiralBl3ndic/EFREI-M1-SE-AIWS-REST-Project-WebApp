import React from "react";

const JWT_STORAGE = "jwt-token";

const defaultValue = {
	jwtToken: sessionStorage.getItem(JWT_STORAGE) === null ? "" : sessionStorage.getItem(JWT_STORAGE),
	storeToken: () => {},
	deleteToken: () => {}
};


export const AuthenticationContext = React.createContext(defaultValue);

class AuthenticationProvider extends React.Component {
	refreshInterval = null;

	state = {
		jwtToken: defaultValue.jwtToken,
		storeToken: token => {
			this.setState({ jwtToken: token });
			sessionStorage.setItem(JWT_STORAGE, token);
		},
		deleteToken: token => {
			this.setState({ jwtToken: defaultValue.jwtToken });
			sessionStorage.removeItem(JWT_STORAGE);
		}
	};

	componentDidMount() {
		this.refreshInterval = setInterval(() => {
			this.setState({jwtToken: sessionStorage.getItem(JWT_STORAGE) === null ? "" : sessionStorage.getItem(JWT_STORAGE)});
		}, 5 * 1000);
	}

	componentWillUnmount() {
		clearInterval(this.refreshInterval);
	}

	render() {
		return (
			<AuthenticationContext.Provider value={this.state}>
				{ this.props.children }
			</AuthenticationContext.Provider>
		);
	}
}

export default AuthenticationProvider;
