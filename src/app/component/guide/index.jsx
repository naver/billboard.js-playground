import React from "react";
import Drawer from "material-ui/Drawer";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { connect } from "react-redux";
import { DocumentCard } from "./card.jsx";
import Chip from 'material-ui/Chip';

const styles = {
	chip: {
		margin: 4,
	},
	wrapper: {
		display: 'flex',
		flexWrap: 'wrap',
	},
};

class DockedGuide extends React.Component {

	render() {
		const style = this.props.style;
		return (
			<MuiThemeProvider>
				<Drawer
					containerStyle={{
						transform : this.props.open ? "translate(-10px, -10px)" : "translate(-10px, "+style+")",
						height: style,
						top: "none",
					 	bottom: "0",
					}}
					width={600}
					openSecondary={true}
					open={this.props.open}
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
