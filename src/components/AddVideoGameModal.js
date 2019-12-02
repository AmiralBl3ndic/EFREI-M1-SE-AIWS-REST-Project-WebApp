import React from "react";
import {Modal, DatePicker} from "antd";
import {Form, FormInput, FormGroup, InputGroupAddon, InputGroupText, InputGroup} from 'shards-react';

export default class AddVideoGameModal extends React.PureComponent {
	render() {
		return (
			<Modal
				footer={null}
				centered
				visible={this.props.visible}
				onCancel={this.props.onClose}
				title="Add a video game"
			>
			
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
	
	render() {
		//   📝
		
		return (
			<Form>
				<FormGroup>
					<label htmlFor="name">Name</label>
					<InputGroup seamless>
						<InputGroupAddon type="prepend">
							<InputGroupText>🎮</InputGroupText>
						</InputGroupAddon>
						<FormInput type="text" id="name" name="name" placeholder="Name of the video-game" required
						           onChange={this.handleInputChange}
						/>
					</InputGroup>
				</FormGroup>
				
				<FormGroup>
					<label htmlFor="type">Type</label>
					<InputGroup seamless>
						<InputGroupAddon type="prepend">
							<InputGroupText>🏷️</InputGroupText>
						</InputGroupAddon>
						<FormInput type="text" id="type" name="type" placeholder="Type of the video-game" required
						           onChange={this.handleInputChange}
						/>
					</InputGroup>
				</FormGroup>
				
				<FormGroup>
					<label htmlFor="editor">Editor</label>
					<InputGroup seamless>
						<InputGroupAddon type="prepend">
							<InputGroupText>🏢️</InputGroupText>
						</InputGroupAddon>
						<FormInput type="text" id="editor" name="editr" placeholder="Editor of the video-game" required
						           onChange={this.handleInputChange}
						/>
					</InputGroup>
				</FormGroup>
				
				<FormGroup>
					<label htmlFor="release-date">📅 Release date</label>
					<InputGroup seamless>
						<DatePicker onChange={(date, dateString) => console.log("Date:", date, " | Date string:", dateString)} />
					</InputGroup>
				</FormGroup>
			</Form>
		);
	}
}
