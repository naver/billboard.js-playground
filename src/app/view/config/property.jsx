import React from "react";
import * as input from "./input";

class Property extends React.Component {
	render() {
		const option = this.props;
		const type = option.type ? option.type.names.join(", ") : "";

		return (<div data-id={option.name}>
			<p>id : {option.name}</p>
			<p>
				<span>type : {type} && default : {Property.getInputType(type, option.defaultvalue)}</span>
			</p>
		</div>);
	}

	static getInputType(type, defaultvalue = ""){
		switch (type.toLocaleLowerCase()) {
			case "boolean" :
				return input.checkbox(defaultvalue);
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