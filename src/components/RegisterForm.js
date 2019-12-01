import React from "react";
import PropTypes from "proptypes";

import {Button, Form, FormGroup, FormInput, InputGroup, InputGroupAddon, InputGroupText} from "shards-react";
import Row from "react-bootstrap/Row";

import {AuthenticationContext} from "../context/AuthenticationProvider";

import {usersEndpoint} from "../uris";
import Axios from "axios";


const emptyState = {
	email: '',
	password: '',
	city: '',
	emailValid: null,
	passwordValid: null,
	passwordsMatch: null
};

export default class RegisterForm extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			email: props.currentEmail || "",
			password: props.currentPassword || "",
			city: props.currentEmail || "",
			emailValid: null,
			passwordValid: null,
			passwordsMatch: null
		};

		this.validateEmail = this.validateEmail.bind(this);
		this.validatePassword = this.validatePassword.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
		this.submissionHandler = this.submissionHandler.bind(this);
	}

	validateEmail() {
		this.setState({
			emailValid: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
		});
	}

	validatePassword() {
		this.setState({
			passwordValid: /.{8,}/.test(this.state.password)
		});
	}

	handleEmailChange(e) {
		this.setState({
			email: e.target.value
		});

		this.props.handleInputChange(e);
	}

	handlePasswordChange(e) {
		this.setState({
			password: e.target.value
		});

		if (this.state.passwordValid !== null) {
			this.validatePassword();
		}

		this.props.handleInputChange(e);
	}

	handleConfirmPasswordChange(e) {
		this.setState({
			passwordsMatch: e.target.value === this.state.password
		});
	}

	handleCityChange = e => {
		this.setState({
			city: e.target.value
		});

		this.props.handleInputChange(e);
	};


	submissionHandler(e, updateContext) {
		e.preventDefault();

		this.validatePassword();
		this.validateEmail();

		// Simple form values validation to prevent multiple requests from being sent
		if (!this.state.passwordsMatch || !this.state.emailValid || !this.state.passwordValid) {
			// TODO: display modal to advert user form is not correctly filled
			return;
		}

		const request = {
			method: "POST",
			url: usersEndpoint,
			data: {
				email: this.state.email,
				password: this.state.password,
				city: this.state.city
			}
		};

		Axios(request)
			.then(response => {
				this.setState(emptyState);  // Resetting the state, just in case
				updateContext(response.data.token);
			})
			.catch(error => {
				// TODO: display modal to expose errors
				console.log("Authentication error:", error.response);
			});
	}

	render() {
		return (
			<AuthenticationContext.Consumer>
				{value => (
					<Form className="px-md-4" onSubmit={e =>  this.submissionHandler(e, value.storeToken)}>
						<FormGroup>
							<label htmlFor="email">Email</label>
							<InputGroup seamless>
								<InputGroupAddon type="prepend">
									<InputGroupText>📧</InputGroupText>
								</InputGroupAddon>
								<FormInput type="email" id="email" name="email" placeholder="Email" required
								           defaultValue={this.state.email}
								           onChange={this.handleEmailChange}
								           onBlur={this.validateEmail}
								           invalid={this.state.emailValid !== null && !this.state.emailValid}
								           valid={this.state.emailValid !== null && this.state.emailValid}
								/>
							</InputGroup>
						</FormGroup>

						<FormGroup>
							<label htmlFor="password">Password</label>
							<InputGroup seamless>
								<InputGroupAddon type="prepend">
									<InputGroupText>🔐</InputGroupText>
								</InputGroupAddon>
								<FormInput type="password" id="password" name="password" placeholder="Password" required
								           defaultValue={this.props.currentPassword ? this.props.currentPassword : ''}
								           onChange={this.handlePasswordChange}
								           onBlur={this.validatePassword}
								           invalid={this.state.passwordValid !== null && !this.state.passwordValid}
								           valid={this.state.passwordValid !== null && this.state.passwordValid}
								/>
							</InputGroup>
						</FormGroup>

						<FormGroup>
							<label htmlFor="confirm-password">Confirm password</label>
							<InputGroup seamless>
								<InputGroupAddon type="prepend">
									<InputGroupText>🔑</InputGroupText>
								</InputGroupAddon>
								<FormInput type="password" id="confirm-password" name="confirm-password" placeholder="Confirm password" required
								           onChange={this.handleConfirmPasswordChange}
								           invalid={this.state.passwordsMatch !== null && !this.state.passwordsMatch}
								           valid={this.state.passwordsMatch !== null && this.state.passwordsMatch}
								/>
							</InputGroup>
						</FormGroup>

						<FormGroup>
							<label htmlFor="city">City</label>
							<InputGroup seamless>
								<InputGroupAddon type="prepend">
									<InputGroupText>🏠</InputGroupText>
								</InputGroupAddon>
								<FormInput type="text" id="city" name="city" placeholder="city" required
								           defaultValue={this.props.currentCity ? this.props.currentCity : ''}
								           onChange={this.handleCityChange}
								/>
							</InputGroup>
						</FormGroup>

						<Row className="justify-content-center justify-content-md-between mt-4">
							<Button outline type="reset" size="sm" theme="danger" className="order-2 order-md-1 mt-4 mt-md-0" onClick={() => this.setState({email:'', password:'', city:'', emailValid: null, passwordValid: null, passwordsMatch: null})}>
								Reset
							</Button>
							<Button type="submit" className="col-12 col-md-4 order-1 order-md-2">
								Create an account
							</Button>
						</Row>
					</Form>
				)}
			</AuthenticationContext.Consumer>
		);
	}
}

RegisterForm.propTypes = {
	handleInputChange: PropTypes.func.isRequired,
	currentPassword: PropTypes.string,
	currentEmail: PropTypes.string,
	currentCity: PropTypes.string
};
