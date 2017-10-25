import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import { Command } from "../command";
import { Data } from "../data";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import  {grey100, grey400, deepOrange300} from "material-ui/styles/colors";

class TabViews extends React.Component {
	componentWillMount(props) {
		this.setState({
			target: "command",
		});
	}

	render(){
		return (<div className="tabviews">
			<MuiThemeProvider muiTheme={getMuiTheme({
				tabs: {
					  backgroundColor: grey100,
					  textColor: grey400,
					  selectedTextColor: deepOrange300
					}
				})}>
				<Tabs
					inkBarStyle={{
						backgroundColor: deepOrange300
					}}
					value={this.state.target}
					onChange={(e) => this.onChangeTab(e)}>
					<Tab label="Text Editor" value="command">
						<Command />
					</Tab>
					<Tab label="Data Table" value="data">
						<Data />
					</Tab>
				</Tabs>
			</MuiThemeProvider>
		</div>);
	}

	onChangeTab(target) {
		this.setState({
			target
		});
	}
}

export {
	TabViews
}
export default TabViews;
