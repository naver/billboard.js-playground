import React, { PropTypes } from "react";
import { connect } from "react-redux";

const URL = {
	d3v4 : "https://cdnjs.cloudflare.com/ajax/libs/d3/4.10.2/d3.js",
	bbjs : "https://cdnjs.cloudflare.com/ajax/libs/billboard.js/1.0.1/billboard.js",
	bbcss : "https://cdnjs.cloudflare.com/ajax/libs/billboard.js/1.0.1/billboard.css",
};

const html = `<div id="chart"></div>`;

const css_external = `${URL.bbcss}`;
const js_external = `${URL.d3v4};${URL.bbjs}`

class CodePenExportCode extends React.Component {
	render() {
		const js = `bb.generate(${this.props.text})`;
		const value = {
			title: "bb playground",
			css_external,
			js_external,
			html,
			js
		};

		return (<form action="https://codepen.io/pen/define" method="POST" target="_blank">
			<input type="hidden" name="data" value={JSON.stringify(value)} />
			<input type="submit" value="Create New Pen with Prefilled Data" />
		</form>);
	}
}


CodePenExportCode.propTypes = {
	text: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	text: state.command.text
});

const ExportCode = connect(mapStateToProps, null)(CodePenExportCode);

export default ExportCode;
