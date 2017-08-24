import React from "react";
import ReactDOM from "react-dom";
import * as option from "./document.json";
import { Config, Chart, Data } from "./view";

const config = document.querySelector("#config");
const chart = document.querySelector("#chart");
const data = document.querySelector("#data");

ReactDOM.render(
	<Config
		options={option}
	/>,
	config
);

ReactDOM.render(
	<Chart />,
	chart
);


ReactDOM.render(
	<Data />,
	data
);
