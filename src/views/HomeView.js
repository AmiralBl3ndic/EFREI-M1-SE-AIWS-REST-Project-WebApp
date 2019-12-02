import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import {Card, CardBody, Button as ShardsButton} from "shards-react";
import {Tabs} from 'antd';
import { FaPowerOff } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import AccountSettingsModal from "../components/AccountSettingsModal";
import {AuthenticationContext} from "../context/AuthenticationProvider";

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
										<Header
											onAccountSettingsClick={() => this.setState({showAccountSettingsModal: true})}
											onLogoutClick={() => authenticationContext.deleteToken()}
										/>
									)}
								</AuthenticationContext.Consumer>

								<TabsRow
									activeKey={this.state.activeTabKey}
									onTabChange={key => this.setState({activeTabKey: key})}
								/>

								<TabsContent activeTabKey={this.state.activeTabKey} />
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
		books: <h1>Books</h1>,
		dvds: <h1>DVDs</h1>,
		videogames: <h1>Video-games</h1>
	};

	return tabs[props.activeTabKey]
};
