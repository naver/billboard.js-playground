import React, { PropTypes } from "react";
import CodeMirror from "./codemirror";
import { connect } from "react-redux";
import { updateCommand } from "../../actions";
import ExportCode from "./exportcode";
var beautify_js = require('js-beautify').js_beautify;

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
			text: this.props.text,
			focus: this.props.focus
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			focus: nextProps.focus,
			text: nextProps.text
		});
	}

	render() {
		const value = `${this.state.text}`;
		const options = {
			lineNumbers: true,
			mode: "javascript"
		};

		const newLine = beautify_js(value);
		const className = "textConfigure" + " " + (this.state.error ? "err" : "");

		return (<div className={className}>
			<ExportCode />
			<CodeMirror value={newLine} onChange={this.onChangeText} options={options} />
		</div>);
	}

	onChangeText(value) {
		let parsed;

		try {
			eval(`parsed = ${value}`);
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
	text: state.command.text,
	focus: state.command.focus
});

const Command = connect(mapStateToProps, mapDispatchToProps)(Controller);

export {
	Command
};
export default Command;
