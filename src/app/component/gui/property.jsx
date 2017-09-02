import React from "react";
import { connect } from "react-redux";
import {
	Checkbox,
	string,
	number,
} from "./input";

class Property extends React.Component {
	componentWillMount() {
		this.setState(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(nextProps);
	}

	render() {
		const option = this.state;
		const type = option.type ? option.type.names.join(", ") : "";
		const input = Property.getInputType(type, option.defaultvalue, option);

		return (<li data-id={option.name} className={option.className}>
			<span className="name"> {option.name} </span>
			<span className="type"> {type} </span>
			<span> {input} </span>
		</li>);
	}

	static getInputType(type, defaultvalue = "", option) {
		switch (type.toLocaleLowerCase()) {
			case "boolean" :
				return <Checkbox {...option} />;
			case "string" :
				return string(defaultvalue);
			case "number" :
				return number(isNaN(defaultvalue) ? null : defaultvalue);
			default :
				return "";
		}
	}
}

export default Property;
