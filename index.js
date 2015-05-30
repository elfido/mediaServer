var express = require('express'),
	swig = require('swig'),
	config_package = require("./package.json"),
	morgan = require('morgan'), //logger
	bodyParser = require('body-parser'),
	aboutAPI = require('./src/routes/about'),
	systemAPI = require('./src/routes/system'),
	app = express(),
	configuration = require('./config.json'),
	cluster = require('cluster'),
	cpuCount = require('os').cpus().length;

var views = [
		{path: "/", html: "index"},
		{path: "/about", html: "about"}
	],
	urlPrefix = "media";

var homeCenter = {
	initAPI: function( workerId ){
		//start routes here
		var api = "/"+urlPrefix+"/api";
		aboutAPI.setInfo( config_package );
		aboutAPI.setClusterId( workerId );
		app.get( api+'/about', aboutAPI.getAbout );
		app.get( api+'/system/ip', systemAPI.getIP );
	},
	initViews: function( workerId ){
		console.log("Starting UI");
		var _this = this;
		for (var i=0; i<views.length; i++){
			var view = views[i];
			app.get(view.path, function (req, res) {
				res.render(this.html, {} );
			}.bind(view));
		}
	},
	expressSetup: function(){
		morgan(':remote-addr :method :url');
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(bodyParser.json());
		app.engine('html', swig.renderFile);
		app.set('view engine', 'html');
		app.set('views', __dirname + '/views');
		app.set('view cache', false);
		swig.setDefaults({ cache: false });
		app.use(express.static(__dirname+'/src/public'));
	},
	init: function(){
		if (cluster.isMaster) {
				console.log("master cluster");
				for (var i = 0; i < cpuCount; i += 1) {
						cluster.fork();
				}
		} else {
			var workerId = cluster.worker.id;
			this.expressSetup();
			this.initAPI( workerId );
			this.initViews( workerId );
			app.listen(configuration.server.port);
			console.log('Application started on port ' + configuration.server.port + " id: "+workerId);
		}
	}
};

homeCenter.init();
