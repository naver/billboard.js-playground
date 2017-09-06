import React from "react";
import ReactDOM from "react-dom";
import {
	Provider
} from "react-redux";
import {
	createStore
} from "redux";

import { Chart } from "./component/chart";
import { GUI } from "./component/gui";
import { Command } from "./component/command";
import playgroundApp from "./reducers";

const store = createStore(playgroundApp);
const root = document.querySelector("#app");

ReactDOM.render(
	<Provider store={store}>
		<div id="wrapper">
			<Chart />
			<Command />
			<div className="scroll">
				<GUI />
			</div>
		</div>
	</Provider>,
	root
);
