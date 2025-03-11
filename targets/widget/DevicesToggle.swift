//
//  LightsControl.swift
//  smarthome
//
//  Created by AKSHAY JADHAV on 09/03/25.
//

import SwiftUI
import WidgetKit
import AppIntents


@available(iOS 18.0, *)
struct DeviceToggle: ControlWidget {
  
  static let kind: String = "com.anonymous.smart-home.LightsToggle"
  
  var body: some ControlWidgetConfiguration {
    AppIntentControlConfiguration(
      kind: Self.kind,
      provider: ConfigurableProvider()
    ) { deviceState in
      ControlWidgetToggle(
        deviceState.deviceType.name,
        isOn: deviceState.isOn,
        action: DeviceToggleIntent(deviceType: deviceState.deviceType)
      ) { isOn in
        Label(
          isOn ? "ON" : "OFF", systemImage: getIconName(for: deviceState.deviceType, isOn: isOn)
        )
        .controlWidgetActionHint(isOn ? "ON" : "OFF")
      }
      .tint(Color("primary"))
    }
    .displayName("Smart Home Devices")
    .description("Control your smart home devices")
    .promptsForUserConfiguration()
  }
}

extension DeviceToggle {
  struct ConfigurableProvider: AppIntentControlValueProvider {
    
    func previewValue(configuration: SelectDeviceIntent) -> DeviceState {
      DeviceState(deviceType: configuration.deviceType ?? .init(id: "1", name: "Living Room Light"), isOn:  false)
    }
    
    func currentValue(configuration: SelectDeviceIntent) async throws -> DeviceState {
      let deviceType = configuration.deviceType ?? .init(id: "1", name: "Living Room Light")
      
      let isOn = await fetchDeviceState(for: deviceType)
      return DeviceState(deviceType: deviceType, isOn: isOn)
    }
    
  }
}


@available(iOS 18.0, *)
struct SelectDeviceIntent: ControlConfigurationIntent {
  static var title: LocalizedStringResource = "Configure Device"
  
  @Parameter(title: "Device")
  var deviceType: DeviceTypeEntity?
  
  init() {}
  init(_ deviceType: DeviceTypeEntity?) {
    self.deviceType = deviceType
  }
  
  func perform() async throws -> some IntentResult {
    return .result()
  }
}



@available(iOS 18.0, *)
struct DeviceToggleIntent: SetValueIntent {
  static var title = LocalizedStringResource("Device Operation Mode")
  
  @Parameter(title: "isOn")
  var value: Bool
  
  @Parameter(title: "Device")
  var deviceType: DeviceTypeEntity
  
  init() {}
  
  init(deviceType: DeviceTypeEntity) {
    self.deviceType = deviceType
  }
  
  func perform() async throws -> some IntentResult {
    guard let userDefaults = UserDefaults(suiteName: "group.com.anonymous.smart-home") else { return .result() }
    userDefaults.set(value ? 1 : 0 , forKey: "deviceState_\(deviceType.id)")
    return .result()
  }
}



@available(iOS 18.0, *)
struct DeviceTypeEntity: Identifiable, AppEntity {
  static var typeDisplayRepresentation: TypeDisplayRepresentation = "Smart Device Type"
  
  static var defaultQuery = DeviceTypeEntityQuery()
  
  var id: String
  var name: String
  
  var displayRepresentation: DisplayRepresentation {
    .init(title: "\(name)")
  }
}


@available(iOS 18.0, *)
struct DeviceTypeEntityQuery: EntityQuery {
  func entities(for identifiers: [DeviceTypeEntity.ID]) async throws -> [DeviceTypeEntity] {
    return allDevices().filter { identifiers.contains($0.id) }
  }
  
  func suggestedEntities() async throws -> [DeviceTypeEntity] {
    return allDevices()
  }
  
  private func allDevices() -> [DeviceTypeEntity] {
    return [
      DeviceTypeEntity(id: "1", name: "Living Room Light"),
      DeviceTypeEntity(id: "2", name: "Bedroom Fan"),
      DeviceTypeEntity(id: "3", name: "Thermostat")
    ]
  }
}


struct DeviceState {
  let deviceType: DeviceTypeEntity
  let isOn: Bool
}

func fetchDeviceState(for device: DeviceTypeEntity) async -> Bool {
  guard let userDefaults = UserDefaults(suiteName: "group.com.anonymous.smart-home") else { return false }
  
  // Retrieve the value for the specific device key, defaulting to false if not found
  let isOn = userDefaults.integer(forKey: "deviceState_\(device.id)") == 1
  return isOn
}
