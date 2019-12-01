import React from "react";
import PropTypes from 'proptypes';
import {Modal, notification} from 'antd';
import {Button, Form, FormGroup, FormInput, InputGroup, InputGroupAddon, InputGroupText} from 'shards-react';
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import {usersEndpoint} from "../uris";
import Axios from "axios";


export default class AccountSettingsModal extends React.PureComponent {
	render() {
		return (
			<Modal
				footer={null}
				centered
				visible={this.props.visible}
				title="Account settings"
			>

				<AccountDetailsForm />

			</Modal>
		);
	}
}


class AccountDetailsForm extends React.PureComponent {
	render() {
		return (
			<React.Fragment>
				<ChangePasswordForm />
			</React.Fragment>
		);
	}
}


class ChangePasswordForm extends React.PureComponent {
	state = {
		password: '',
		pendingRequest: false
	};

	handleInputChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmission = e => {
		e.preventDefault();

		let tokenPayload = JSON.parse(atob(sessionStorage.getItem("jwt-token").split('.')[1]));

		const request = {
			method: 'PUT',
			url: usersEndpoint + `/${tokenPayload.dbId}`,
			data: {
				password: this.state.password
			},
			headers: {
				'Authorization': 'Bearer ' + sessionStorage.getItem("jwt-token")  // Building the authorization header
			}
		};

		this.setState({pendingRequest: true});

		Axios(request)
			.then(() => {
				notification["success"]({message: "Password updated"});
			})
			.catch(() => {
				notification["error"]({message: "Unable to update password"});
			})
			.finally(() => {
				this.setState({pendingRequest: false, password: ''});
			});
	};

	render() {
		return (
			<Form onSubmit={this.handleSubmission}>
				<h5>Change password</h5>
				<FormGroup>
					<InputGroup seamless>
						<InputGroupAddon type="prepend">
							<InputGroupText>🔐</InputGroupText>
						</InputGroupAddon>
						<FormInput type="password" id="password" name="password" placeholder="New password" required
						           value={this.state.password}
						           onChange={this.handleInputChange}
						           invalid={!!this.state.error}
						/>
					</InputGroup>
				</FormGroup>

				<Row className="justify-content-center justify-content-md-end mt-2" noGutters>
					<Button type="submit" disabled={this.state.pendingRequest || this.state.password === ""} outline>
						{ this.state.pendingRequest &&
						<React.Fragment>
							<Spinner animation="border" as="span" size="sm" />
							<span>&nbsp;&nbsp;</span>
						</React.Fragment>
						}
						<span>Change my password</span>
					</Button>
				</Row>
			</Form>
		);
	}
}



AccountSettingsModal.propTypes = {
	visible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired
};
