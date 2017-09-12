import React, { PropTypes } from "react";
import _ from "underscore";
import { connect } from "react-redux";
import Property from "./property";
import Member from "./member";
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {yellow200, deepOrange400,deepOrange500, deepOrange700, grey900, grey50, grey200, yellow500, red600, deepOrange600, greenA200} from 'material-ui/styles/colors';

class Control extends React.Component {
	getMember() {
		const hasProperty = [];
		const noneProperty = [];
		const lastUpdateRoot = this.props.lastUpdateRoot;

		_.map(this.props,  (option) => {
			if (option.kind === "member") {
				const member = option.attributes;
				const properties = option.properties;

				if (properties) {
					hasProperty.push(<Member key={option.attributes.name} {...option} properties={option.properties} lastUpdateRoot={lastUpdateRoot} />);
				} else {
					noneProperty.push(<Property key={option.attributes.name} {...option.attributes} level={0} />);
				}
			}
		});

		return _.map(noneProperty.concat(hasProperty), (pp) => (pp));
	}

	render() {
		return (<div className="inputConfigure">
			<div className="scroll">
				{this.getMember()}
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
