import React, { PropTypes } from "react";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Slider from "material-ui/Slider";
import  * as color from "material-ui/styles/colors";

import {
	updateGui, resetGui
} from "../../../actions";
import {
	deepCopy
} from "../../../util";


const SliderStyleTheme = {
	trackColor: color.grey400,
	trackColorSelected: color.grey400,
	selectionColor: color.lightBlue300,
	handleColorZero: color.grey400,
	handleFillColor: color.grey100,
	rippleColor: color.lightBlue100
};

const SliderStyle = {
	padding: 0,
	margin: 0
};
const Style = {
	width: "60%",
	display: "inline-block"
};
const ValueTextStyle = {
	width: "40%",
	display: "inline-block"
};

class InputNumber extends React.Component {
	render() {
		const props = deepCopy({}, this.props);

		if (isNaN(props.value)) {
			props.value = props.defaultvalue || undefined;
			ValueTextStyle.color = color.grey400;
		} else {
			props.value *= 1;
			ValueTextStyle.color = color.grey900;
		}

		return (<MuiThemeProvider muiTheme={getMuiTheme({ slider: SliderStyleTheme })}>
			<div>
				<Slider
					sliderStyle={SliderStyle}
					style={Style}
					{...props}
				/>
				<span
					className="number_guide"
					style={ValueTextStyle}
				>{props.value}</span>
			</div>
		</MuiThemeProvider>);
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onChange: (e, value) => {
		const name = ownProps.name.replace(/\:/g, ".");
		if (value === "") {
			dispatch(resetGui(name, {
				root: ownProps.rootMemberName
			}));
		} else {
			dispatch(updateGui(name, {
				root: ownProps.rootMemberName,
				value: value * 1
			}));
		}
	}
});

const Number = connect(
	null, mapDispatchToProps
)(InputNumber);

export default Number;
