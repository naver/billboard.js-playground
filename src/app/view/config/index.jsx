import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import Property from "./property";

class Config extends React.Component {
	optionView(option, index) {
		return (<div key={index}>
			<Property
				{...option}
			/>
			{option.properties ? _.map(option.properties, (opt, i) => this.optionView(opt, i)) : ""}
		</div>);
	}

	render() {
		const rendered = _.map(this.props.options, (option, idx) => this.optionView(option, idx));
		return <div>{rendered}</div>;
	}
}

Config.propTypes = {
	options: PropTypes.object.isRequired,
};


export {
	Config,
};
export default Config;
