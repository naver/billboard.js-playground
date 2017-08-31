import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "underscore";
import Property from "./property";

class Configure extends React.Component {

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
		return (<div key={index} >
			<Property {...option} />
			{option.properties ? <ul>{this.child(option.properties)}</ul> : ""}
		</div>);
	}

	render() {
		const rendered = _.map(this.props.options, (option, idx) => {
			return option.kind === "member" ? this.member(option, idx) : "";
		});
		return <div className="inputConfigure">{rendered}</div>;
	}
}

Configure.propTypes = {
	options: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	options: state.document
});


const DefaultConfigure = connect(mapStateToProps)(Configure);

export {
	DefaultConfigure,
};
export default DefaultConfigure;
