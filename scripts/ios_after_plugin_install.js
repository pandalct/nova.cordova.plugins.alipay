//				ENABLE_BITCODE = YES;
//				ENABLE_BITCODE = NO;
module.exports = function(context) {

    var cordova_util = context.requireCordovaModule("cordova-lib/src/cordova/util"),
        ConfigParser = context.requireCordovaModule('cordova-common').ConfigParser,
        fs = context.requireCordovaModule('fs'),
        path = context.requireCordovaModule('path'),
     	exec = require('child_process').exec,
     	xcode = require('xcode');

    var xml = cordova_util.projectConfig(context.opts.projectRoot);
    var cfg = new ConfigParser(xml);
    var packageName = cfg.packageName();
    // var androidJSON = JSON.parse(fs.readFileSync(context.opts.projectRoot + '/plugins/android.json'));
    var appName = cfg.name();

    var alipayPluginPath = context.opts.projectRoot + path.sep+'plugins/nova.cordova.plugins.alipay/src/ios';
    var alipayProjectRootPath = context.opts.projectRoot +path.sep+ 'platforms/ios';

    projectPath = alipayProjectRootPath + path.sep +  appName + '.xcodeproj/project.pbxproj';
    console.log('projectPath',projectPath);
	var myProj = xcode.project(projectPath);

    var target = alipayProjectRootPath + path.sep + appName +path.sep+'Plugins/nova.cordova.plugins.alipay';
    var source = alipayPluginPath+path.sep+'root';

    

    exec('cp -r '+source+path.sep+'* '+target,function(){
  //   	myProj.parse(function (err) {
  //   		var pluginsGroup = myProj.findPBXGroupKey({name: 'Plugins'});

  //   		// myProj.addStaticLibrary('libcrypto.a', {}, pluginsGroup);
  //   		// myProj.addStaticLibrary('libssl.a', {}, pluginsGroup);
		//     // myProj.addHeaderFile(target+'/libcrypto.a', {}, pluginsGroup);
		//     // myProj.addHeaderFile(target+'/libssl.a', {}, pluginsGroup);
		//     // myProj.addHeaderFile(target+'/AlipaySDK.Bundle', {}, pluginsGroup);
		//     // myProj.addHeaderFile(target+'/AlipaySDK.framework', {}, pluginsGroup);
		//     fs.writeFileSync(projectPath, myProj.writeSync());
		// });
    });
	//fstream.Reader(source).pipe(target);
	

	source = alipayPluginPath+path.sep+'classes';

	exec('cp -r '+source+path.sep+'* '+target,function(){
		myProj.parse(function (err) {
			var pluginsGroup = myProj.findPBXGroupKey({name: 'Plugins'});
		    var opensslGroup = myProj.pbxCreateGroup('openssl', 'nova.cordova.plugins.alipay/openssl');

		    var openssl_path = alipayProjectRootPath + path.sep + appName + '/Plugins/nova.cordova.plugins.alipay/openssl';
		    var openssl_files=fs.readdirSync(openssl_path);  
		    for(fn in openssl_files)  
		    {  
		    	var fname = openssl_path+path.sep+openssl_files[fn]; 
		    	myProj.addHeaderFile(openssl_files[fn], {}, opensslGroup);
		    }

		    myProj.addToPbxGroup(opensslGroup, pluginsGroup);

		    var utilGroup = myProj.pbxCreateGroup('Util', 'nova.cordova.plugins.alipay/Util');

		    var util_path = alipayProjectRootPath + path.sep + appName + '/Plugins/nova.cordova.plugins.alipay/Util';
		    var util_files=fs.readdirSync(util_path);  
		    for(fn in util_files)  
		    {  
		    	var fname = util_path+path.sep+util_files[fn]; 
		    	if(fname.substring(fname.length - 2) == '.m'){
		    		myProj.addSourceFile(util_files[fn], {}, utilGroup);
		    	}else{
		    		myProj.addHeaderFile(util_files[fn], {}, utilGroup);
		    	}
		    	
		    	
		    }
		    myProj.addToPbxGroup(utilGroup, pluginsGroup);
	     	
		    fs.writeFileSync(projectPath, myProj.writeSync());
		});
	});

	

	myProj.parse(function (err) {
		var searchPath = '"$(PROJECT_DIR)/$(PROJECT_NAME)/Plugins/nova.cordova.plugins.alipay"';
	    myProj.addToHeaderSearchPaths(searchPath);
	    myProj.addToLibrarySearchPaths(searchPath);
	    myProj.updateBuildProperty('ENABLE_BITCODE', '"NO"', 'Debug');
	    myProj.updateBuildProperty('ENABLE_BITCODE', '"NO"', 'Release');

	    fs.writeFileSync(projectPath, myProj.writeSync());
	});

	var iosJSON = JSON.parse(fs.readFileSync(context.opts.projectRoot + '/plugins/ios.json'));
	var alipayFolderPath = alipayProjectRootPath +path.sep + appName + '/Plugins/nova.cordova.plugins.alipay';
	var alipayFile = alipayFolderPath+'/Pgalipay.m';
    fs.readFile(alipayFile, 'utf8', function(err, data) {
        if (err) throw err;
        var result = data.replace(/\$PARTNER/g, iosJSON.installed_plugins["nova.cordova.plugins.alipay"].PARTNER);
        result = result.replace(/\$SELLER/g, iosJSON.installed_plugins["nova.cordova.plugins.alipay"].SELLER);
        result = result.replace(/\$PRIVATE/g, iosJSON.installed_plugins["nova.cordova.plugins.alipay"].PRIVATE);
        result = result.replace(/\$SCHEME/g, iosJSON.installed_plugins["nova.cordova.plugins.alipay"].SCHEME);
        fs.exists(alipayFolderPath, function(exists) {
            if (!exists) fs.mkdir(alipayFolderPath);
            fs.writeFile(alipayFile, result, 'utf8', function(err) {
                if (err) throw err;
            });
        });

    });

}
