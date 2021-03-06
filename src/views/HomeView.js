import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import {Card, CardBody, Button as ShardsButton} from "shards-react";
import {Tabs, Affix} from 'antd';
import { FaPowerOff } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import AccountSettingsModal from "../components/AccountSettingsModal";
import {AuthenticationContext} from "../context/AuthenticationProvider";
import VideoGamesHolder from "../components/VideoGamesHolder";
import BooksHolder from "../components/BooksHolder";
import DVDsHolder from "../components/DVDsHolder";

export default class HomeView extends React.Component {
	state = {
		activeTabKey: "books",
		showAccountSettingsModal: false
	};

	render() {
		return (
			<React.Fragment>
				<Container className="h-100 w-100 py-2">
					<Row className="h-100" noGutters>
						<Card className="col-12">
							<CardBody className="pt-3">
								<AuthenticationContext.Consumer>
									{authenticationContext => (
										<Affix offsetTop="10">
											<Header
												onAccountSettingsClick={() => this.setState({showAccountSettingsModal: true})}
												onLogoutClick={() => authenticationContext.deleteToken()}
											/>
										</Affix>
									)}
								</AuthenticationContext.Consumer>

								<TabsRow
									activeKey={this.state.activeTabKey}
									onTabChange={key => this.setState({activeTabKey: key})}
								/>

								<TabsContent activeTabKey={this.state.activeTabKey} className="bg-primary" />
							</CardBody>
						</Card>
					</Row>
				</Container>

				<AccountSettingsModal visible={this.state.showAccountSettingsModal}  onClose={() => this.setState({showAccountSettingsModal: false})}/>
			</React.Fragment>
		);
	}
}

const Header = (props) => (
	<Row className="justify-content-between mt-0">
		<ShardsButton theme="primary" className="power-off-button align-middle" size="sm" pill onClick={props.onAccountSettingsClick}>
			<span className="align-top">
				<MdAccountCircle className="" />
				<span className="align-top">
					&nbsp;&nbsp;My Account
				</span>
			</span>
		</ShardsButton>

		<ShardsButton theme="danger" className="power-off-button align-middle" size="sm" outline pill onClick={props.onLogoutClick}>
			<span className="align-middle">
			<FaPowerOff className="mb-1" />
			</span>
		</ShardsButton>
	</Row>
);

const TabsRow = (props) => (
	<Tabs defaultActiveKey={props.activeKey} onChange={props.onTabChange}>
		<Tabs.TabPane
			key="books"
      tab={
        <span>
					Books
				</span>
      }
		/>
		<Tabs.TabPane
			key="dvds"
      tab={
        <span>
					DVDs
				</span>
      }
		/>
		<Tabs.TabPane
			key="videogames"
      tab={
        <span>
					Video-games
				</span>
      }
		/>
	</Tabs>
);


const TabsContent = (props) => {
	const tabs = {
		books: <BooksHolder />,
		dvds: <DVDsHolder />,
		videogames: <VideoGamesHolder />
	};

	return tabs[props.activeTabKey]
};
