import React from "react";
import PropTypes from "proptypes";
import {
	Button,
	Form,
	FormGroup,
	FormInput,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Modal, ModalBody,
	ModalHeader
} from "shards-react";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Axios from "axios";
import {AuthenticationContext} from "../context/AuthenticationProvider";
import {usersEndpoint} from "../uris";


const emptyState = {
	email: '',
	password: '',
	city: '',
	emailValid: null,
	passwordValid: null,
	passwordsMatch: null
};

export default class RegisterForm extends React.PureComponent {
	state = {
		email: this.props.currentEmail || "",
		password: this.props.currentPassword || "",
		city: this.props.currentEmail || "",
		emailValid: null,
		passwordValid: null,
		passwordsMatch: null,
		requestPending: false,
		showErrorModal: false,
		errorMessage: null
	};

	validateEmail = () => {
		this.setState({
			emailValid: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
		});
	};

	validatePassword = () => {
		this.setState({
			passwordValid: /.{8,}/.test(this.state.password)
		});
	};

	handleEmailChange = (e) => {
		this.setState({
			email: e.target.value
		});

		this.props.handleInputChange(e);
	};

	handlePasswordChange = (e) => {
		this.setState({
			password: e.target.value
		});

		if (this.state.passwordValid !== null) {
			this.validatePassword();
		}

		this.props.handleInputChange(e);
	};

	handleConfirmPasswordChange = (e) => {
		this.setState({
			passwordsMatch: e.target.value === this.state.password
		});
	};

	handleCityChange = e => {
		this.setState({
			city: e.target.value
		});

		this.props.handleInputChange(e);
	};


	submissionHandler = (e, updateContext) => {
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

		this.setState({requestPending: true});

		Axios(request)
			.then(response => {
				this.setState(emptyState);  // Resetting the state, just in case
				updateContext(response.data.token);
			})
			.catch(error => {
				this.setState({
					errorMessage: error.response.data.error,
					showErrorModal: true,
				});

				if (/already be in use/.test(this.state.errorMessage)) {
					this.setState({
						emailValid: false
					});
				}
			})
			.finally(() => {
				this.setState({requestPending: false});
			});
	};

	render() {
		return (
			<AuthenticationContext.Consumer>
				{value => (
					<React.Fragment>
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
								<Button type="submit" className="col-12 col-md-4 order-1 order-md-2" disabled={this.state.requestPending || !(this.state.emailValid && this.state.passwordValid && this.state.passwordsMatch && this.state.city !== "")}>
									{ this.state.pendingRequest &&
									<React.Fragment>
										<Spinner animation="border" as="span" size="sm" />
										<span>&nbsp;&nbsp;</span>
									</React.Fragment>
									}
									Create an account
								</Button>
							</Row>
						</Form>

						<ErrorModal
							show={this.state.showErrorModal}
							toggle={() => this.setState({showErrorModal: false})}
							message={this.state.errorMessage}
						/>
					</React.Fragment>
				)}
			</AuthenticationContext.Consumer>
		);
	}
}

class ErrorModal extends React.PureComponent {
	render() {
		return (
			<Modal size="lg" open={this.props.show} toggle={this.props.toggle} centered>
				<ModalHeader closeAriaLabel="Dismiss">Account creation failed 😓</ModalHeader>
				<ModalBody>
					{ this.props.message }
				</ModalBody>
			</Modal>
		);
	}
}

RegisterForm.propTypes = {
	handleInputChange: PropTypes.func.isRequired,
	currentPassword: PropTypes.string,
	currentEmail: PropTypes.string,
	currentCity: PropTypes.string
};
