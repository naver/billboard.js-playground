import React, { PropTypes } from "react";
import { ListItem } from "material-ui/List";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { deepOrange300 } from "material-ui/styles/colors";
import * as _ from "lodash";
import Property from "./property";

class Member extends React.Component {
	componentWillMount() {
		this.setState(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(nextProps);
	}

	shouldComponentUpdate(nextProps) {
		const roots = nextProps.lastUpdateRoot || [];

		if (roots.indexOf(this.props.attributes.name) > -1) {
			return true;
		}
		return false;
	}

	child(properties) {
		let items = [];

		_.map(properties, (option) => {
			if (option.properties) {
				items = items.concat(this.child(option.properties));
			} else if (option.attributes.type) {
				const name = option.attributes.type.names;

				if (name.indexOf("Array") > -1) {
						// items.push(<Property
						//	style={{display : "none"}}
						//	key={option.attributes.name}
						//	rootMemberName={this.state.attributes.name}
						//	{...option.attributes} level={1}
						// />);
				} else if (name.indexOf("Object") > -1) {
						// console.log(option.attributes.name);
						// console.log(option.attributes.defaultvalue);
						// console.log(option.attributes.examples);
				} else {
					items.push(<Property
						key={option.attributes.name}
						rootMemberName={this.state.attributes.name}
						level={1}
						{...option.attributes}
					/>);
				}
			}
		});

		return items;
	}

	render() {
		const member = this.props.attributes;
		const properties = this.props.properties;

		return (<MuiThemeProvider muiTheme={getMuiTheme()}>
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
				initiallyOpen
				className="member"
				primaryText={member.name}
				nestedItems={this.child(properties)}
			/>
		</MuiThemeProvider>);
	}
}

export default Member;
