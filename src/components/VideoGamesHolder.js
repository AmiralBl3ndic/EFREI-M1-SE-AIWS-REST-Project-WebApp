import React from "react";

import {Collapse, Descriptions, Empty, Spin, Icon, notification, Modal as AntModal, PageHeader} from 'antd';
import {Button, Container} from "shards-react";

import {videoGamesEndpoint} from "../uris";
import Axios from "axios";
import AddVideoGameModal from "./AddVideoGameModal";

const baseGETRequest = {
	method: 'GET',
	url: videoGamesEndpoint,
	params: {
		limit: null,
		start: null,
		author: null,
		city: null,
		keywords: null
	},
	headers: {}
};


export default class VideoGamesHolder extends React.Component {
	state = {
		showAddRecordModal: false,
		fetchingData: true,
		videoGames: []
	};
	
	updateVideoGamesList = () => {
		this.setState({fetchingData: true, videoGames: []});
		
		Axios(baseGETRequest)
			.then(response => {
				this.setState({
					fetchingData: false,
					videoGames: response.data.items
				});
			})
			.catch(error =>{
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
		this.updateVideoGamesList();
	};
	
	render() {
		return (
			<React.Fragment>
				<Container>
					<CustomPageHeader
						handleAddRecordClick={() => this.setState({showAddRecordModal: true})}
					/>
					<VideoGamesList
						loading={this.state.fetchingData}
						items={this.state.videoGames}
						onListChange={this.updateVideoGamesList}
					/>
				</Container>
				
				<AddVideoGameModal visible={this.state.showAddRecordModal} onClose={(success) => {
					this.setState({showAddRecordModal: false});
					if (success) {
						this.updateVideoGamesList();
					}
				}} />
			</React.Fragment>
		);
	}
}

const VideoGamesList = (props) => {
	if (props.loading) {
		return (
			<Container className="text-center">
				<Spin />
			</Container>
		);
	}
	
	if (props.items.length === 0) {
		return <Empty description="No video-games records found" />
	}
	
	return (
		<React.Fragment>
			<Collapse bordered={false}>
				{props.items.map(item => (
					<Collapse.Panel header={item.name} key={item.videoGameId} extra={genIconIfCanDelete(item, props.onListChange)}>
						<React.Fragment>
							<Descriptions>
								<Descriptions.Item label="Release date">{item.releaseDate}</Descriptions.Item>
								<Descriptions.Item label="Editor">{item.editor}</Descriptions.Item>
								<Descriptions.Item label="Type">{item.type}</Descriptions.Item>
							</Descriptions>
							<p>
								{item.resume}
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
		title="Video-games"
		ghost={false}
		extra={[
			<Button theme="info" pill onClick={props.handleAddRecordClick}>
				Add a video-game
			</Button>
		]}
	/>
);


const genIconIfCanDelete = (item, onDelete) => {
	const userId = JSON.parse(atob(sessionStorage.getItem("jwt-token").split('.')[1])).dbId;
	
	const handleDeleteClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		
		AntModal.confirm({
			title: "Do you want to delete " + item.name + "?",
			description: "This action cannot be undone",
			onOk() {
				Axios({
					method: "DELETE",
					url: videoGamesEndpoint + "/" + item.videoGameId,
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
	
	if (item.userId === userId) {
		return (
			<Icon
				type="delete"
				className="text-danger"
				onClick={handleDeleteClick}
			/>);
	}
	
	return (<React.Fragment />);
};
