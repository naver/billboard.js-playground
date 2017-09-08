import React from "react";
import { connect } from "react-redux";
import FontIcon from 'material-ui/FontIcon';
import ContentClear from 'material-ui/svg-icons/content/clear';
import {blue500,deepOrange500, grey500, red500, greenA200} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class DeleteIcon extends React.Component {
	render (){
		return <MuiThemeProvider muiTheme={getMuiTheme()}>
			<div>
				<FontIcon
					onClick={(e) => this.onClickDelete(e)}
					className="material-icons"
					color={grey500}>clear</FontIcon>
			</div>
		</MuiThemeProvider>;
	}

	onClickDelete(e) {
		this.props.onClickDelete(e);
	}

}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onChangeActive: e => dispatch(changeGuiActivate(ownProps.name.replace(/\:/g, "."), e.target.checked)),
	onClickDelete: () => dispatch(resetGui(ownProps.name.replace(/\:/g, ".")))
});

const Clear = connect(
	null, mapDispatchToProps
)(DeleteIcon);

export default Clear;
