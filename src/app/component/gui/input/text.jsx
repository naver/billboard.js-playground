import React, { PropTypes } from "react";
import * as _ from "lodash";
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from "react-redux";
import { updateGui, resetGui } from "../../../actions";
import {red600, green200, blue300, blue500, grey100, grey900, grey400, lightBlue100, lightBlue300} from 'material-ui/styles/colors';
import ConnectedRadio from "./radio";

const underlineFocusStyle = {
	borderColor: lightBlue300
};

const textFieldStyle = {
	width: "100%",
	display: "inline-block"
};

class InputText extends React.Component {
	getTextToRadio() {
		return (<ConnectedRadio {...this.props} />);
	}

	getDefaultTextArea(options) {
		return (<MuiThemeProvider muiTheme={getMuiTheme()}>
			<TextField
				name={this.props.name}
				onChange={(e, v) => this.props.onChangeText(e, v)}
				underlineFocusStyle={underlineFocusStyle}
				style={textFieldStyle}
				fullWidth={true}
				{...options} />
		</MuiThemeProvider>);
	}

	render() {
		const { value, valueoptions } = this.props;
		let returnValue;

		if (valueoptions) {
			returnValue = this.getTextToRadio();
		} else if (value === undefined || value === "undefined") {
			returnValue = this.getDefaultTextArea({
				hintText: "undefined",
				value: ""
			});
		} else {
			returnValue = this.getDefaultTextArea({
				inputStyle: {
					color: this.props.activated ? grey900 : grey400
				},
				hintText: "undefined",
				value
			});
		}

		return returnValue;
	}
}

InputText.propTypes = {
	onChangeText: PropTypes.func,
	value: PropTypes.string,
	valueoptions: PropTypes.array
};


const mapDispatchToProps = (dispatch, ownProps) => ({
	onChangeText: (e, value) => {
		if (value === "") {
			dispatch(resetGui(ownProps.name.replace(/\:/g, "."), {
				root: ownProps.rootMemberName
			}));
		} else {
			(dispatch(updateGui(ownProps.name.replace(/\:/g, "."), {
				value,
				root: ownProps.rootMemberName
			})));
		}
	}
});


const ConnectedText = connect(
	null, mapDispatchToProps
)(InputText);

export default ConnectedText;
