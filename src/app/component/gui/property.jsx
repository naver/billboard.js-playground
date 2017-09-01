import React from "react";
import * as input from "./input";

class Property extends React.Component {
	render() {
		const option = this.props;
		const type = option.type ? option.type.names.join(", ") : "";
		const input = Property.getInputType(type, option.defaultvalue, option);

		return (<li data-id={option.name} className={this.props.className}>
			<span className="name"> {option.name} </span>
			<span className="type"> {type} </span>
			<span> {input} </span>
		</li>);
	}

	static getInputType(type, defaultvalue = "", option) {

		switch (type.toLocaleLowerCase()) {
			case "boolean" :
				return <input.checkbox {...option} />;
			case "string" :
				return input.string(defaultvalue);
			case "number" :
				return input.number(isNaN(defaultvalue) ? null : defaultvalue);
			default :
				return "";
		}
	}
}

export default Property;