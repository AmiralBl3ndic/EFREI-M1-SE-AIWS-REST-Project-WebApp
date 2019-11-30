import React from 'react';
import PropTypes from 'proptypes'

import {Button, Form, FormGroup, FormInput, InputGroup, InputGroupAddon, InputGroupText} from "shards-react";
import Row from "react-bootstrap/Row";


export default class LoginForm extends React.PureComponent {
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
						           onChange={this.props.handleInputChange}
						           invalid={this.props.wrongCredentials}
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
						           onChange={this.props.handleInputChange}
						           invalid={this.props.wrongCredentials}
						/>
					</InputGroup>
				</FormGroup>

				<Row className="justify-content-center justify-content-md-end mt-4" noGutters={true}>
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
	wrongCredentials: PropTypes.bool
};
