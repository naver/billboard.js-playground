import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import { connect } from "react-redux";
import {
	showGuideCard, resetGui, updateConfigureInfo, hideGuideCard
} from "../../actions";

const styles = {
	chip: {
		display:"inline-block",
		paddingBottom: "8px",
		paddingRight: "8px",
	},
	wrapper: {
		display: 'flex',
		flexWrap: 'wrap',
	},
};

class PropertyCard extends React.Component {
	shouldComponentUpdate(nextProps) {

		const chipequal = (a = [], b = []) => {
			if(a.length > 0 && b.length > 0 && a.length === b.length){
				 const result = a.filter((value) => {
					return b.indexOf(value) < 0;
				});
				return result.length === 0;
			} else {
				return false;
			}
		};

		if(nextProps.name === this.props.name && chipequal(nextProps.chip.concat([]), this.props.chip.concat([]))){
			return false;
		} else {
			return true;
		}
	}

	onClickOpenDoc() {
		const url = `https://naver.github.io/billboard.js/release/latest/doc/Options.html#.${this.props.attributes.docid}`;

		window.open(url);
	}

	getActiveOption() {
		const closeIcon = (<FontIcon onClick={(e) => this.props.onHideCard()} className="material-icons">close</FontIcon>);
		const chip = this.props.chip;
		return (<CardActions>
			<div style={{
				marginRight: 0,
				display: "inline-block",
				width: "95%"
			}}>
				{chip.map((v) => {
					return <div key={v} style={styles.chip}>
						<Chip key={v} onClick={() => this.props.onClickChip(v)} onRequestDelete={() => this.props.onClickDelete(v)}>{v}</Chip>
					</div>;
				})}
			</div>
			<div style={{
				marginRight: 0,
				display: "inline-block",
				width: "5%"
			}}>
				{closeIcon}
			</div>
		</CardActions>);
	}

	render() {
		const attr = this.props.attributes;
		const openDocIcon = (<FontIcon onClick={(e) => this.onClickOpenDoc()} className="material-icons">open_in_new</FontIcon>);

		const type = attr.type.names.join(" | ");
		const examples = attr.examples && attr.examples.join("<br>");
		const {name, description} = attr;

		return (
			<div ref={(d) => { this.wrapper = d; }}>
				<Card>
					{this.getActiveOption()}
					<CardHeader
						style={{padding:0}}
						showExpandableButton={true}
						expandable={false}
						openIcon={openDocIcon}
						closeIcon={openDocIcon}>
						<CardTitle title={name} subtitle="Card subtitle" />
					</CardHeader>
					<CardText>
						<div ref={(d) => { this.descriptionWrapper = d; }}></div>
					</CardText>
					<CardText>
						{type}
						{examples}
					</CardText>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	chip: state.command.chip,
	name: state.guide.name,
	attributes: state.guide.attributes,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	onHideCard: () => {
		dispatch(hideGuideCard());
	},
	onClickChip : (name) => {
		dispatch(updateConfigureInfo(name));
	},
	onClickDelete: (name) => {
		dispatch(resetGui(name));
	},
	onUpdateCard : (heightStyle) => {
		dispatch(showGuideCard(heightStyle));
	}
});

const DocumentCard = connect(
	mapStateToProps, mapDispatchToProps
)(PropertyCard);


export {
	DocumentCard
}
export default DocumentCard;


