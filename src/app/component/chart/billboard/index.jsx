import React, { PropTypes } from "react";
import connect from "react-watcher";
import * as bb  from "billboard.js";
import CONFIGURE_PROPTYPES from "./proptypes";
import { deepCopy } from "./util";

class Billboard extends React.Component {
	componentWillMount() {
		this.instance = null;
		this.updated = false;
		this.setState(this.props);
	}

	componentDidMount() {
		this.watchConfig();
		this.generateChart();
	}

	componentDidUpdate() {
		this.updated = false;
		this.generateChart();
	}

	componentWillReceiveProps(props) {
		this.setState(props);
	}

	shouldComponentUpdate() {
		const willRender = !this.updated;

		if (willRender) {
			this.destroy();
		}
		return willRender;
	}

	componentWillUnmount() {
		this.destroy();
	}

	watchConfig() {
		const { watch } = this.state;

		//watch("axis.y.labels", data => this.instance.axis.label({ y: data }));
		//watch("axis.x.categories", data => this.instance.categories(data));
		//watch("legend.show", data => this.instance.legend.show(data));
		//watch("legend.hide", data => this.instance.legend.hide(data));
		//watch("regions", data => this.instance.regions(data));
		//watch("size.width", data => this.instance.resize({ width: data }));
		//watch("size.height", data => this.instance.resize({ height: data }));
		//watch("grid.x.lines", data => this.instance.xgrids(data));
		//watch("grid.y.lines", data => this.instance.ygrids(data));
		//watch("zoom.enable", data => this.instance.zoom.enable(data));
		//watch("zoom.domain", (data) => {
		//	if (data === null) {
		//		this.instance.unzoom();
		//	} else {
		//		this.instance.zoom();
		//	}
		//});
		//watch("data.columns", (data) => {
		//	this.instance.load({ columns: data });
		//});

		//Object.keys(CONFIGURE_PROPTYPES).forEach((key) => {
		//	watch(key, (data) => {
		//		console.log(data);
		//	});
		//});
	}

	getDispatchedValue(namespace, props) {
		const keys = namespace.split(".");
		let newProps = props;

		keys.every(key => {
			newProps = newProps[key];
			if(newProps === undefined){
				return false;
			}
		});

		return newProps;
	}

	destroy() {
		this.instance && this.instance.destroy();
		this.instance = null;
	}

	generateChart(mountNode = this.wrapper, config = this.props) {
		// using react node

		const newConfig = deepCopy({}, config);
		newConfig.bindto = mountNode;

		this.instance = bb.generate(newConfig);
		window.chart = this.instance;
	}

	render() {
		return (<div
			key={this.props.id}
			ref={(d) => { this.wrapper = d; }}
		></div>);
	}
}

Billboard.propTypes = CONFIGURE_PROPTYPES;

export {
	Billboard
};
Billboard = connect(Billboard);
export default Billboard;
