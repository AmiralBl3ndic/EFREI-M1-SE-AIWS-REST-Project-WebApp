import React from "react";
import {Modal, DatePicker, notification} from "antd";
import {Form, FormInput, FormGroup, FormTextarea, Button} from 'shards-react';

import Axios from 'axios';

import {dvdsEndpoint} from "../uris";
import moment from "moment";

export default class UpdateDVDModal extends React.PureComponent {
	render() {
		return (
			<Modal
				footer={null}
				centered
				visible={this.props.visible}
				onCancel={() => this.props.onClose(false)}
				title="Update a DVD"
			>
				<UpdateDVDForm item={this.props.item} onSubmitSuccess={() => this.props.onClose(true)} />
			</Modal>
		);
	}
}

class UpdateDVDForm extends React.PureComponent {
	state = {
		title: this.props.item.title,
		duration: this.props.item.duration,
		ageLimit: this.props.item.ageLimit,
		audio: this.props.item.audio,
		type: this.props.item.type,
		editor: this.props.item.editor,
		releaseDate: moment(this.props.item.releaseDate),
		description: this.props.item.description
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
			description: e.target.value
		});
	};
	
	handleFormSubmission = e => {
		e.preventDefault();
		e.stopPropagation();
		
		Axios({
			method: 'PUT',
			url: dvdsEndpoint + "/" + this.props.item.dvdId,
			headers: {
				'Authorization': 'Bearer ' + sessionStorage.getItem("jwt-token")
			},
			data: this.state
		})
			.then((response) => {
				notification.success({
					message: this.state.title + " updated!"
				});
				
				this.props.onSubmitSuccess();
			})
			.catch(error => {
				notification.error({
					message: "Unable to update " + this.state.title
				});
			});
	};
	
	render() {
		return (
			<Form onSubmit={this.handleFormSubmission}>
				<FormGroup>
					<label htmlFor="title">🍿 Title</label>
					<FormInput type="text" id="title" name="title" placeholder="Title of the DVD" required
					           value={this.state.title}
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
					<label htmlFor="release-date">📅 Release date</label><br />
					<DatePicker.MonthPicker onChange={this.handleReleaseDateChange} mode="year" value={this.state.releaseDate ? moment(this.state.releaseDate) : null} />
				</FormGroup>
				
				<FormGroup>
					<label htmlFor="duration">⌚︎ Duration</label>
					<FormInput type="number" id="duration" name="duration" required
					           value={this.state.duration}
					           onChange={this.handleInputChange}
					/>
				</FormGroup>
				
				<FormGroup>
					<label htmlFor="age-limit">🔞 Age limit</label>
					<FormInput type="number" id="age-limit" name="ageLimit" required
					           value={this.state.ageLimit}
					           onChange={this.handleInputChange}
					/>
				</FormGroup>
				
				<FormGroup>
					<label htmlFor="description">📝 Description</label>
					<FormTextarea onChange={this.handleResumeChange} placeholder="Short synopsis of the DVD" value={this.state.description} />
				</FormGroup>
				
				<FormGroup>
					<label htmlFor="editor">🏢️ Editor</label>
					<FormInput type="text" id="editor" name="editor" placeholder="Editor of the DVD" required
					           value={this.state.editor}
					           onChange={this.handleInputChange} />
				</FormGroup>
				
				<FormGroup>
					<label htmlFor="audio">🔊 Audio</label>
					<FormInput type="text" id="audio" name="audio" placeholder="Editor of the DVD" required
					           value={this.state.audio}
					           onChange={this.handleInputChange} />
				</FormGroup>
				
				<Button type="submit" theme="primary" block>
					Update the DVD
				</Button>
			</Form>
		);
	}
}
