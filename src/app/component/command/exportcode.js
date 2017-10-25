import React, { PropTypes } from "react";
import { connect } from "react-redux";
const beautify = require('js-beautify').js_beautify;
import IconButton from 'material-ui/IconButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
		const textConfig = beautify(this.props.text);
		const js = `bb.generate(${textConfig})`;
		const value = {
			title: "bb playground",
			css_external,
			js_external,
			html,
			js
		};

		return (<form action="https://codepen.io/pen/define" method="POST" target="_blank" className="codepen-export"
					  ref={(input) => { this.form = input; }}
					  >
			<input type="hidden" name="data" value={JSON.stringify(value)} />
			<input type="submit" alt="export to codepen" value="" style={{position: "absolute"}} />
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<IconButton
					tooltipPosition="top-right"
					className="button"
					tooltip="export to codepen"
					onClick={(e) => this.onClickSubmit(e)}
					style={{
							position: "absolute",
							backgroundSize: "contain",
							border: "none",
							width: "60px",
							height: "40px",
							backgroundImage: `url(codepen-export.svg)`
						}}
				/>
			</MuiThemeProvider>
		</form>);
	}

	onClickSubmit() {
		this.form.submit();
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
