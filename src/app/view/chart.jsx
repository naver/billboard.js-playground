import React from "react";
import BB from "react-billboardjs";

class Chart extends React.Component {
	render() {
		const config = {
			data: {
				columns: [
					['data1', 30, 200, 100, 400, 150, 250],
					['data2', 50, 20, 10, 40, 15, 25],
					['data3', 50, 20, 10, 40, 15, 25]
				]
			}
		};

		return <BB
			id="reactChart"
			{...config}
		/>;
	}
}

export {
	Chart,
};
export default Chart;
