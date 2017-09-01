import React, { PropTypes } from "react";
import _ from "underscore";
import { connect } from "react-redux";
import Property from "./property";

class Control extends React.Component {
	child(properties) {
		return _.map(properties, (p, i) => {
			if (p.properties) {
				return this.member(p, i);
			} else {
				return <Property key={i} {...p} />;
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
		console.log("Render");
		const rendered = _.map(this.props,  (option, idx) => {
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
