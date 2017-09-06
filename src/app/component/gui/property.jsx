import React from "react";
import { connect } from "react-redux";
import {
	Checkbox,
	Text,
	Number,
} from "./input/index";
import {
	resetGui
} from "../../actions";


class InputProperty extends React.Component {
	componentWillMount() {
		this.setState(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(nextProps);
	}

	render() {
		const option = this.state;
		const type = option.type ? option.type.names.join(", ") : "";
		const input = InputProperty.getInputType(type, option);
		const className = "property" + (this.state.value !== this.state.defaultvalue ? " updated" : "");

		return (<li data-id={option.name} className={className}>
			<span className="name"> {option.name} </span>
			<span className="type"> {type} </span>
			<span> {input} </span>
			{input ? <button className="delete" onClick={(e) => this.onClickDelete(e)}>x</button> : ""}
		</li>);
	}

	onClickDelete(e) {
		this.props.onClickDelete(e);
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

const mapDispatchToProps = (dispatch, ownProps) => ({
	onClickDelete: () => dispatch(resetGui(ownProps.name.replace(/\:/g, ".")))
});

const Property = connect(
	null, mapDispatchToProps
)(InputProperty);

export default Property;
