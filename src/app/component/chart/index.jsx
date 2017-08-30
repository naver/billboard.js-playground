import React, {
	PropTypes
} from "react";
import {
	connect
} from "react-redux";
import ConfigureProptypes from "./configureProptypes";
import {
	BB as Billboard
} from "./BB";

class RawChart extends React.Component {
	render() {
		const chartConfigure = this.props.chartConfigure;

		return (<Billboard
			id="reactChart"
			{...chartConfigure}
		/>);
	}
}

RawChart.propTypes = {
	chartConfigure: PropTypes.shape(ConfigureProptypes).isRequired
};

const mapStateToProps = state => ({
	chartConfigure: state.options
});

const Chart = connect(mapStateToProps)(RawChart);

export {
	Chart
};
export default Chart;
