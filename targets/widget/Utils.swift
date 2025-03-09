//
//  Util.swift
//  smarthome
//
//  Created by AKSHAY JADHAV on 09/03/25.
//

import Foundation

// Define supported device types
enum DeviceType: String {
  case lights, fan, thermostat
}

// Function to toggle boolean values (lights, fan) or update thermostat
func setDeviceState(for type: DeviceType, value: Any) {
    guard let userDefaults = UserDefaults(suiteName: "group.com.anonymous.smart-home") else {
        NSLog("⚠️ Error: Could not access UserDefaults")
        return
    }

    userDefaults.set(value, forKey: type.rawValue)
    userDefaults.synchronize() // Ensure the value is saved immediately
    NSLog("✅ Saved \(type.rawValue): \(value)")
}

func getDeviceState(for type: DeviceType) -> Any? {
    guard let userDefaults = UserDefaults(suiteName: "group.com.anonymous.smart-home") else {
        NSLog("⚠️ Error: Could not access UserDefaults")
        return nil
    }
    
    let value = userDefaults.object(forKey: type.rawValue) // Retrieve it as an Any?
    
    NSLog("📦 Retrieved \(type.rawValue): \(String(describing: value))")
    return value
}

func intToBool(_ value: Int) -> Bool {
    return value == 1
}
