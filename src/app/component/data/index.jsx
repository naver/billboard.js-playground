import TextField from 'material-ui/TextField';
import React, { PropTypes } from "react";
import FontIcon from 'material-ui/FontIcon';
import { connect } from "react-redux";
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableFooter,
	TableRowColumn,
} from 'material-ui/Table';
import * as _ from "lodash";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { updateData } from "../../actions";


const cellStyle = {
	width: "50px",
	padding: "0 5"
};

class Controller extends React.Component {
	componentWillMount() {
		this.setState(this.props);
	}

	componentWillReceiveProps(nextProps) {

	}

	getHeaderTextField(value, type, r, c) {
		return <TextField
			underlineStyle={{
				borderColor: "transparent",
			}}
			underlineFocusStyle={{
				borderColor: "transparent",
			}}
			inputStyle={{
			    textAlign: "center"
			}}
			value={value}
			fullWidth={true}
			onChange={(e) => {this.props.onChange(e, type, r, c)}}
		/>;
	}

	getTextField(value, type, r, c) {
		return <TextField
			underlineStyle={{
				borderColor: "transparent",
			}}
			underlineFocusStyle={{
				borderColor: "transparent",
			}}
			inputStyle={{
			    textAlign: "center"
			}}
			value={value}
			fullWidth={true}
			onChange={(e) => {this.props.onChange(e, type, r, c)}}
		/>
	}

	getBody(tableData) {
		return (<TableBody
			displayRowCheckbox={false}>
			{tableData.map( (row, index) => {
				return <TableRow key={index} className="table-row">
					<TableRowColumn style={cellStyle} className="table-row-column">
						<FontIcon onClick={(e) => this.onClickDelete(e)} className="material-icons">
							remove_circle
						</FontIcon>
					</TableRowColumn>
					{_.map(row, (r, i) => {
						return <TableRowColumn key={i} style={cellStyle}>
							{this.getTextField(r, "body", index, i)}
						</TableRowColumn>
					})}
					<TableRowColumn style={cellStyle}></TableRowColumn>
				</TableRow>;
			})}
			<TableRow>
				<TableRowColumn style={cellStyle}>
					<FontIcon onClick={(e) => this.onClickDelete(e)} className="material-icons">
						add_circle
					</FontIcon>
				</TableRowColumn>
			</TableRow>
		</TableBody>);
	}

	getHeader(keys) {
		const tc = _.map(keys.concat([]), (r, i) => {
			return <TableHeaderColumn key={i} style={cellStyle}>
				{this.getHeaderTextField(r, "header", null ,i)}
			</TableHeaderColumn>;
		});

		tc.unshift(<TableHeaderColumn style={cellStyle}/>);
		tc.push(<TableHeaderColumn style={cellStyle}>
			<FontIcon onClick={(e) => this.onClickDelete(e)} className="material-icons">add_circle</FontIcon>
		</TableHeaderColumn>);

		return (<TableHeader
			displaySelectAll={false}
			adjustForCheckbox={false} >
			<TableRow>
				{tc}
			</TableRow>
		</TableHeader>);
	}

	getFooter(header) {
		const tc = _.map(header.concat([]), (r, i) => {
			return <TableHeaderColumn key={i}>
				{this.getHeaderTextField(r, "header", null ,i)}
			</TableHeaderColumn>;
		});

		tc.unshift(<TableHeaderColumn style={cellStyle}/>);
		tc.push(<TableHeaderColumn style={cellStyle}>
			<FontIcon onClick={(e) => this.onClickDelete(e)} className="material-icons">add_circle</FontIcon>
		</TableHeaderColumn>);

		return (<TableFooter>
			<TableRow>
				<TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
					{tc}
				</TableRowColumn>
			</TableRow>
		</TableFooter>);
	}

	render() {
		const data = this.props.data;
		const header = this.getHeader(data.header);
		const body = this.getBody(data.body);
		const footer = this.getFooter(data.header);

		// todo
		return <div className="dataTable">
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
					<Table
						bodyStyle={{
							overflowX : "initial",
							overflowY : "initial",
						}}
						selectable={false}
						multiSelectable={false}>
						{header}
						{body}
					</Table>
				</div>
			</MuiThemeProvider>
		</div>;
	}
}

Controller.propTypes = {
	onChange: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
	onChange: (e, type, r, c) => {
		dispatch(updateData(type, e.target.value, {
			row: r,
			column: c
		}))
	}
});

const mapStateToProps = state => ({
	data: state.data
});

const Data = connect(mapStateToProps, mapDispatchToProps)(Controller);

export {
	Data
};
export default Data;
