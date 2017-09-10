import TextField from 'material-ui/TextField';
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';
import * as _ from "lodash";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { updateData } from "../../actions";

class Controller extends React.Component {
	constructor() {
		super();
	}

	componentWillMount() {
	}

	componentWillReceiveProps(nextProps) {

	}

	getTextField(value, type, r, c) {
		return <TextField
			value={value}
			onChange={(e) => {this.props.onChange(e, type, r, c)}}
		/>
	}

	getBody(tableData) {
		return (<TableBody
			displayRowCheckbox={false}>
			{tableData.map( (row, index) => {
				return <TableRow key={index}>
					{_.map(row, (r, i) => {
						return <TableRowColumn key={i}>
							{this.getTextField(r, "body", index, i)}
						</TableRowColumn>
					})}
				</TableRow>;
			})}
		</TableBody>);
	}

	getHeader(keys) {
		const tc = _.map(keys.concat([]), (r, i) => {
			return <TableHeaderColumn key={i}>
				{this.getTextField(r, "header", null ,i)}
			</TableHeaderColumn>;
		});

		return (<TableHeader
			displaySelectAll={false}
			adjustForCheckbox={false}>
			<TableRow>
				{tc}
			</TableRow>
		</TableHeader>);
	}

	render() {
		const data = this.props.data;
		const header = this.getHeader(data.header);
		const body = this.getBody(data.body);

		return <div className="dataTable">
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<Table
					selectable={false}
					multiSelectable={false}>
					{header}
					{body}
				</Table>
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
