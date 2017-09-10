import React, { PropTypes } from "react";
import _ from "underscore";
import { connect } from "react-redux";
import Property from "./property";
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {yellow200, deepOrange200, deepOrange300, deepOrange400,deepOrange500, deepOrange700, grey900, grey50, grey200, yellow500, red600, deepOrange600, greenA200} from 'material-ui/styles/colors';

class Member extends React.Component {
	componentWillMount() {
		this.setState(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(nextProps);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(this.props.attributes.name === nextProps.lastUpdateRoot){
			return true;
		} else {
			return false;
		}
	}

	child(properties) {
		let number = 0;
		let items = [];

		_.map(properties, (option) => {
			number++;

			if (option.properties) {
				items = items.concat(this.child(option.properties));
			} else {
				items.push(<Property
					key={option.attributes.name}
					rootMemberName={this.state.attributes.name}
					{...option.attributes} level={1}
				/>);
			}
		});

		return items;
	}

	render() {
		const member = this.props.attributes;
		const properties = this.props.properties;

		return <MuiThemeProvider muiTheme={getMuiTheme()}>
			<ListItem
				style={{
				}}
				innerDivStyle={{
					fontFamily: "Bungee",
					color: deepOrange300,
					fontSize: "25px",
					borderBottomWidth: "2px",
					borderBottomColor: `${deepOrange300}`
				}}
				className="member"
				primaryText={member.name}
				initiallyOpen={true}
				nestedItems={this.child(properties)}
			/>
		</MuiThemeProvider>;
	}
}

export default Member;
