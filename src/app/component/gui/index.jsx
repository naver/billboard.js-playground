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
		return _.map(properties, (option, key) => {
			if (option.properties) {
				return this.member(option, key);
			} else {
				return <Property key={option.attributes.name} {...option.attributes} />;
			}
		});
	}

	member(option, key) {
		return (<div key={key}>
			<Property {...option.attributes} />
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

const mapStateToProps = (state) => {
	return state.gui;
};

const GUI = connect(mapStateToProps)(Control);

export {
	GUI,
};
export default GUI;
