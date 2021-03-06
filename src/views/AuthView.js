import React from "react";

import {
	Card,	CardHeader,
	CardBody,	CardTitle, CardFooter,
	Button } from 'shards-react';

import Row from "react-bootstrap/Row";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default class AuthView extends React.PureComponent {
	state = {
		isLoggingIn: true,
		email: '',
		password: '',
		city: ''
	};

	render() {
		return (
			<Row className="h-100 align-middle" noGutters>
				<Card className="col-10 offset-1 col-md-8 offset-md-2 align-self-center my-2">
					<AuthFormHeader isLoggingIn={this.state.isLoggingIn} />

					<CardBody>
						{ this.renderForm() }
					</CardBody>

					<AuthFormFooter isLoggingIn={this.state.isLoggingIn} onClick={this.toggleForms} />
				</Card>
			</Row>
		);
	}

	renderForm = () => {
		if (this.state.isLoggingIn) {
			return (
				<LoginForm
					handleInputChange={this.handleInputChange}
					currentEmail={this.state.email}
					currentPassword={this.state.password}
				/>
			);
		} else {
			return (
				<RegisterForm
					handleInputChange={this.handleInputChange}
					currentEmail={this.state.email}
					currentPassword={this.state.password}
					currentCity={this.state.city}
				/>
			);
		}
	};

	/**
	 * Handles a change made on an input (text input)
	 * @param event Change event
	 */
	handleInputChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	/**
	 * Toggle the displayed form between {@link LoginForm} and {@link RegisterForm}
	 */
	toggleForms = () => {
		this.setState({isLoggingIn: !this.state.isLoggingIn});
	};
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
					<Button outline size="sm" className="mt-2 mt-md-0 ml-md-2 px-1 px-md-2" onClick={this.props.onClick}>Create an account</Button>
				</CardFooter>
			);
		} else {
			return (
				<CardFooter>
					<span>Already have an account?</span>
					<br className="d-block d-md-none" />
					<Button outline size="sm" className="mt-2 mt-md-0 ml-md-2 px-1 px-md-2" onClick={this.props.onClick}>Login</Button>
				</CardFooter>
			);
		}
	}
}
