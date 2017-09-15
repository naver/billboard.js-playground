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
import CodeMirror from "../command/codemirror";
import * as color from 'material-ui/styles/colors';

const styles = {
	chip: {
		display: "inline-block",
		paddingBottom: "8px",
		paddingRight: "8px"
	},
	wrapper: {
		display: "flex",
		flexWrap: "wrap"
	},

	cardHeader: {
		color: color.grey800,
		padding: 0
	},

	cardText: {
		padding: "0",
		margin: "0 16px",
		marginBottom: "20px",
		borderTop : "1px solid #E0E0E0"
	}
};

class PropertyCard extends React.Component {

	componentDidMount() {
		PR && PR.prettyPrint();
	}

	componentDidUpdate() {
		if(this.pp){
			this.pp.className = "prettyprint";
			PR && PR.prettyPrint();
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
				{chip.map(({name, optional}) => {
					if(optional){
						return <div key={name} style={styles.chip}>
							<Chip onClick={() => this.props.onClickChip(name)} onRequestDelete={() => this.props.onClickDelete(name)}>{name}</Chip>
						</div>
					} else {
						return <div key={name} style={styles.chip}>
							<Chip onClick={() => this.props.onClickChip(name)}>{name}</Chip>
						</div>
					}

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

	getExample() {
		const example = this.props.attributes.examples;

		return example ? (<CardText style={styles.cardText}>
			<div className="text_title">example</div>
			<div className="example"><pre ref={(p) => {this.pp = p;}} className="prettyprint">{example}</pre></div>
		</CardText>) : "";
	}

	getDescription() {
		return (<CardText style={styles.cardText}>
			<div className="text_title">description</div>
			<div className="text_content">{this.props.attributes.description}</div>
		</CardText>);
	}

	render() {
		const openDocIcon = (<FontIcon onClick={(e) => this.onClickOpenDoc()} className="material-icons">open_in_new</FontIcon>);
		const attr = this.props.attributes;
		const name = attr.name;
		const type = attr.type.names.join(" | ");
		const defaultvalue = attr.defaultvalue;

		return (
			<div ref={(d) => { this.wrapper = d; }}>
				<Card className="guide_card">
					{this.getActiveOption()}
					<CardHeader
						style={styles.cardHeader}
						showExpandableButton={true}
						expandable={false}
						openIcon={openDocIcon}
						closeIcon={openDocIcon} >
						<CardTitle title={name} subtitle={`${type} (default value : ${defaultvalue})`} />
					</CardHeader>
					{this.getDescription()}
					{this.getExample()}
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


