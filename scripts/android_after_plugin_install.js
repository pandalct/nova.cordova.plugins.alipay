module.exports = function(context) {

	var cordova_util = context.requireCordovaModule("cordova-lib/src/cordova/util"),
    	ConfigParser = context.requireCordovaModule('cordova-common').ConfigParser,
    	fs = context.requireCordovaModule('fs');
    
    var xml = cordova_util.projectConfig(context.opts.projectRoot);
    var cfg = new ConfigParser(xml);

 	var packageName = cfg.packageName();
 	var androidJSON = JSON.parse(fs.readFileSync(context.opts.projectRoot + '/plugins/android.json'));
 	var alipayPath = context.opts.projectRoot + '/platforms/android/src/com/nova/cordova/alipay';
 	var alipayKeysPath = alipayPath + '/Keys.java';

 	fs.readFile(context.opts.projectRoot + '/plugins/com.nova.cordova.alipay/src/android/com/nova/cordova/alipay/Keys.java', 'utf8', function(err, data) {
 		if(err) throw err;
 		var result = data.replace(/\$PARTNER/g, androidJSON.installed_plugins["com.nova.cordova.alipay"].PARTNER);
 		result = data.replace(/\$SELLER/g, androidJSON.installed_plugins["com.nova.cordova.alipay"].SELLER);
 		result = data.replace(/\$PRIVATE/g, androidJSON.installed_plugins["com.nova.cordova.alipay"].PRIVATE);
 		result = data.replace(/\$PUBLIC/g, androidJSON.installed_plugins["com.nova.cordova.alipay"].PUBLIC);
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