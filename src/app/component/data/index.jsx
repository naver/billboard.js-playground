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
import { updateData, addKeyToData, addValueToData, removeValueToData, removeKeyToData, reflectedDataToCommand, updateHeader, updateCell } from "../../actions";
import { deepCopy} from "../../util";

const cellStyle = {
	width: "50px",
	padding: "0 5"
};

const tableProps = {
	bodyStyle: {
		overflowX: "initial",
		overflowY: "initial",
	},
	selectable: false,
	multiSelectable: false
};

const tableHeaderProps = {
	displaySelectAll: false,
	adjustForCheckbox: false
};

const textFieldProps = {
	fullWidth: true,
	underlineStyle: {
		borderColor: "transparent",
	},
	underlineFocusStyle: {
		borderColor: "transparent",
	},
	inputStyle: {
		textAlign: "center"
	}
};

class DataTableController extends React.Component {
	componentWillReceiveProps(nextProps) {
		this.setState({
			fromCode: nextProps.data.fromCode
		});
	}

	componentDidUpdate() {
		this.props.reflectedData(this.props.data);
	}

	getHeaderTextField(headerKey, columnIndex) {
		const removeButton = this.getRemoveButton("column", headerKey);
		return (<div>
			{removeButton}
			<TextField
				name={`${columnIndex}${headerKey}`}
				value={headerKey}
				onChange={(e, value) => {this.props.onChangeHeader(value, columnIndex-1)}}
				{...textFieldProps}
			/>
		</div>);
	}

	getTextField(value, rowIndex, columnIndex) {
		const header = this.props.data.header[columnIndex-1];
		return (<TextField
			name={`${rowIndex}_${columnIndex}`}
			value={value}
			onChange={(e, value) => {this.props.onChangeData(value, rowIndex, header)}}
			{...textFieldProps}
		/>);
	}

	getRemoveButton(deleteType, targetInfo) {
		return (<FontIcon onClick={(e) => this.onClickDelete(deleteType, targetInfo)} className="material-icons">
			remove_circle
		</FontIcon>);
	}

	getAddButton(addType) {
		return (<FontIcon onClick={(e) => this.onClickAdd(addType)} className="material-icons">
			add_circle
		</FontIcon>);
	}

	onClickDelete(deleteType, targetInfo) {
		if(deleteType === "column"){
			this.props.deleteKey(targetInfo);
		}

		if(deleteType === "row"){
			this.props.deleteData(targetInfo);
		}
	}

	onClickAdd(addType) {
		const headers = this.props.data.header;
		const rows = this.props.data.body.concat([]);
		let data = {};

		if (addType === "column") {
			const newLength = rows.length;
			const newKey = `data${headers.length+1}`;
			const value = Array.apply(null, Array(newLength)).map(function () {
				return parseInt((Math.random() * 100), 10);
			});
			data = {
				name: newKey,
				value
			};
			this.props.addKey(data);
		} else if (addType === "row") {
			headers.forEach((header) => {
				data[header] = parseInt((Math.random() * 100), 10);
			});
			this.props.addData(data);
		}
	}

	getHeader(keys) {
		const headers = keys.concat([]);
		headers.unshift(""); // for delete button column
		headers.push(""); // for add button column

		const tc = _.map(headers, (headerKey, columnIndex) => {
			let inner;
			if (columnIndex === 0) {
				inner = "";
			} else if (columnIndex < headers.length - 1) {
				inner = this.getHeaderTextField(headerKey, columnIndex);
			} else {
				inner = this.getAddButton("column");
			}
			return (<TableHeaderColumn key={columnIndex} style={cellStyle}>{inner}</TableHeaderColumn>);
		});

		return (<TableHeader {...tableHeaderProps}>
			<TableRow>
				{tc}
			</TableRow>
		</TableHeader>);
	}

	getBody(tableData) {
		return (<TableBody displayRowCheckbox={false}>
			{tableData.map((row, rowIndex) => {
				return (<TableRow key={rowIndex} className="table-row">
					{this.getBodyRow(row, rowIndex)}
				</TableRow>);
			})}
			<TableRow>
				<TableRowColumn style={cellStyle}>
					{this.getAddButton("row")}
				</TableRowColumn>
			</TableRow>
		</TableBody>);
	}

	getBodyRow(row, rowIndex) {
		const values = this.props.data.header.map(header => {
			return row[header];
		});
		values.unshift("");
		values.push("");

		return _.map(values, (value, columnIndex) => {
			let inner;
			if (columnIndex === 0) {
				inner = this.getRemoveButton("row", rowIndex);
			} else if (columnIndex < values.length - 1) {
				inner = this.getTextField(value, rowIndex, columnIndex);
			} else {
				inner = "";
			}
			return (<TableRowColumn key={columnIndex} style={cellStyle}>{inner}</TableRowColumn>);
		});
	}

	render() {
		const data = this.props.data;
		const header = this.getHeader(data.header);
		const body = this.getBody(data.body);

		return (<div className="dataTable">
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<Table {...tableProps}>
					{header}
					{body}
				</Table>
			</MuiThemeProvider>
		</div>);
	}
}


const mapDispatchToProps = (dispatch, ownProps) => ({
	onChangeHeader: (value, columnIndex) => {
		dispatch(updateHeader({
			value,
			column: columnIndex
		}));
	},
	onChangeData : (value, rowIndex, header) => {
		dispatch(updateCell({
			value,
			header,
			row: rowIndex
		}));
	},
	reflectedData: (latest) => {
		dispatch(reflectedDataToCommand(latest));
	},
	deleteData : (rowIndex) => {
		dispatch(removeValueToData(rowIndex));
	},
	deleteKey : (columnKey) => {
		dispatch(removeKeyToData(columnKey));
	},
	addKey: (newDataObject) => {
		dispatch(addKeyToData(newDataObject));
	},
	addData: (newDataObject) => {
		dispatch(addValueToData(newDataObject));
	}
});

const mapStateToProps = state => {
	return {
		data: state.data
	};
};

const Data = connect(mapStateToProps, mapDispatchToProps)(DataTableController);

export {
	Data
};
export default Data;
