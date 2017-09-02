import React, { PropTypes } from "react";
import _ from "underscore";
import { connect } from "react-redux";
import Property from "./property";


class Control extends React.Component {
	constructor() {
		super();
	}

	componentWillMount() {
		this.setState(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(nextProps);
	}

	child(properties) {
		return _.map(properties, (p, i) => {
			if (p.properties) {
				return this.member(p, i);
			} else {
				return <Property key={p.name} {...p} />;
			}
		});
	}

	member(option, index) {
		return (<div key={index}>
			<Property {...option} />
			{option.properties ? <ul>{this.child(option.properties)}</ul> : ""}
		</div>);
	}

	render() {
		const rendered = _.map(this.state,  (option, idx) => {
			return option.kind === "member" ? this.member(option, idx) : "";
		});
		return <div className="inputConfigure">{rendered}</div>;
	}
}

const mapStateToProps = state => {
	return state.gui;
};

const GUI = connect(mapStateToProps)(Control);

export {
	GUI,
};
export default GUI;
