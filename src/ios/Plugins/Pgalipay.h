//
//  pgalipay.h
//  pgtest
//
//  Created by breadth on 14-7-31.
//
//

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>
#import <UIKit/UIKit.h>
#import <Cordova/CDVViewController.h>
#import <AlipaySDK/AlipaySDK.h>
@interface Pgalipay : CDVPlugin
{
    SEL _result;
}
 

-(void)alipay:(CDVInvokedUrlCommand*)command;
 

@end





 