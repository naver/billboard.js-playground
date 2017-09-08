import React, { PropTypes } from "react";
import { connect } from "react-redux";
import Slider from 'material-ui/Slider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Badge from 'material-ui/Badge';

import {
	updateGui, resetGui
} from "../../../actions";
import {
	deepCopy
} from "../../../util";

class InputNumber extends React.Component {
	render() {
		const props = deepCopy({}, this.props);
		const value = props.value;
		let returnValue;

		if (isNaN(value)) {
			returnValue = (
				<MuiThemeProvider muiTheme={getMuiTheme()}>
					<div>
						<Slider
							sliderStyle={{padding : 0, margin:0}}
							style={{width:"60%", display:"inline-block"}}
							{...props}
						/>
												<span className="number_guide"
													  style={{width:"40%", display:"inline-block"}}
												>{props.defaultvalue}</span>

					</div>
				</MuiThemeProvider>
			)
		} else {
			//<input type="number" value={value} onChange={onChange} />
			props.value = props.value*1;
			returnValue = (
				<MuiThemeProvider muiTheme={getMuiTheme()}>
					<div>
						<Slider
							sliderStyle={{padding : 0, margin:0}}
							style={{width:"60%", display:"inline-block"}}
							{...props}
						/>
												<span className="number_guide"
													  style={{width:"40%", display:"inline-block"}}
												>{props.value}</span>

					</div>
				</MuiThemeProvider>
			);
		}
		return returnValue;
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onChange: (e, value) => {
		if(value === ""){
			dispatch(resetGui(ownProps.name.replace(/\:/g, ".")));
		} else {
			dispatch(updateGui(ownProps.name.replace(/\:/g, "."), value*1));
		}
	}
});

const Number = connect(
	null, mapDispatchToProps
)(InputNumber);

export default Number;
