import React from "react";
import {Modal, DatePicker, notification} from "antd";
import {Form, FormInput, FormGroup, FormTextarea, Button} from 'shards-react';

import Axios from 'axios';

import {videoGamesEndpoint} from "../uris";
import moment from "moment";

export default class AddVideoGameModal extends React.PureComponent {
	render() {
		return (
			<Modal
				footer={null}
				centered
				visible={this.props.visible}
				onCancel={() => this.props.onClose(false)}
				title="Add a video game"
			>
				<AddVideoGameForm onSubmitSuccess={() => this.props.onClose(true)} />
			</Modal>
		);
	}
}

class AddVideoGameForm extends React.PureComponent {
	state = {
		name: '',
		type: '',
		editor: '',
		releaseDate: '',
		resume: ''
	};
	
	handleInputChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};
	
	handleReleaseDateChange = (date, dateString) => {
		this.setState({
			releaseDate: dateString
		});
	};
	
	handleResumeChange = e => {
		this.setState({
			resume: e.target.value
		});
	};
	
	handleFormSubmission = e => {
		e.preventDefault();
		e.stopPropagation();
		
		Axios({
			method: 'POST',
			url: videoGamesEndpoint,
			headers: {
				'Authorization': 'Bearer ' + sessionStorage.getItem("jwt-token")
			},
			data: this.state
		})
			.then(() => {
				notification.success({
					message: this.state.name + " added!"
				});
				
				this.setState({
					name: '',
					type: '',
					editor: '',
					releaseDate: '',
					resume: ''
				});
				
				this.props.onSubmitSuccess();
			})
			.catch(error => {
				notification.error({
					message: "Unable to add " + this.state.name
				});
			});
	};
	
	render() {
		return (
			<Form onSubmit={this.handleFormSubmission}>
				<FormGroup>
					<label htmlFor="name">🎮 Name</label>
					<FormInput type="text" id="name" name="name" placeholder="Name of the video-game" required
					           value={this.state.name}
					           onChange={this.handleInputChange}
					/>
				</FormGroup>
				
				<FormGroup>
					<label htmlFor="type">🏷️ Type</label>
					<FormInput type="text" id="type" name="type" placeholder="Type of the video-game" required
					           value={this.state.type}
					           onChange={this.handleInputChange}
					/>
				</FormGroup>
				
				<FormGroup>
					<label htmlFor="editor">🏢️ Editor</label>
					<FormInput type="text" id="editor" name="editor" placeholder="Editor of the video-game" required
					           value={this.state.editor}
					           onChange={this.handleInputChange} />
				</FormGroup>
				
				<FormGroup>
					<label htmlFor="release-date">📅 Release date</label><br />
					<DatePicker.MonthPicker onChange={this.handleReleaseDateChange} mode="year" value={this.state.releaseDate ? moment(this.state.releaseDate) : null} />
				</FormGroup>
				
				<FormGroup>
					<label htmlFor="resume">📝 Resume</label>
					<FormTextarea onChange={this.handleResumeChange} placeholder="Short synopsis of the game" value={this.state.resume} />
				</FormGroup>
				
				<Button type="submit" theme="primary" block>
					Add a video-game
				</Button>
			</Form>
		);
	}
}
