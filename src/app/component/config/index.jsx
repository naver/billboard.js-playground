import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import Property from "./property";

class Config extends React.Component {
	property(properties) {
		return (<ul>
			{_.map(properties, (prop, idx) => <Property key={idx} {...prop} />)}
		</ul>);
	}

	member(option, index) {
		return (<div key={index}>
			<Property {...option} />
			{option.properties ? this.property(option.properties) : ""}
		</div>);
	}

	render() {
		const rendered = _.map(this.props.options, (option, idx) => {
			return option.kind === "member" ? this.member(option, idx) : "";
		});
		return <ul>{rendered}</ul>;
	}
}

Config.propTypes = {
	options: PropTypes.object.isRequired,
};

export {
	Config,
};
export default Config;
