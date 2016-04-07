iOS



phonegap plugin add /Users/terry/Projects/nova.cordova.plugins.alipay --variable PARTNER={PARTNER} --variable SELLER={SELLER} --variable PRIVATE={PRIVATE} --variable PUBLIC={PUBLIC}


#import <AlipaySDK/AlipaySDK.h>


在以下方法的 最后面添加：

 - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
 

 //＊＊＊＊＊＊＊＊＊＊＊
    
    
    //支付宝app
    //如果极简SDK不可用，会跳转支付宝钱包进行支付，需要将支付宝钱包的支付结果回传给SDK
    if ([url.host isEqualToString:@"safepay"]) {
        [[AlipaySDK defaultService] processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
            NSLog(@"result1 = %@",resultDic);
            
            NSDictionary *memo = [resultDic objectForKey:@"memo"];
            NSObject *resultStatus = [resultDic objectForKey:@"resultStatus"];
            NSObject *result = [resultDic objectForKey:@"result"];
            
            NSString *astring =  [[NSString alloc] initWithString:[NSString stringWithFormat:@"{\"memo\": \"%@\",\"resultStatus\": \"%@\",\"result\": \"%@\"}",memo,resultStatus,result]];
            
            [self.viewController.webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"resultString('%@')",astring]];
        }];
        
    }
    if ([url.host isEqualToString:@"platformapi"]){//支付宝钱包快登授权返回authCode
        [[AlipaySDK defaultService] processAuthResult:url standbyCallback:^(NSDictionary *resultDic) {
            NSLog(@"result2 = %@",resultDic);
            [self.viewController.webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"resultString('%@')",resultDic]];
        }];
    }
    //支付宝支付完成后结果end
    
    //＊＊＊＊＊＊＊＊＊＊＊

return YES;之前添加：
