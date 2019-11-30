import React from 'react';
import PropTypes from 'proptypes'

import {Button, Form, FormGroup, FormInput, InputGroup, InputGroupAddon, InputGroupText} from "shards-react";
import Row from "react-bootstrap/Row";


export default class LoginForm extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			email: props.currentEmail || "",
			password: props.currentPassword || "",
			wrongCredentials: false
		};

		this.handleSubmission = this.handleSubmission.bind(this);
	}

	/**
	 * Function called on form submission
	 * @param e "Form submitted" event
	 */
	handleSubmission(e) {


		this.props.onSubmit(e);  // Lift the information to parent component
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
			<Form className="px-md-4" onSubmit={this.props.onSubmit}>
				<FormGroup>
					<label htmlFor="email">Email</label>
					<InputGroup seamless>
						<InputGroupAddon type="prepend">
							<InputGroupText>📧</InputGroupText>
						</InputGroupAddon>
						<FormInput type="email" id="email" name="email" placeholder="Email" required
						           defaultValue={this.props.currentEmail ? this.props.currentEmail : ''}
						           onChange={this.handleInputChange}
						           invalid={this.state.wrongCredentials}
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
						           onChange={this.handleInputChange}
						           invalid={this.state.wrongCredentials}
						/>
					</InputGroup>
				</FormGroup>

				<Row className="justify-content-center justify-content-md-end mt-4" noGutters>
					<Button type="submit">
						Login
					</Button>
				</Row>
			</Form>
		);
	}
}

LoginForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	handleInputChange: PropTypes.func.isRequired,
	currentEmail: PropTypes.string,
	currentPassword: PropTypes.string
};
