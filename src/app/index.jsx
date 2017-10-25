import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Chart } from "./component/chart";
import { GUI } from "./component/gui";
import { TabViews } from "./component/tabs";
import { Guide } from "./component/guide";
import playgroundApp from "./reducers";

const store = createStore(playgroundApp);
const root = document.querySelector("#app");

ReactDOM.render(
	<Provider store={store}>
		<div id="wrapper">
			<div className="bbtitle">
				<span><span role="img" aria-label="palette">🎨</span>  Let&rsquo;s play with</span>
				<a href="https://naver.github.io/billboard.js/" target="_blank" rel="noopener noreferrer">
					<i alt="billboardjs logo" className="logo" />
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

document.body.className = "";
