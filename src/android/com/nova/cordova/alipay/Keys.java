/*
 * Copyright (C) 2010 The MobileSecurePay Project
 * All right reserved.
 * author: shiqun.shi@alipay.com
 *
 *  提示：如何获取安全校验码和合作身份者id
 *  1.用您的签约支付宝账号登录支付宝网站(www.alipay.com)
 *  2.点击“商家服务”(https://b.alipay.com/order/myorder.htm)
 *  3.点击“查询合作者身份(pid)”、“查询安全校验码(key)”
 */

package com.nova.cordova.alipay;


//
// 请参考 Android平台安全支付服务(msp)应用开发接口(4.2 RSA算法签名)部分，并使用压缩包中的openssl RSA密钥生成工具，生成一套RSA公私钥。
// 这里签名时，只需要使用生成的RSA私钥。
// Note: 为安全起见，使用RSA私钥进行签名的操作过程，应该尽量放到商家服务器端去进行。
public final class Keys {

	//合作身份者id，以2088开头的16位纯数字
	public static final String DEFAULT_PARTNER = "2088121379706305";

	//收款支付宝账号
	public static final String DEFAULT_SELLER = "xiaochouyushanzhi@qq.com";

	//商户私钥，自助生成
	public static final String PRIVATE = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAMjdmpyJM1yN5XnbBoCgWW4LB0cDYE1yP8MEJkww5VY0rabeK9GTA5cyImcZeQV7jyf3iVmK/P/9t8ACWJy1WApTpFpZDNLozrD757nKDnEq8Cj8E659EuicTtuIrlt36uxMZcu5fvgzQ+vq1Rh0Dcgv1Shjut/6UHF8ZuKiZ9Z3AgMBAAECgYBAuM8B01+eWgZwDjf5KDHIuHr+0cKtEbwj3WltsW+kKFMv6nSaEdHdXQUizV1me9qz2RoDpTpCTgFwOBFPZUtZbdY/8PvauJ8ZWacEoD4dpIEn6ernEsAE00uJe8T8I5oHXvHUCTSnBWze1aLhzYOqwf4FLchjqKusXSjrIvUkSQJBAPaQhDnxZX7V7ve3+CyGwkEUITCgMxyEqmmgYRgkOwbjhrU0csWyIBKEv6ejASgpp/I2JCeFobgtT9d9N0Uo3OsCQQDQjWVQlVO7V9Br4bSaskXDh3rjk/Wa1FfJIoin9b49F5sERcNCCIK1cq+oJZMm01tLr7tkD7FwB9efoshy25mlAkAN3hbxw1f4CERGfnxg1Lt8OYucVoZJZlTHWBPd7bu8KXPcITULVXdkUz8MSKi5/43Im67w4h00ZKgG8K35H9E9AkEAhQAXg7unqYtIJPTNG/bjHN5S1b3vXO1ciq4WXp8O0qEyQBhJfNw2l4brVR2ZaaJSz8Lji92iOCMYNPs4QF+h7QJAH998zx8ZslLHikX9flvhoWs24VZKNJroTycUzbJhOkb46hpp6xoZPDW5/d4tYrV778nirNsM8VjMK+jiiWBB7A==";

   //支付宝默认公钥 ，请勿修改
	public static final String PUBLIC = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnxj/9qwVfgoUh/y2W89L6BkRAFljhNhgPdyPuBV64bfQNN1PjbCzkIM6qRdKBoLPXmKKMiFYnkd6rAoprih3/PrQEB/VsW8OoM8fxn67UDYuyBTqA23MML9q1+ilIZwBC2AQ2UBVOrFXfFl75p6/B5KsiNG9zpgmLCUYuLkxpLQIDAQAB";

}
