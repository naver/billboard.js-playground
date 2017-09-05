import React from "react";
import { connect } from "react-redux";
import {
	Checkbox,
	Text,
	Number,
} from "./input/index";

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
		const input = Property.getInputType(type, option);

		return (<li data-id={option.name} className={option.className}>
			<span className="name"> {option.name} </span>
			<span className="type"> {type} </span>
			<span> {input} </span>
		</li>);
	}

	static getInputType(type, option) {
		switch (type.toLocaleLowerCase()) {
			case "boolean" :
				return <Checkbox {...option} />;
			case "string" :
				return <Text {...option} />;
			case "number" :
				return <Number {...option} />;
			default :
				return "";
		}
	}
}

export default Property;
