//
//  pgalipay.h
//  pgtest
//
//  Created by breadth on 14-7-31.
//
//

#import "Pgalipay.h"
#import "Order.h"
#import "Util/DataSigner.h"
#import <Cordova/CDVPlugin.h>
#import <QuartzCore/QuartzCore.h>

#import <AlipaySDK/AlipaySDK.h>


@implementation Pgalipay


- (void)alipay:(CDVInvokedUrlCommand *)command{
  
    
   NSString* out_trade_no = [command.arguments objectAtIndex:0];
   NSString* subject = [command.arguments objectAtIndex:1];
   NSString* bodtxt = [command.arguments objectAtIndex:2];
   NSString* total_fee = [command.arguments objectAtIndex:3];
   NSString* url = [command.arguments objectAtIndex:4];
   float floatStringfee = [total_fee floatValue];
     NSLog(@"%@",subject);
    
    //合作身份者id，以2088开头的16位纯数字
    NSString *partner = @"$PARTNER";
    //收款支付宝账号
    NSString *seller = @"$SELLER";
    //商户私钥，自助生成  －－将私钥转成PKCS8替换一下原私钥即可
    NSString *privateKey = @"$PRIVATE";
    /*============================================================================*/
    //应用注册scheme,在AlixPayDemo-Info.plist定义URL types
	NSString *appScheme = @"$Scheme";
	
	//partner和seller获取失败,提示
	if ([partner length] == 0 || [seller length] == 0)
	{
		UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"提示"
														message:@"缺少partner或者seller。"
													   delegate:self
											  cancelButtonTitle:@"确定"
											  otherButtonTitles:nil];
		[alert show];
		return;
	}
	
	/*
	 *生成订单信息及签名
	 */
	//将商品信息赋予AlixPayOrder的成员变量
    Order *order = [[Order alloc] init];
	order.partner = partner;
	order.seller = seller;
	order.tradeNO = out_trade_no; //订单ID（由商家自行制定）
	order.productName = subject; //商品标题
	order.productDescription = bodtxt; //商品描述
	order.amount = [NSString stringWithFormat:@"%.2f",floatStringfee]; //商品价格
	order.notifyURL =  url; //回调URL
    
    order.service = @"mobile.securitypay.pay";
    order.paymentType = @"1";
    order.inputCharset = @"utf-8";
    order.itBPay = @"30m";
	
	
	
	//将商品信息拼接成字符串
	NSString *orderSpec = [order description];
	NSLog(@"orderSpec = %@",orderSpec);
	
	//获取私钥并将商户信息签名,外部商户可以根据情况存放私钥和签名,只需要遵循RSA签名规范,并将签名字符串base64编码和UrlEncode
	id<DataSigner> signer = CreateRSADataSigner(privateKey);
	NSString *signedString = [signer signString:orderSpec];
	
	//将签名成功字符串格式化为订单字符串,请严格按照该格式
	NSString *orderString = nil;
	if (signedString != nil) {
		orderString = [NSString stringWithFormat:@"%@&sign=\"%@\"&sign_type=\"%@\"",
                       orderSpec, signedString, @"RSA"];
        
        [[AlipaySDK defaultService] payOrder:orderString fromScheme:appScheme callback:^(NSDictionary *resultDic) {
            NSLog(@"reslut3 = %@",resultDic);
            
            NSDictionary *memo = [resultDic objectForKey:@"memo"];
            NSObject *resultStatus = [resultDic objectForKey:@"resultStatus"];
            NSObject *result = [resultDic objectForKey:@"result"];
            
            NSString *astring =  [[NSString alloc] initWithString:[NSString stringWithFormat:@"{\"memo\": \"%@\",\"resultStatus\": \"%@\",\"result\": \"%@\"}",memo,resultStatus,result]];
            
            NSLog(@"支付返回信息:%@：",astring);

            
            CDVPluginResult* pluginResult = nil;
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:astring];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }];
        
     }
 
 }
 
 @end
 
