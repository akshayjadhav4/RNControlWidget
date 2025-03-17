import WidgetKit
import SwiftUI

@main
struct exportWidgets: WidgetBundle {
  var body: some Widget {
    // Export widgets here
    if #available(iOSApplicationExtension 18, *) {
      DeviceToggle()
      LaunchSettings()
    }
  }
}
