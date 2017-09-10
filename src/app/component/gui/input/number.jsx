import React, { PropTypes } from "react";
import { connect } from "react-redux";
import Slider from 'material-ui/Slider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import  * as color from 'material-ui/styles/colors';
import mui from 'material-ui';

import {
	updateGui, resetGui
} from "../../../actions";
import {
	deepCopy
} from "../../../util";


class InputNumber extends React.Component {
	render() {
		const props = deepCopy({}, this.props);
		let value = props.value;
		let sliderStyle = {padding : 0, margin:0};
		let style = {
			width:"60%", display:"inline-block"
		};
		let valueStyle = {width:"40%", display:"inline-block"};

		if (isNaN(value)) {
			props.value = props.defaultvalue || undefined;
			valueStyle = deepCopy(valueStyle, {
				color: color.grey400
			});
		} else {
			//<input type="number" value={value} onChange={onChange} />
			props.value = value*1;
			valueStyle = deepCopy(valueStyle, {
				color: color.grey900
			});
		}

		return (<MuiThemeProvider muiTheme={getMuiTheme({
			slider: {
				  trackColor: color.grey400,
				  trackColorSelected: color.grey400,
				  selectionColor: color.lightBlue300,
				  handleColorZero: color.grey400,
				  handleFillColor: color.grey100,
				  rippleColor: color.lightBlue100
				}
			})}>
			<div>
				<Slider
					sliderStyle={sliderStyle}
					style={style}
					{...props}
				/>
				<span className="number_guide"
					  style={valueStyle}
				>{value}</span>
			</div>
		</MuiThemeProvider>);
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onChange: (e, value) => {
		if(value === ""){
			dispatch(resetGui(ownProps.name.replace(/\:/g, "."), {
				root: ownProps.rootMemberName
			}));
		} else {
			dispatch(updateGui(ownProps.name.replace(/\:/g, "."), {
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
