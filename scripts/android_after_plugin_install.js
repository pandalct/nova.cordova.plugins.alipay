module.exports = function(context) {

	var cordova_util = context.requireCordovaModule("cordova-lib/src/cordova/util"),
    	ConfigParser = context.requireCordovaModule('cordova-common').ConfigParser,
    	fs = context.requireCordovaModule('fs');
    
    var xml = cordova_util.projectConfig(context.opts.projectRoot);
    var cfg = new ConfigParser(xml);

 	var packageName = cfg.packageName();
 	console.log(cfg,packageName);
 	var alipayPath = context.opts.projectRoot + '/platforms/android/com/nova/cordova/alipay';
 	var alipayKeysPath = alipayPath + '/Base64.java';

 	fs.readFile(context.opts.projectRoot + '/src/com/nova/cordova/Keys.java', 'utf8', function(err, data) {
 		if(err) throw err;
 		var result = data.replace(/PACKAGENAME/g, packageName);
 		fs.exists(alipayPath, function(exists) {
 			if(!exists) fs.mkdir(alipayPath);
 			
 			fs.exists(alipayKeysPath, function(fexists)	{
 				if(fexists) console.log(alipayKeysPath + ' is exists, Not be replaced.');
 				else {
 					fs.writeFile(alipayKeysPath, result, 'utf8', function(err) {
						if(err) throw err;
					});
 				}
 			});
 			
 		});
 		
 	});

}