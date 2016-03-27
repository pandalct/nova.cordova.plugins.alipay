iOS



phonegap plugin add /Users/terry/Projects/nova.cordova.plugins.alipay --variable PARTNER=2088121379706305 --variable SELLER=xiaochouyushanzhi@qq.com --variable PRIVATE=MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAMjdmpyJM1yN5XnbBoCgWW4LB0cDYE1yP8MEJkww5VY0rabeK9GTA5cyImcZeQV7jyf3iVmK/P/9t8ACWJy1WApTpFpZDNLozrD757nKDnEq8Cj8E659EuicTtuIrlt36uxMZcu5fvgzQ+vq1Rh0Dcgv1Shjut/6UHF8ZuKiZ9Z3AgMBAAECgYBAuM8B01+eWgZwDjf5KDHIuHr+0cKtEbwj3WltsW+kKFMv6nSaEdHdXQUizV1me9qz2RoDpTpCTgFwOBFPZUtZbdY/8PvauJ8ZWacEoD4dpIEn6ernEsAE00uJe8T8I5oHXvHUCTSnBWze1aLhzYOqwf4FLchjqKusXSjrIvUkSQJBAPaQhDnxZX7V7ve3+CyGwkEUITCgMxyEqmmgYRgkOwbjhrU0csWyIBKEv6ejASgpp/I2JCeFobgtT9d9N0Uo3OsCQQDQjWVQlVO7V9Br4bSaskXDh3rjk/Wa1FfJIoin9b49F5sERcNCCIK1cq+oJZMm01tLr7tkD7FwB9efoshy25mlAkAN3hbxw1f4CERGfnxg1Lt8OYucVoZJZlTHWBPd7bu8KXPcITULVXdkUz8MSKi5/43Im67w4h00ZKgG8K35H9E9AkEAhQAXg7unqYtIJPTNG/bjHN5S1b3vXO1ciq4WXp8O0qEyQBhJfNw2l4brVR2ZaaJSz8Lji92iOCMYNPs4QF+h7QJAH998zx8ZslLHikX9flvhoWs24VZKNJroTycUzbJhOkb46hpp6xoZPDW5/d4tYrV778nirNsM8VjMK+jiiWBB7A== --variable PUBLIC=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnxj/9qwVfgoUh/y2W89L6BkRAFljhNhgPdyPuBV64bfQNN1PjbCzkIM6qRdKBoLPXmKKMiFYnkd6rAoprih3/PrQEB/VsW8OoM8fxn67UDYuyBTqA23MML9q1+ilIZwBC2AQ2UBVOrFXfFl75p6/B5KsiNG9zpgmLCUYuLkxpLQIDAQAB


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
