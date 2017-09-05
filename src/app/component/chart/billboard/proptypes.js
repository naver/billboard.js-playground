import {
	PropTypes
} from "react";

const CONFIGURE_PROPTYPES = {
	area: PropTypes.object,
	axis: PropTypes.object,
	bar: PropTypes.object,
	bindto: PropTypes.string,
	color: PropTypes.object,
	data: PropTypes.object.isRequired,
	donut: PropTypes.object,
	gauge: PropTypes.object,
	grid: PropTypes.object,
	interaction: PropTypes.object,
	legend: PropTypes.object,
	line: PropTypes.object,
	oninit: PropTypes.func,
	onout: PropTypes.func,
	onover: PropTypes.func,
	onrendered: PropTypes.func,
	onresize: PropTypes.func,
	onresized: PropTypes.func,
	padding: PropTypes.object,
	pie: PropTypes.object,
	point: PropTypes.object,
	regions: PropTypes.array,
	resize: PropTypes.object,
	size: PropTypes.object,
	spline: PropTypes.object,
	subchart: PropTypes.object,
	svg: PropTypes.object,
	title: PropTypes.object,
	tooltip: PropTypes.object,
	transition: PropTypes.object,
	zoom: PropTypes.object,
	forceUpdate: PropTypes.bool // custom
};

export default CONFIGURE_PROPTYPES;
