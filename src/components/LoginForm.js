import React from 'react';
import PropTypes from 'proptypes'
import {Button, Form, FormGroup, FormInput, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalHeader, ModalBody} from "shards-react";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Axios from "axios";
import { AuthenticationContext } from "../context/AuthenticationProvider";
import {authEndpoint} from '../uris';


/**
 * Component holding UI and logic for the login form of the app
 */
export default class LoginForm extends React.PureComponent {
	state = {
		email: this.props.currentEmail || "",
		password: this.props.currentPassword || "",
		error: '',
		showErrorModal: false,
		pendingRequest: false
	};

	/**
	 * Function called on form submission
	 * @param e "Form submitted" event
	 * @param updateContext AuthenticationContext method to update the authentication token
	 */
	handleSubmission = (e, updateContext) => {
		e.preventDefault();

		const request = {
			method: 'POST',
			url: authEndpoint,
			data: {
				email: this.state.email,
				password: this.state.password
			}
		};

		this.setState({pendingRequest: true});

		Axios(request)
			.then(response => {
				this.setState({
					email: '',
					password: ''
				});

				updateContext(response.data.token);
			})
			.catch(error => {
				this.setState({error: error.response.data.error, showErrorModal: true});
			})
			.finally(() => {
				this.setState({pendingRequest: false})
			});
	};

	/**
	 * Function called on an input change
	 * @param e "Input changed" event
	 */
	handleInputChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
		this.props.handleInputChange(e);
	};


	render() {
		return (
			<React.Fragment>
				<AuthenticationContext.Consumer>
					{ value => (
						<Form className="px-md-4" onSubmit={e => this.handleSubmission(e, value.storeToken)}>
							<FormGroup>
								<label htmlFor="email">Email</label>
								<InputGroup seamless>
									<InputGroupAddon type="prepend">
										<InputGroupText>📧</InputGroupText>
									</InputGroupAddon>
									<FormInput type="email" id="email" name="email" placeholder="Email" required
									           value={this.state.email}
									           onChange={this.handleInputChange}
									           invalid={!!this.state.error}
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
									           value={this.state.password}
									           onChange={this.handleInputChange}
									           invalid={!!this.state.error}
									/>
								</InputGroup>
							</FormGroup>

							<Row className="justify-content-center justify-content-md-end mt-4" noGutters>
								<Button type="submit" disabled={this.state.pendingRequest || this.state.email === "" || this.state.password === ""}>
									{ this.state.pendingRequest &&
										<React.Fragment>
											<Spinner animation="border" as="span" size="sm" />
											<span>&nbsp;&nbsp;</span>
										</React.Fragment>
									}
									<span>Login</span>
								</Button>
							</Row>
						</Form>
					)}
				</AuthenticationContext.Consumer>

				<ErrorModal
					show={this.state.showErrorModal}
					message={this.state.error}
					toggle={() => this.setState({showErrorModal: false})}
				/>
			</React.Fragment>

		);
	}
}


class ErrorModal extends React.PureComponent {
	render() {
		return (
			<Modal size="lg" open={this.props.show} toggle={this.props.toggle} centered>
				<ModalHeader closeAriaLabel="Dismiss">Authentication failed 😓</ModalHeader>
				<ModalBody>
					{ this.props.message }
				</ModalBody>
			</Modal>
		);
	}
}


LoginForm.propTypes = {
	handleInputChange: PropTypes.func.isRequired,
	currentEmail: PropTypes.string,
	currentPassword: PropTypes.string
};
