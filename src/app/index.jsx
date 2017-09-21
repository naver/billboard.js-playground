import React from "react";
import ReactDOM from "react-dom";
import {
	Provider
} from "react-redux";
import {
	createStore
} from "redux";
import IconButton from 'material-ui/IconButton';

import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import { Chart } from "./component/chart";
import { GUI } from "./component/gui";
import { Command } from "./component/command";
import { Data } from "./component/data";
import { TabViews } from "./component/tabviews";
import { Guide } from "./component/guide";
import playgroundApp from "./reducers";

const store = createStore(playgroundApp);
const root = document.querySelector("#app");
const LOGO = "https://camo.githubusercontent.com/57e3b293b28f0b65799b710211267674d3aa8424/68747470733a2f2f6e617665722e6769746875622e696f2f62696c6c626f6172642e6a732f696d672f6c6f676f2f62696c6c626f6172642e6a732e737667";

ReactDOM.render(
	<Provider store={store}>
		<div id="wrapper">
			<div className="bbtitle">
				<span>🎨 Play with</span>
				<a href="https://naver.github.io/billboard.js/" target="_blank">
					<img className="logo" src={LOGO}/>
				</a>
			</div>
			<Chart />
			<TabViews />
			<GUI />
			<Guide />
		</div>
	</Provider>,
	root
);


