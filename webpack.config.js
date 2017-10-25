const portscanner = require("portscanner");
const productconfig = require("./webpack.production.config");

const config = productconfig;

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

const portPromise = new Promise((resolve) => {
	portscanner.findAPortNotInUse(port, port + 10, host, (error, psport) => {
		config.devServer.port = psport; // Status is 'open' if currently in use or 'closed' if available
		config.devServer.host = host;
		resolve(config);
	});
});

module.exports = portPromise;

