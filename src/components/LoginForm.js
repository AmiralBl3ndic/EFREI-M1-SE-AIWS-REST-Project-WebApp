import Axios from "axios";
import {authEndpoint} from '../uris';
import {JWT_STORAGE} from '../constants';

import React from 'react';
import PropTypes from 'proptypes'

import {Button, Form, FormGroup, FormInput, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalHeader, ModalBody} from "shards-react";
import Row from "react-bootstrap/Row";

/**
 * Component holding UI and logic for the login form of the app
 */
export default class LoginForm extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			email: props.currentEmail || "",
			password: props.currentPassword || "",
			error: '',
			showErrorModal: false
		};

		this.handleSubmission = this.handleSubmission.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	/**
	 * Function called on form submission
	 * @param e "Form submitted" event
	 */
	handleSubmission(e) {
		e.preventDefault();

		const request = {
			method: 'POST',
			url: authEndpoint,
			data: {
				email: this.state.email,
				password: this.state.password
			}
		};

		Axios(request)
			.then(response => {
				this.setState({
					email: '',
					password: ''
				});

				// Save the token to local storage and lift state up
				localStorage.setItem(JWT_STORAGE, response.data.token);
				this.props.onSuccess();
			})
			.catch(error => {
				this.setState({error: error.response.data.error, showErrorModal: true});
			});
	}

	/**
	 * Function called on an input change
	 * @param e "Input changed" event
	 */
	handleInputChange(e) {
		this.setState({[e.target.name]: e.target.value});
		this.props.handleInputChange(e);
	}


	render() {
		return (
			<React.Fragment>
				<Form className="px-md-4" onSubmit={this.handleSubmission}>
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
						<Button type="submit">
							Login
						</Button>
					</Row>
				</Form>

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
	onSuccess: PropTypes.func.isRequired,
	handleInputChange: PropTypes.func.isRequired,
	currentEmail: PropTypes.string,
	currentPassword: PropTypes.string
};
