import React, { PropTypes } from "react";
import { connect } from "react-redux";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {red600, green200, blue300, blue500, grey100, grey400, lightBlue100, lightBlue300} from 'material-ui/styles/colors';
import { updateGui, resetGui } from "../../../actions";

const iconSelect = {
	fill: lightBlue300,
};

const icon = {
	fill: grey400
};

const labelSelect = {
	fontSize : "14px"
}

const label = {
	fontSize : "14px",
	color: grey400
}

class InputRadio extends React.Component {
	render() {
		const { valueoptions, name, value, onChangeRadio } = this.props;

		return <MuiThemeProvider>
			<RadioButtonGroup name={name} valueSelected={value} onChange={onChangeRadio}>
				{_.map(valueoptions, (v, i) => {
					const iconStyle = value === v ? iconSelect : icon;
					const labelStyle = value === v ? labelSelect : label;

					return (<RadioButton
						iconStyle={iconStyle}
						labelStyle={labelStyle}
						key={i}
						value={v}
						label={v}
					/>);
				})}
			</RadioButtonGroup>
		</MuiThemeProvider>;
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onChangeRadio: (e, value) => {
		if (value === "") {
			dispatch(resetGui(ownProps.name.replace(/\:/g, "."), {
				root: ownProps.rootMemberName
			}));
		} else {
			(dispatch(updateGui(ownProps.name.replace(/\:/g, "."), {
				value: value,
				root: ownProps.rootMemberName
			})));
		}
	}
});


const ConnectedRadio = connect(
	null, mapDispatchToProps
)(InputRadio);

export default ConnectedRadio;
