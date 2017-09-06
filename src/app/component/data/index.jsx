import React, { PropTypes } from "react";
import { connect } from "react-redux";
//import { updateCommand } from "../../actions";

class Controller extends React.Component {
	constructor() {
		super();
	}

	componentWillMount() {
	}

	componentWillReceiveProps(nextProps) {
	}

	render() {
	}

}

Controller.propTypes = {
	text: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
	onChange: text => dispatch(updateCommand(text))
});

const mapStateToProps = state => ({
	text: state.command.text
});

const Command = connect(mapStateToProps, mapDispatchToProps)(Controller);

export {
	Command
};
export default Command;
