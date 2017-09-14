import React from "react";
import Drawer from "material-ui/Drawer";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { connect } from "react-redux";
import { DocumentCard } from "./card";

class DockedGuide extends React.Component {
	constructor() {
		super();

		this.state = {
			open: false
		};
	}

	componentDidMount() {
		this.setState(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(nextProps);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.open !== nextState.open) {
			this.setState({
				open: nextState.open
			});
			return true;
		} else {
			return false;
		}
	}

	render() {
		return (
			<MuiThemeProvider>
				<Drawer
					containerStyle={{
						transform: this.state.open ? "translate(-10px, -10px)" : "translate(-10px,100%)",
						top: "none",
						height: "auto",
						bottom: "0",
					}}
					onRequestChange={(open) => { this.setState({ open }); }}
					width={600}
					openSecondary={true}
					open={this.state.open}
				>
					<DocumentCard />
				</Drawer>
			</MuiThemeProvider>);
	}
}

const mapStateToProps = state => ({
	open: state.guide.open,
	style: state.guide.style,
});

const Guide = connect(
	mapStateToProps, null
)(DockedGuide);


export {
	Guide
}
export default Guide;

