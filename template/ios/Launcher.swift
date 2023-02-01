//
//  Launcher.swift
//  RNTemplate
//
//  Created by Anirudh Malik on 01/02/23.
//

import Foundation
import UIKit
import CallKit
import UserNotifications

@objc(Launcher)
class Launcher: RCTEventEmitter, CXProviderDelegate{
  
  let userNotificationCenter = UNUserNotificationCenter.current()
  
  private var count = 0;
  
  @objc
  func requestNotificationAuthorization(_ callback:RCTResponseSenderBlock) {
    let authOptions = UNAuthorizationOptions.init(arrayLiteral: .alert, .badge, .sound)
        
        self.userNotificationCenter.requestAuthorization(options: authOptions) { (success, error) in
            if let error = error {
                print("Error: ", error)
            }
        }
    callback(["done"])
  }
  
  @objc
  func sendNotification(_ callback:RCTResponseSenderBlock) {
    let notificationContent = UNMutableNotificationContent()
        notificationContent.title = "Test"
        notificationContent.body = "Test body"
        notificationContent.badge = NSNumber(value: 3)
        
        if let url = Bundle.main.url(forResource: "dune",
                                    withExtension: "png") {
            if let attachment = try? UNNotificationAttachment(identifier: "dune",
                                                            url: url,
                                                            options: nil) {
                notificationContent.attachments = [attachment]
            }
        }
        
        let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 5,
                                                        repeats: false)
        let request = UNNotificationRequest(identifier: "testNotification",
                                            content: notificationContent,
                                            trigger: trigger)
        
    userNotificationCenter.add(request) { (error) in
      if let error = error {
        print("Notification Error: ", error)
      }
    }
    callback(["displayed"])
  }
  
  @objc
    func launch(_ callback:RCTResponseSenderBlock){
      let provider = CXProvider(configuration: CXProviderConfiguration(localizedName: "RNTemplate"))
             provider.setDelegate(self, queue: nil)
             let update = CXCallUpdate()
             update.remoteHandle = CXHandle(type: .generic, value: "Requesting Entry..")
             provider.reportNewIncomingCall(with: UUID(), update: update, completion: { error in })
         
      callback(["launched"])
    }
  
  func providerDidReset(_ provider: CXProvider) {
  }
  func provider(_ provider: CXProvider, perform action: CXAnswerCallAction) {
          action.fulfill()
      }

  func provider(_ provider: CXProvider, perform action: CXEndCallAction) {
          action.fulfill()
      }
  
  
  
  
  
  
  
  
  
  
  @objc
    func increment(_ callback:RCTResponseSenderBlock){
      count += 1;
      callback([count])
      sendEvent(withName: "onIncrement", body: ["count increase",count])
    }
  
  @objc
    override static func requiresMainQueueSetup() ->Bool{
      return true;
    }
    
    @objc
    override func constantsToExport() -> [AnyHashable: Any]!{
      return ["initialCount": 0];
    }
    
    override func supportedEvents() -> [String]! {
      return ["onIncrement","onDecrement"];
    }
    
    @objc
    func decrement(_ resolve:RCTPromiseResolveBlock,
                   reject:RCTPromiseRejectBlock)
    {
      if(count == 0)
      {
        let error = NSError(domain: "", code: 200, userInfo: nil);
        reject("ERROR_COUNT","count cannot be negative",error);
      }
      else{
        count -= 1;
        resolve("count is \(count)");
        sendEvent(withName: "onDecrement", body: ["count decrease",count])
      }
    }
}
