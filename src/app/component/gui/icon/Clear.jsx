import React from "react";
import { connect } from "react-redux";
import FontIcon from 'material-ui/FontIcon';
import {
	deepOrange300,
	grey500
} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
	resetGui
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
