import React from "react";
import {Modal, DatePicker, notification} from "antd";
import {Form, FormInput, FormGroup, FormTextarea, Button} from 'shards-react';

import Axios from 'axios';

import {booksEndpoint} from "../uris";
import moment from "moment";

export default class AddBookModal extends React.PureComponent {
	render() {
		return (
			<Modal
				footer={null}
				centered
				visible={this.props.visible}
				onCancel={() => this.props.onClose(false)}
				title="Add a video game"
			>
				<AddBookForm onSubmitSuccess={() => this.props.onClose(true)} />
			</Modal>
		);
	}
}

class AddBookForm extends React.PureComponent {
	state = {
		author: '',
		title: '',
		type: '',
		editor: '',
		releaseDate: '',
		description: ''
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
			method: 'POST',
			url: booksEndpoint,
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
					author: '',
					title: '',
					type: '',
					editor: '',
					releaseDate: '',
					description: ''
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
					<label htmlFor="title">🎮 Title</label>
					<FormInput type="text" id="title" name="title" placeholder="Title of the book" required
					           value={this.state.title}
					           onChange={this.handleInputChange}
					/>
				</FormGroup>
				
				<FormGroup>
					<label htmlFor="author">✎ Author</label>
					<FormInput type="text" id="author" name="author" placeholder="Author of the book" required
					           value={this.state.author}
					           onChange={this.handleInputChange}
					/>
				</FormGroup>
				
				<FormGroup>
					<label htmlFor="type">🏷️ Type</label>
					<FormInput type="text" id="type" name="type" placeholder="Type of the book" required
					           value={this.state.type}
					           onChange={this.handleInputChange}
					/>
				</FormGroup>
				
				<FormGroup>
					<label htmlFor="editor">🏢️ Editor</label>
					<FormInput type="text" id="editor" name="editor" placeholder="Editor of the book" required
					           value={this.state.editor}
					           onChange={this.handleInputChange} />
				</FormGroup>
				
				<FormGroup>
					<label htmlFor="release-date">📅 Release date</label><br />
					<DatePicker.MonthPicker onChange={this.handleReleaseDateChange} mode="year" value={this.state.releaseDate ? moment(this.state.releaseDate) : null} />
				</FormGroup>
				
				<FormGroup>
					<label htmlFor="description">📝 Description</label>
					<FormTextarea onChange={this.handleResumeChange} placeholder="Short synopsis of the book" value={this.state.description} />
				</FormGroup>
				
				<Button type="submit" theme="primary" block>
					Add a book
				</Button>
			</Form>
		);
	}
}
