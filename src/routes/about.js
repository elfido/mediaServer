var About = {
	configInfo: {},
	getAbout: function(req, res){
		res.send( About.configInfo );
	},
	setClusterId: function( workerId ){
		About.configInfo.workerId = workerId;
	},
	setInfo: function( info ){
		About.configInfo = {};
		About.configInfo.app = info.name;
		About.configInfo.version = info.version;
	}
}

module.exports = About;
