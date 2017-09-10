import React from "react";
import { connect } from "react-redux";
import FontIcon from 'material-ui/FontIcon';
import ContentClear from 'material-ui/svg-icons/content/clear';
import {yellow200, deepOrange500, deepOrange50, yellow500, red600, greenA200} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Clear from "./icon/clear";
import ActionInfo from 'material-ui/svg-icons/action/info';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';
import Slider from 'material-ui/Slider';


import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
	FilteredCheckbox,
	Text,
	Number,
} from "./input/index";
import {
	resetGui, changeGuiActivate
} from "../../actions";


class InputProperty extends React.Component {
	componentWillMount() {
		this.setState(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(nextProps);
	}

	getName() {
		return (<div style={{
						display : "inline-block",
						verticalAlign : "middle",
						width  : "45%"
					}}>
			<div style={{display : "inline-block", "width" : "100%"}}>
				<span className="property_name">{this.state.name}</span>
			</div>
		</div>);
	}

	getInput(type) {
		return (<div style={{
						display: "inline-block",
						verticalAlign: "middle",
						width: "45%"
					}}>
			<div style={{ display: "inline-block", "width": "100%" }}>
				{InputProperty.getInputType(type, this.state)}
			</div>
		</div>)
	}

	getClear() {
		return (<div style={{
					display: "inline-block",
					verticalAlign: "middle",
					width: "10%"
				}}>
					<div style={{
						display: "inline-block",
						width: "100%",
						textAlign: "right"
					}}>
					<Clear {...this.state}/>
				</div>
			</div>);
	}

	render() {
		const option = this.state;
		const type = option.type ? option.type.names.join(", ") : "";

		const title = this.getName();
		const input = this.getInput(type);
		const clear = this.getClear();

		return  (<MuiThemeProvider muiTheme={getMuiTheme()}>
			<ListItem
				style={{ width: "100%" }}
				nestedLevel={this.state.level}
				children={[title, input, clear]}
			/>
		</MuiThemeProvider>);
	}
	onChangeActive(e) {
		this.props.onChangeActive(e);
	}

	onClickDelete(e) {
		this.props.onClickDelete(e);
	}

	static getInputType(type, option) {

		switch (type.toLocaleLowerCase()) {
			case "boolean" :
				return <FilteredCheckbox {...option} />;
			case "string" :
				return <Text {...option} />;
			case "number" :
				return <Number {...option} />;
			default :
				return "";
		}
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onChangeActive: e => dispatch(changeGuiActivate(ownProps.name.replace(/\:/g, "."), e.target.checked)),
	onClickDelete: () => dispatch(resetGui(ownProps.name.replace(/\:/g, ".")))
});

const Property = connect(
	null, mapDispatchToProps
)(InputProperty);

export default Property;
