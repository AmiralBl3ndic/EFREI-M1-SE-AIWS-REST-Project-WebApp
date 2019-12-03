import React from "react";

import {Collapse, Descriptions, Empty, Spin, Icon, notification, Modal as AntModal, PageHeader} from 'antd';
import {Button, Container} from "shards-react";

import {booksEndpoint} from "../uris";
import Axios from "axios";
import UpdateBookModal from "./UpdateBookModal";
import AddBookModal from "./AddBookModal";

const baseGETRequest = {
	method: 'GET',
	url: booksEndpoint,
	params: {
		limit: null,
		start: null,
		author: null,
		city: null,
		keywords: null
	},
	headers: {}
};


export default class BooksHolder extends React.Component {
	state = {
		showAddRecordModal: false,
		showUpdateRecordModal: false,
		fetchingData: true,
		books: [],
		toUpdate: null,
	};
	
	updateBooksList = () => {
		this.setState({fetchingData: true, books: []});
		
		Axios(baseGETRequest)
			.then(response => {
				this.setState({
					fetchingData: false,
					books: response.data.items
				});
			})
			.catch(error =>{
				this.setState({fetchingData: false});
				
				// If internal server error
				if (/^5\d\d$/.test(error.response.status + "")) {
					notification.warning({
						message: "Remote server error",
						description: "Unable to fetch records from server"
					});
				} else {
					notification.error({
						message: "Cannot fetch records from server",
						description: error.response.data.error
					});
				}
			});
	};
	
	componentDidMount = () => {
		this.updateBooksList();
	};
	
	render() {
		return (
			<React.Fragment>
				<Container>
					<CustomPageHeader
						handleAddRecordClick={() => this.setState({showAddRecordModal: true})}
					/>
					<BooksList
						loading={this.state.fetchingData}
						items={this.state.books}
						onListChange={this.updateBooksList}
						onAskUpdate={item => this.setState({showUpdateRecordModal: true, toUpdate: item})}
					/>
				</Container>
				
				<AddBookModal visible={this.state.showAddRecordModal} onClose={(success) => {
					this.setState({showAddRecordModal: false});
					if (success) {
						this.updateBooksList();
					}
				}} />
				
				<UpdateBookModal item={this.state.toUpdate} visible={this.state.showUpdateRecordModal} onClose={(success) => {
					this.setState({showUpdateRecordModal: false});
					if (success) {
						this.updateBooksList();
					}
				}}
				/>
			</React.Fragment>
		);
	}
}

const BooksList = (props) => {
	if (props.loading) {
		return (
			<Container className="text-center">
				<Spin />
			</Container>
		);
	}
	
	if (props.items.length === 0) {
		return <Empty description="No books records found" />
	}
	
	return (
		<React.Fragment>
			<Collapse bordered={false}>
				{props.items.map(item => (
					<Collapse.Panel header={item.title} key={item.bookId} extra={buildExtras(item, props.onListChange, props.onAskUpdate)}>
						<React.Fragment>
							<Descriptions>
								<Descriptions.Item label="Author">{item.author}</Descriptions.Item>
								<Descriptions.Item label="Release-Date">{item.releaseDate}</Descriptions.Item>
								<Descriptions.Item label="Type">{item.type}</Descriptions.Item>
								<Descriptions.Item label="Editor">{item.editor}</Descriptions.Item>
							</Descriptions>
							<p>
								{item.description}
							</p>
						</React.Fragment>
					</Collapse.Panel>
				))}
			</Collapse>
		</React.Fragment>
	);
};


const CustomPageHeader = (props) => (
	<PageHeader
		title="Books"
		ghost={false}
		extra={[
			<Button key="add-book-button" theme="info" pill onClick={props.handleAddRecordClick}>
				Add a book
			</Button>
		]}
	/>
);


const buildExtras = (item, onDelete, onAskUpdate) => {
	const userId = JSON.parse(atob(sessionStorage.getItem("jwt-token").split('.')[1])).dbId;
	
	const handleDeleteClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		
		AntModal.confirm({
			title: "Do you want to delete " + item.title + "?",
			description: "This action cannot be undone",
			onOk() {
				Axios({
					method: "DELETE",
					url: booksEndpoint + "/" + item.bookId,
					headers: {
						'Authorization': 'Bearer ' + sessionStorage.getItem("jwt-token")
					}
				})
					.then(() => {
						notification.success({
							message: "Deletion complete",
							description: `${item.name} deleted`
						});
						onDelete();
					})
					.catch(() => {
						notification.error({
							message: "Cannot delete record",
							description: "An error occurred, unable to delete " + item.name
						});
					});
			}
		});
	};
	
	const handleUpdateClick = e => {
		e.preventDefault();
		e.stopPropagation();
		
		onAskUpdate(item);
	};
	
	if (item.userId === userId) {
		return (
			<React.Fragment>
				<Icon
					type="edit"
					className="text-info"
					onClick={handleUpdateClick}
				/>
				<Icon
					type="delete"
					className="text-danger ml-4"
					onClick={handleDeleteClick}
				/>
			</React.Fragment>
		);
	}
	
	return (<React.Fragment />);
};
