import React, { PropTypes } from "react";
import * as _ from "lodash";
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';

import { connect } from "react-redux";
import {
	updateGui, resetGui
} from "../../../actions";

class ArrayInput extends React.Component {
	render() {
		const { value } = this.props;
		let returnValue;
		const edit = <span className="">add</span>

		if(Array.isArray(value)){
			returnValue = (<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div style={{width:"100%", display:"inline-block"}}>

					{_.map(value, (v, i) => {
						return <div key={i}>
							<span>{i}</span>
							<TextField
								name={this.props.name}
								style={{width:"80%", display:"inline-block"}}
								fullWidth={true}
								hintText={v} />
						</div>
					})}
					<IconButton iconClassName="edit_function material-icons"
								tooltipPosition="top-center"
								style={{width:"20%", display:"inline-block", textAlign:"right"}}
								children={edit}
					/>
				</div>
			</MuiThemeProvider>);
		} else {
			returnValue = (<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div style={{width:"100%", display:"inline-block"}}>
					<TextField
						name={this.props.name}
						underlineStyle={{
						borderColor: "transparent",
					}}
						underlineFocusStyle={{
						borderColor: "transparent",
					}}
						style={{width:"80%", display:"inline-block"}}
						fullWidth={true}
						hintText={value} />
					<IconButton iconClassName="edit_function material-icons"
								tooltipPosition="top-center"
								style={{width:"20%", display:"inline-block", textAlign:"right"}}
								children={edit}
					/>
				</div>
			</MuiThemeProvider>);
		}

		return returnValue;
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onChange: (e, value) => {
		if(value === ""){
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

const ConnectedCollection = connect(
	null, mapDispatchToProps
)(ArrayInput);

export default ConnectedCollection;
