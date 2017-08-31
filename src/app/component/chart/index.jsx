import React, { PropTypes } from "react";
import { connect } from "react-redux";
import CONFIGURE_PROPTYPES from "./billboard/proptypes";
import { Billboard } from "./billboard";

class RawChart extends React.Component {
	render() {
		const chartConfigure = this.props.chartConfigure;

		return (<div className="chart">
			<Billboard
				id="reactChart"
				{...chartConfigure}
			/>
		</div>);
	}
}

RawChart.propTypes = {
	chartConfigure: PropTypes.shape(CONFIGURE_PROPTYPES).isRequired
};

const mapStateToProps = state => ({
	chartConfigure: state.command.original
});

const Chart = connect(mapStateToProps)(RawChart);

export {
	Chart,
	CONFIGURE_PROPTYPES
};
export default Chart;
