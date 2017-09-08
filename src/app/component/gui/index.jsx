import React, { PropTypes } from "react";
import _ from "underscore";
import { connect } from "react-redux";
import Property from "./property";
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {yellow200, deepOrange500, grey900, grey50, grey200, yellow500, red600, greenA200} from 'material-ui/styles/colors';

class Control extends React.Component {
	componentWillMount() {
		this.setState(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(nextProps);
	}

	child(properties) {
		let number = 0;
		let items = [];

		_.map(properties, (option) => {
			number++;

			if (option.properties) {
				items = items.concat(this.child(option.properties));
			} else {
				items.push(<Property key={option.attributes.name} {...option.attributes} level={1} />);
			}
		});

		return items;
	}

	member(options, key) {
		let hasProperty = [];
		let noneProperty = [];

		_.map(options,  (option, idx) => {
			if(option.kind === "member"){
				const member = option.attributes;
				const properties = option.properties;

				if(properties){
					hasProperty.push(<MuiThemeProvider muiTheme={getMuiTheme()} key={key}>
						<ListItem
							innerDivStyle={{
								"font-family": 'Bungee',
								"background" : deepOrange500,
								"color" : grey50,
								"font-size": "25px"
							}}
							style={{

							}}
							className="member"
							primaryText={member.name}
							initiallyOpen={true}
							nestedItems={this.child(properties, idx)}
						/>
					</MuiThemeProvider>);
				} else {
					noneProperty.push(<Property key={option.attributes.name} {...option.attributes} level={0} />);
				}
			}
		});

		return _.map(noneProperty.concat(hasProperty), (pp) => (pp));
	}

	render() {
		const rendered = this.member(this.state);
		return (<div className="inputConfigure">
			<div className="scroll">
				{rendered}
			</div>
		</div>);
	}
}

const mapStateToProps = (state) => {
	return state.gui;
};

const GUI = connect(mapStateToProps)(Control);

export {
	GUI,
};
export default GUI;
