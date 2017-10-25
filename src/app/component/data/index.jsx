import TextField from "material-ui/TextField";
import React, { PropTypes } from "react";
import FontIcon from "material-ui/FontIcon";
import { connect } from "react-redux";
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn
} from "material-ui/Table";
import * as _ from "lodash";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {
	addKeyToData,
	addValueToData,
	removeValueFromTable,
	removeKeyFromTable,
	reflectedDataToCommand,
	updateHeader,
	updateCell
} from "../../actions";

const cellStyle = {
	width: "50px",
	padding: "0 5"
};

const tableProps = {
	bodyStyle: {
		overflowX: "initial",
		overflowY: "initial"
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
		borderColor: "transparent"
	},
	underlineFocusStyle: {
		borderColor: "transparent"
	},
	inputStyle: {
		textAlign: "center"
	}
};

class DataTableController extends React.Component {
	componentDidUpdate() {
		this.props.reflectedData(this.props.data);
	}

	onClickDelete(deleteType, targetInfo) {
		if (deleteType === "column") {
			this.props.deleteKey(targetInfo);
		}

		if (deleteType === "row") {
			this.props.deleteData(targetInfo);
		}
	}

	onClickAdd(addType) {
		const headers = this.props.data.header;
		const rows = this.props.data.body.concat([]);
		let data = {};

		if (addType === "column") {
			const newLength = rows.length;
			const newKey = `data${headers.length + 1}`;
			const value = Array(...Array(newLength)).map(() => parseInt((Math.random() * 100), 10));
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

	getTextField(value, rowIndex, columnIndex) {
		const header = this.props.data.header[columnIndex - 1];
		return (<TextField
			name={`${rowIndex}_${columnIndex}`}
			value={value}
			onChange={(e, v) => { this.props.onChangeData(v, rowIndex, header); }}
			{...textFieldProps}
		/>);
	}

	getRemoveButton(deleteType, targetInfo) {
		return (<div className="remove-data">
			<FontIcon
				className="material-icons"
				onClick={() => this.onClickDelete(deleteType, targetInfo)} >
				remove_circle
			</FontIcon>
		</div>);
	}

	getAddButton(addType) {
		return (<div className={`add-data ${addType}`}>
			<FontIcon onClick={() => this.onClickAdd(addType)} className="material-icons">
				add_circle
			</FontIcon>
		</div>);
	}

	getHeaderTextField(headerKey, columnIndex) {
		const removeButton = this.getRemoveButton("column", headerKey);
		return (<div className="header-text">
			{removeButton}
			<TextField
				name={`${columnIndex}${headerKey}`}
				value={headerKey}
				onChange={(e, value) => { this.props.onChangeHeader(value, columnIndex - 1); }}
				{...textFieldProps}
			/>
		</div>);
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
			{tableData.map((row, rowIndex) => (<TableRow key={rowIndex} className="table-row">
				{this.getBodyRow(row, rowIndex)}
			</TableRow>))}
			<TableRow>
				<TableRowColumn style={cellStyle}>
					{this.getAddButton("row")}
				</TableRowColumn>
			</TableRow>
		</TableBody>);
	}

	getBodyRow(row, rowIndex) {
		const values = this.props.data.header.map(header => row[header]);
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

		return (<div className="data-table">
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<Table {...tableProps}>
					{header}
					{body}
				</Table>
			</MuiThemeProvider>
		</div>);
	}
}


const mapDispatchToProps = dispatch => ({
	onChangeHeader: (value, columnIndex) => {
		dispatch(updateHeader({
			value,
			column: columnIndex
		}));
	},
	onChangeData: (value, rowIndex, header) => {
		dispatch(updateCell({
			value,
			header,
			row: rowIndex
		}));
	},
	reflectedData: (latest) => {
		dispatch(reflectedDataToCommand(latest));
	},
	deleteData: (rowIndex) => {
		dispatch(removeValueFromTable(rowIndex));
	},
	deleteKey: (columnKey) => {
		dispatch(removeKeyFromTable(columnKey));
	},
	addKey: (newDataObject) => {
		dispatch(addKeyToData(newDataObject));
	},
	addData: (newDataObject) => {
		dispatch(addValueToData(newDataObject));
	}
});

DataTableController.defaultProps = {
	data: {
		header: [],
		body: []
	}
};

DataTableController.propTypes = {
	onChangeHeader: PropTypes.func.isRequired,
	onChangeData: PropTypes.func.isRequired,
	addKey: PropTypes.func.isRequired,
	addData: PropTypes.func.isRequired,
	deleteKey: PropTypes.func.isRequired,
	deleteData: PropTypes.func.isRequired,
	reflectedData: PropTypes.func.isRequired,
	data: PropTypes.shape({
		header: PropTypes.arrayOf(PropTypes.string),
		body: PropTypes.arrayOf(PropTypes.object)
	})
};

const mapStateToProps = state => ({
	data: state.data
});

const Data = connect(mapStateToProps, mapDispatchToProps)(DataTableController);

export {
	Data
};
export default Data;
