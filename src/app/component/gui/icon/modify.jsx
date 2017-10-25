import React from "react";
import { connect } from "react-redux";
import FontIcon from 'material-ui/FontIcon';
import { grey500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
