import React from "react";

import { Card, CardHeader, CardBody, CardTitle, CardFooter, Button } from 'shards-react';
import Row from "react-bootstrap/Row";

export default class AuthView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			createAccount: false
		};

		this.AuthFormFooter = this.AuthFormFooter.bind(this);
		this.AuthFormHeader = this.AuthFormHeader.bind(this);
	}


	render() {
		return (
			<Row className="vh-100 align-middle bg-light" noGutters={true}>
				<Card className="col-10 offset-1 col-md-8 offset-md-2 align-self-center">
					{ this.AuthFormHeader() }
					<CardBody>


					</CardBody>
					{ this.AuthFormFooter() }
				</Card>
			</Row>
		);
	}

	/**
	 * Renders the header of the authentication form accordingly to state
	 */
	AuthFormHeader() {
		return (
			<CardHeader>
				<CardTitle className="mb-0">
					{ this.state.createAccount ? "Create an account" : "Login" }
				</CardTitle>
			</CardHeader>
		);
	}

	/**
	 * Renders the footer of the authentication form accordingly to state
	 */
	AuthFormFooter() {
		const handleClick = () => {
			this.setState({
				createAccount: !this.state.createAccount
			});
		};

		if (this.state.createAccount) {
			return (
				<CardFooter>
					<span>Already have an account?</span>
					<br className="d-block d-md-none" />
					<Button size="sm" className="mt-2 mt-md-0 ml-md-2 px-1 px-md-2" onClick={handleClick}>Login</Button>
				</CardFooter>
			);
		} else {
			return (
				<CardFooter>
					<span>Do not have an account yet?</span>
					<br className="d-block d-md-none" />
					<Button size="sm" className="mt-2 mt-md-0 ml-md-2 px-1 px-md-2" onClick={handleClick}>Create an account</Button>
				</CardFooter>
			);
		}
	}
}


