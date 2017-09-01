import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { updateCommand } from "../../actions";

class Controller extends React.Component {
	constructor() {
		super();

		this.state = {
			error: false,
			text: ""
		};

		this.onChangeText = this.onChangeText.bind(this);
	}

	componentWillMount() {
		this.setState({
			text: this.props.text
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			text: nextProps.text
		});
	}

	render() {
		const value = `${this.state.text}`;

		return (<div className="textConfigure">
			<textarea value={value} onChange={this.onChangeText} className={this.state.error ? "err" : ""} />
		</div>);
	}

	onChangeText(e) {
		const value = e.target.value;
		let parsed;

		try {
			parsed = JSON.parse(value);
		} catch (e) {
			parsed = null;
		}

		if(parsed === null){
			this.setState({
				error: true,
				text: value
			});
		} else {
			this.setState({
				error: false,
				text: value
			});
			this.props.onChange(parsed);
		}
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
