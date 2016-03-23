/**
 * cordova is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) Matt Kane 2010
 * Copyright (c) 2011, IBM Corporation
 */

cordova.define("cordova/plugins/Pgalipay", 
  function(require, exports, module) {
    var exec = require("cordova/exec");
    var Pgalipay = function() {};
     //----------------------------//��ַ��ѯ---------------------------------------
      Pgalipay.prototype.alipay = function(out_trade_no,subject,bodtxt,total_fee,successCallback, errorCallback) {
        if (errorCallback == null) { errorCallback = function() {}}
    
        if (typeof errorCallback != "function")  {
            console.log("pgbaidumap.scan failure: failure parameter not a function");
            return
        }
    
        if (typeof successCallback != "function") {
            console.log("pgbaidumap.scan failure: success callback parameter must be a function");
            return
        }
    
        exec(successCallback, errorCallback, 'Pgalipay', 'alipay', [{"out_trade_no":out_trade_no, "subject": subject,"bodtxt":bodtxt, "total_fee": total_fee}]);
    };
    
    var Pgalipay = new Pgalipay();
    module.exports = Pgalipay;

});

  
if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.Pgalipay) {
    window.plugins.Pgalipay = cordova.require("cordova/plugins/Pgalipay");
}