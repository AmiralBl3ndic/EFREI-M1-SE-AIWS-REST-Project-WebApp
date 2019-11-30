import React from "react";

import { Card, CardHeader, CardBody, CardTitle, CardFooter, Button } from 'shards-react';
import Row from "react-bootstrap/Row";

export default class AuthView extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			isLoggingIn: true
		};
	}


	render() {
		return (
			<Row className="vh-100 align-middle bg-light" noGutters={true}>
				<Card className="col-10 offset-1 col-md-8 offset-md-2 align-self-center">
					<AuthFormHeader isLoggingIn={this.state.isLoggingIn} />

					<CardBody>

					</CardBody>

					<AuthFormFooter isLoggingIn={this.state.isLoggingIn} onClick={() => this.setState({isLoggingIn: !this.state.isLoggingIn})} />
				</Card>
			</Row>
		);
	}
}

/**
 * Renders the header of the authentication form accordingly to state
 */
class AuthFormHeader extends React.PureComponent {
	render() {
		return (
			<CardHeader>
				<CardTitle className="mb-0">
					{ this.props.isLoggingIn ? "Login" : "Create an account" }
				</CardTitle>
			</CardHeader>
		);
	}
}

/**
 * Renders the footer of the authentication form accordingly to state
 */
class AuthFormFooter extends React.PureComponent {
	render() {
		if (this.props.isLoggingIn) {
			return (
				<CardFooter>
					<span>Do not have an account yet?</span>
					<br className="d-block d-md-none" />
					<Button size="sm" className="mt-2 mt-md-0 ml-md-2 px-1 px-md-2" onClick={this.props.onClick}>Create an account</Button>
				</CardFooter>
			);
		} else {
			return (
				<CardFooter>
					<span>Already have an account?</span>
					<br className="d-block d-md-none" />
					<Button size="sm" className="mt-2 mt-md-0 ml-md-2 px-1 px-md-2" onClick={this.props.onClick}>Login</Button>
				</CardFooter>
			);
		}
	}
}
