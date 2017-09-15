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
		const textStyle = deepCopy({}, ValueTextStyle);

		props.min = props.min || 0;
		props.max = props.max || 1;
		textStyle.color = props.activated ? color.grey900 : color.grey400;

		if (isNaN(props.value)) {
			props.value = props.defaultvalue || undefined;

			return (<div>
				<MuiThemeProvider muiTheme={getMuiTheme({ slider: SliderStyleTheme })}>
					<Slider
						axis={"x"}
						required={false}
						sliderStyle={SliderStyle}
						style={Style}
						value={props.min}
						min={props.min}
						max={props.max}
						step={props.step}
						onChange={props.onChange}
					/>
				</MuiThemeProvider>
				<span className="number_guide" style={textStyle}>undefined</span>
			</div>);
		} else {
			props.value *= 1;

			return (<div>
				<MuiThemeProvider muiTheme={getMuiTheme({ slider: SliderStyleTheme })}>
					<Slider
						axis={"x"}
						required={false}
						sliderStyle={SliderStyle}
						style={Style}
						value={props.value}
						min={props.min}
						max={props.max}
						step={props.step}
						onChange={props.onChange}
					/>
				</MuiThemeProvider>
				<span className="number_guide" style={textStyle}>{props.value}</span>
			</div>);
		}


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

const ConnectedNumber = connect(
	null, mapDispatchToProps
)(InputNumber);

export default ConnectedNumber;
