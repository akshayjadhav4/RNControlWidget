//
//  Utils.swift
//  smarthome
//
//  Created by AKSHAY JADHAV on 11/03/25.
//

import Foundation

func getIconName(for device: DeviceTypeEntity, isOn: Bool) -> String {
    switch device.name {
    case "Living Room Light":
        return isOn ? "lightbulb.fill" : "lightbulb"
    case "Bedroom Fan":
        return isOn ? "fanblades.fill" : "fanblades"
    case "Thermostat":
        return isOn ? "thermometer.sun.fill" : "thermometer.snowflake"
    default:
        return isOn ? "power.circle.fill" : "power.circle"
    }
}
