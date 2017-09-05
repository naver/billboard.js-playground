import React, { PropTypes } from "react";
import { connect } from "react-redux";
import {
	updateGui
} from "../../../actions";

class InputText extends React.Component {
	getRadioInput(valueoptions, name, onChange, defaultvalue) {
		return <form>
			{_.map(valueoptions, (v, i) => {
				if(v == defaultvalue){
					return <p key={i}>
						<input type="radio" checked name={name}  value={v} onChange={onChange} />
						<span>{v}</span>
					</p>;
				} else {
					return <p key={i}>
						<input type="radio" name={name}  value={v} onChange={onChange} />
						<span>{v}</span>
					</p>;
				}

			})}
		</form>;
	}

	render() {
		const { defaultvalue, onChange, valueoptions , name } = this.props;
		let returnValue;

		if(valueoptions){
			returnValue = this.getRadioInput(valueoptions, name, onChange, defaultvalue);
		} else {
			if (isNaN(defaultvalue)) {
				returnValue = (<input type="text" placeholder="undefined" onChange={onChange} />);
			} else {
				returnValue = (<input type="text" defaultValue={defaultvalue} onChange={onChange} />);
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
