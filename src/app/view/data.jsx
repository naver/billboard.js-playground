import React from "react";
import PropTypes from 'prop-types';

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

Data.defaultProps = {
	columns: [
		["data1", 30, 200, 100, 400, 150, 250],
		["data2", 50, 20, 10, 40, 15, 25],
		["data3", 50, 20, 10, 40, 15, 25]
	]
};

export {
	Data,
};
export default Data;