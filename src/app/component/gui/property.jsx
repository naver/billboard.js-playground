import React, { PropTypes } from "react";
import { connect } from "react-redux";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { ListItem } from "material-ui/List";
import FontIcon from "material-ui/FontIcon";
import Clear from "./icon/clear";
import {
	ConnectedCollection,
	ConnectedCheckbox,
	ConnectedNumber,
	ConnectedText,
	ConnectedCode
} from "./input/index";
import {
	resetGui, updateConfigureInfo, showGuideCard
} from "../../actions";
import  * as color from "material-ui/styles/colors";


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
				<div className="property_name">{this.state.name}
					<FontIcon color={color.grey800} onClick={(e) => this.onClickTitle()} className="material-icons property_info">info_outline</FontIcon>
				</div>
				<div className="property_type">{this.state.type.names.join(", ")}</div>
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
		</div>);
	}

	onClickTitle() {
		this.props.onClickTitle(this.state.name);
	}

	getClear() {
		return (<div
				className="property_clear"
				style={{
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
		const className = `property ${(option.activated ? " activated" : "")}`;

		if(this.state.hidegui){
			return <span style={{}}></span>;
		};

		return (<MuiThemeProvider muiTheme={getMuiTheme()}>
			<ListItem
				className={className}
				style={{ width: "100%" }}
				nestedLevel={this.state.level}
				children={[title, input, clear]}
			/>
		</MuiThemeProvider>);
	}

	onClickDelete(e) {
		this.props.onClickDelete(e);
	}

	static getInputType(type, option) {

		switch (type.toLocaleLowerCase()) {
			case "boolean" :
				return <ConnectedCheckbox {...option} />;
			case "string" :
				return <ConnectedText {...option} />;
			case "number" :
				return <ConnectedNumber {...option} />;
			case "array" :
				return <ConnectedCollection {...option} />;
			case "function" :
				return <ConnectedCode {...option} />;
			default :
				return "";
		}
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onClickTitle : (name) => {
		dispatch(updateConfigureInfo(name));
		dispatch(showGuideCard(name));
	},
	onClickDelete: () => {
		dispatch(resetGui(ownProps.name.replace(/\:/g, "."), {
			root: ownProps.rootMemberName
		}))
	}
});

const Property = connect(
	null, mapDispatchToProps
)(InputProperty);

export default Property;
