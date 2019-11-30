import React from "react";

import { Card, CardBody, CardTitle, CardFooter, Button } from 'shards-react';
import Row from "react-bootstrap/Row";

export default class AuthView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			createAccount: false
		};

		this.AuthFormFooter = this.AuthFormFooter.bind(this);
	}


	render() {
		return (
			<Row className="vh-100 align-middle bg-light" noGutters={true}>
				<Card className="col-10 offset-1 col-md-8 offset-md-2 align-self-center">
					<CardBody>
						<CardTitle>Login</CardTitle>

					</CardBody>
					{ this.AuthFormFooter(false) }
				</Card>
			</Row>
		);
	}

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


