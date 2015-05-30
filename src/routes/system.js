var NICS = require('../utils/os.js');

var System = {
	getIP: function(req, res){
		var nics = NICS.getNetworkInfo();
		res.send( nics[0] );
	}
}

module.exports = System;
