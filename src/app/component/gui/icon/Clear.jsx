import React from "react";
import { connect } from "react-redux";
import FontIcon from 'material-ui/FontIcon';
import ContentClear from 'material-ui/svg-icons/content/clear';
import {blue500,deepOrange300,deepOrange500, grey500, red500, greenA200} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
	updateGui, resetGui
} from "../../../actions";


class DeleteIcon extends React.Component {
	render (){
		const color = this.props.activated ? deepOrange300 : grey500;
		return <MuiThemeProvider muiTheme={getMuiTheme()}>
			<div>
				<FontIcon
					onClick={(e) => this.onClickDelete(e)}
					className="material-icons"
					color={color}>remove_circle</FontIcon>
			</div>
		</MuiThemeProvider>;
	}

	onClickDelete(e) {
		this.props.onClickDelete(e);
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onChangeActive: e => dispatch(changeGuiActivate(ownProps.name.replace(/\:/g, "."), e.target.checked)),
		onClickDelete: () => dispatch(resetGui(ownProps.name.replace(/\:/g, "."), {
			root: ownProps.rootMemberName
		}))
	};
};

const Clear = connect(
	null, mapDispatchToProps
)(DeleteIcon);

export default Clear;
