import React, { PropTypes } from "react";
import * as _ from "lodash";
import { connect } from "react-redux";
import {
	updateGui
} from "../../../actions";

class InputText extends React.Component {
	getRadioInput(valueoptions, name, onChange, value) {
		return (<form>
			{_.map(valueoptions, (v, i) => {
				if(v === value){
					return (<span key={i}>
						<input type="radio" checked name={name}  value={v} onChange={onChange} />
						<span>{v}</span>
					</span>);
				} else {
					return (<span key={i}>
						<input type="radio" name={name} value={v} onChange={onChange} />
						<span>{v}</span>
					</span>);
				}

			})}
		</form>);
	}

	render() {
		const { value, onChange, valueoptions , name } = this.props;
		let returnValue;

		if (valueoptions) {
			returnValue = this.getRadioInput(valueoptions, name, onChange, value);
		} else {
			if (value === undefined || value  === "undefined") {
				returnValue = (<input type="text" placeholder="undefined" onChange={onChange} />);
			} else {
				returnValue = (<input type="text" value={value} onChange={onChange} />);
			}
		}

		return returnValue;
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onChange: e => (dispatch(updateGui(ownProps.name.replace(/\:/g, "."), e.target.value)))
});

const Text = connect(
	null, mapDispatchToProps
)(InputText);

export default Text;
