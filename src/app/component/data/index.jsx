import React, { PropTypes } from "react";

class Data extends React.Component {
	render() {
		const inputStyle = {
			width: "100%",
			height: "200px"
		};

		const value = `{columns : ${JSON.stringify(this.props.columns)}}`;

		return (<div>
			<textarea defaultValue={value} style={inputStyle} />
		</div>);
	}
}


Data.propTypes = {
	columns: PropTypes.array
}


export {
	Data,
};
export default Data;