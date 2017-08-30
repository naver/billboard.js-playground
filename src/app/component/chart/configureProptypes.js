import {
	PropTypes
} from "react";

const ConfigureProptypes = {
	size : PropTypes.object,
	padding: PropTypes.object,
	color: PropTypes.object,
	interaction: PropTypes.object,
	transition: PropTypes.object,
	oninit: PropTypes.func,
	onrendered: PropTypes.func,
	onmouseover: PropTypes.func,
	onmouseout: PropTypes.func,
	onresize: PropTypes.func,
	onresized: PropTypes.func,
	axis: PropTypes.object,
	grid: PropTypes.object,
	regions: PropTypes.array,
	legend: PropTypes.object,
	tooltip: PropTypes.object,
	subchart: PropTypes.object,
	zoom: PropTypes.object,
	point: PropTypes.object,
	line: PropTypes.object,
	area: PropTypes.object,
	bar: PropTypes.object,
	pie: PropTypes.object,
	donut: PropTypes.object,
	gauge: PropTypes.object,
	data : PropTypes.object,
	title: PropTypes.object,
	className: PropTypes.string,
	style: PropTypes.object,
	unloadBeforeLoad: PropTypes.bool
};

export default ConfigureProptypes;
