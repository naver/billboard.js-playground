import React from "react";
import ReactDOM from "react-dom";
import {
	Provider
} from "react-redux";
import {
	createStore
} from "redux";


import * as option from "./document.json";
import { Config } from "./component/config";
import { Chart } from "./component/chart";
import { Data } from "./component/data";
import playgroundApp from "./reducers";

const store = createStore(playgroundApp);
const app = document.querySelector("#app");

const App = () => (<div>
	<Chart />
	<Data />
	<Config options={option} />
</div>);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	app
);
