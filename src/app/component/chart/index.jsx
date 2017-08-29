import React from "react";
import BB from "react-billboardjs";
import {connect} from "react-redux";

class Chart extends React.Component {
	render() {
		const chartConfigure = this.props.chartConfigure;

		return <BB
			id="reactChart"
			{...chartConfigure}
		/>;
	}
}

const mapStateToProps = state => ({
	chartConfigure: state.options
});

Chart = connect(mapStateToProps)(Chart);

export {
	Chart,
};

export default Chart;
