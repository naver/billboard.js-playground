import React, { PropTypes } from "react";
import { connect } from "react-redux";
import ConfigureProptypes from "../chart/configureProptypes";
import { changeUserConfigure } from "../../actions";

class RawUserData extends React.Component {
	constructor() {
		super();

		this.state = {
			error : false
		};

		this.onChangeText = this.onChangeText.bind(this);
	}

	render() {
		const value = `${this.props.userConfigure}`;

		return (<div>
			<textarea value={value} onChange={this.onChangeText} className={this.state.error ? "err" : ""} />
		</div>);
	}

	onChangeText(e) {

		try {
			JSON.parse(e.target.value);
			this.setState({
				error : false
			});
		} catch(e){
			this.setState({
				error : true
			});
		}

		this.props.onChange(e.target.value);
	}
}

RawUserData.propTypes = {
	userConfigure: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
	onChange: text => {
		console.log(text);
		dispatch(changeUserConfigure(text))
	}
});

const mapStateToProps = state => {
	return {
		userConfigure: state.options.optionText
	};
};

const UserConfigure = connect(mapStateToProps, mapDispatchToProps)(RawUserData);

export {
	UserConfigure
};
export default UserConfigure;
