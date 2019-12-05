import React from "react";
import {Modal, DatePicker, notification} from "antd";
import {Form, FormInput, FormGroup, FormTextarea, Button} from 'shards-react';

import Axios from 'axios';

import {videoGamesEndpoint} from "../uris";
import moment from "moment";

export default class UpdateVideoGameModal extends React.PureComponent {
	render() {
		return (
			<Modal
				footer={null}
				centered
				visible={this.props.visible}
				onCancel={() => this.props.onClose(false)}
				title="Update a video game"
			>
				<UpdateVideoGameForm item={this.props.item} onSubmitSuccess={() => this.props.onClose(true)} />
			</Modal>
		);
	}
}

class UpdateVideoGameForm extends React.PureComponent {
	state = {
		name: this.props.item.name,
		type: this.props.item.type,
		editor: this.props.item.editor,
		releaseDate: moment(this.props.item.releaseDate),
		resume: this.props.item.resume
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
			method: 'PUT',
			url: videoGamesEndpoint + "/" + this.props.item.videoGameId,
			headers: {
				'Authorization': 'Bearer ' + sessionStorage.getItem("jwt-token")
			},
			data: this.state
		})
			.then((response) => {
				notification.success({
					message: this.state.name + " updated!"
				});
				
				this.props.onSubmitSuccess();
			})
			.catch(error => {
				notification.error({
					message: "Unable to update " + this.state.name
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
					Update the video-game
				</Button>
			</Form>
		);
	}
}
