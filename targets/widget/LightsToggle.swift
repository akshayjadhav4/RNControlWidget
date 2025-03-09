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
struct LightsToggle: ControlWidget {
  
  static let kind: String = "com.anonymous.smart-home.LightsToggle"
  
  var body: some ControlWidgetConfiguration {
    StaticControlConfiguration(
      kind: Self.kind,
      provider: Provider()
    ) { value in
      ControlWidgetToggle("Lights", isOn: value, action: LightsToggleIntent()) { isOn in
        Label(value ? "ON" : "OFF", systemImage: value ? "lightbulb.fill" : "lightbulb")
          .controlWidgetActionHint(value ? "ON" : "OFF")
      }
      .tint(Color("primary"))
    }
    .displayName("Smart Home Lights")
    .description("Toggle your smart home lights.")
  }
}

@available(iOS 18.0, *)
extension LightsToggle {
  struct Provider: ControlValueProvider {
    var previewValue: Bool {
      false
    }
    
    
    func currentValue() async throws -> Bool {
      let intValue: Int = (getDeviceState(for: .lights) as? Int) ?? 0
      let isOn = intToBool(intValue)
      return isOn
    }
  }
}

@available(iOS 18.0, *)
struct LightsToggleIntent: SetValueIntent {
  static var title: LocalizedStringResource = "Smart Home Lights"
  
  
  @Parameter(title: "Light Status")
  var value: Bool
  
  
  func perform() async throws -> some IntentResult {
    let intValue: Int = (getDeviceState(for: .lights) as? Int) ?? 0
    let isOn = intToBool(intValue)
    setDeviceState(for: .lights, value: isOn ? 0 : 1) // Toggle: 1 → 0, 0 → 1
    
    await WidgetCenter.shared.reloadTimelines(ofKind: LightsToggle.kind)
    
    return .result()
  }
}
