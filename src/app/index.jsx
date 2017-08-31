import React from "react";
import ReactDOM from "react-dom";
import {
	Provider
} from "react-redux";
import {
	createStore
} from "redux";

import { DefaultConfigure } from "./component/defaultConfigure";
import { Chart } from "./component/chart";
import { UserConfigure } from "./component/userConfigure";
import playgroundApp from "./reducers";

const store = createStore(playgroundApp);
const root = document.querySelector("#app");

ReactDOM.render(
	<Provider store={store}>
		<div id="wrapper">
			<Chart />
			<UserConfigure />
			<div className="scroll">
				<DefaultConfigure />
			</div>
		</div>
	</Provider>,
	root
);
