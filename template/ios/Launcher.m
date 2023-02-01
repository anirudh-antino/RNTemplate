//
//  Launcher.m
//  RNTemplate
//
//  Created by Anirudh Malik on 01/02/23.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(Launcher,RCTEventEmitter)

RCT_EXTERN_METHOD(requestNotificationAuthorization:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(sendNotification:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(launch:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(increment:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(decrement:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
@end
