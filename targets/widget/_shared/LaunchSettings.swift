//
//  LaunchSettings.swift
//  smarthome
//
//  Created by AKSHAY JADHAV on 13/03/25.
//

import SwiftUI
import WidgetKit
import AppIntents

@available(iOS 18.0, *)
struct LaunchSettings: ControlWidget {
  var body: some ControlWidgetConfiguration {
    StaticControlConfiguration(
      kind: "com.anonymous.smart-home.opensettings"
    ) {
      ControlWidgetButton(action: OpenSettingsIntent()) {
        Label("Open Settings", systemImage: "gearshape")
      }
    }
    .displayName("Settings")
    .description("Open the app settings")
  }
}

@available(iOS 18.0, *)
struct OpenSettingsIntent: ControlConfigurationIntent {
  static let title: LocalizedStringResource = "Open Settings"
  static let isDiscoverable = true
  static let openAppWhenRun: Bool = true
  
  @MainActor
  func perform() async throws -> some IntentResult & OpensIntent {
    NSLog("Opening URL: \(URL(string: "myapp://settings"))")
    return .result(opensIntent: OpenURLIntent(URL(string: "com.anonymous.smart-home://settings")!))
  }
}
