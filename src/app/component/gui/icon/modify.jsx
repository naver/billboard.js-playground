import React from "react";
import { connect } from "react-redux";
import FontIcon from 'material-ui/FontIcon';
import ContentClear from 'material-ui/svg-icons/content/clear';
import {blue500,deepOrange500, grey500, red500, greenA200} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
	updateGui, resetGui
} from "../../../actions";


class EditIcon extends React.Component {
	render (){
		return <MuiThemeProvider muiTheme={getMuiTheme()}>
			<FontIcon
				style={{
					fontSize: "20px",
					left: "-86px"
				}}
				className="material-icons"
				color={grey500}>mode edit</FontIcon>
		</MuiThemeProvider>;
	}

	onClickDelete(e) {
		//this.props.onClickDelete(e);
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		//onChangeActive: e => dispatch(changeGuiActivate(ownProps.name.replace(/\:/g, "."), e.target.checked)),
	};
};

const Modify = connect(
	null, mapDispatchToProps
)(EditIcon);

export default Modify;
