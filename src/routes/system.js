var NICS = require('../utils/os.js'),
		config = require('../../config.json');

var System = {
	getIP: function(req, res){
		var nics = NICS.getNetworkInfo();
		res.send( nics[0] );
	},
	getConfig: function(req, res){
		res.send( config.app );
	}
}

module.exports = System;
