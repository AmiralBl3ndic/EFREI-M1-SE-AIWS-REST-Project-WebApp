import React from "react";
import {Modal, DatePicker, notification} from "antd";
import {Form, FormInput, FormGroup, FormTextarea, Button} from 'shards-react';

import Axios from 'axios';

import {booksEndpoint, videoGamesEndpoint} from "../uris";
import moment from "moment";

export default class UpdateBookModal extends React.PureComponent {
	render() {
		return (
			<Modal
				footer={null}
				centered
				visible={this.props.visible}
				onCancel={() => this.props.onClose(false)}
				title="Update a book"
			>
				<UpdateBookForm item={this.props.item} onSubmitSuccess={() => this.props.onClose(true)} />
			</Modal>
		);
	}
}

class UpdateBookForm extends React.PureComponent {
	state = {
		author: this.props.item.author,
		title: this.props.item.title,
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
			url: booksEndpoint + "/" + this.props.item.bookId,
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
					<label htmlFor="title">🎮 Title</label>
					<FormInput type="text" id="title" name="title" placeholder="Title of the book" required
					           value={this.state.type}
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
					<label htmlFor="resume">📝 Description</label>
					<FormTextarea onChange={this.handleResumeChange} placeholder="Short synopsis of the game" value={this.state.description} />
				</FormGroup>
				
				<Button type="submit" theme="primary" block>
					Update the book
				</Button>
			</Form>
		);
	}
}
