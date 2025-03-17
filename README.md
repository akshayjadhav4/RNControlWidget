# 🚀 iOS Control Widgetd in Expo App

## 📌 About This Project

This project demonstrates how to create Control Widgets using @bacons/apple-targets for iOS-specific widgets configurations in Expo projects.

## ✨ Features
- 🔘 Buttons – Perform quick actions, such as launching an app or running a shortcut.
- 🎚 Toggles – Control boolean states like turning something on/off.
- 📱 Integration with System Spaces – Add widgets to Control Center, the Lock Screen, and the Action button.
- ⚡ Built with WidgetKit – Uses Apple’s latest framework for seamless performance.
- 🛠 Powered by @bacons/apple-targets – Automates the setup of Apple targets in Expo projects.

## 🛠 Setup & Installation
1.	Clone the repository:

```bash
git https://github.com/akshayjadhav4/RNControlWidget.git
cd RNControlWidget
```
2. Install dependencies:
   
```bash
npm install
```

3. Add Apple Team ID in app.json

```json

    "ios": {
      "appleTeamId": "YOUR_TEAM_ID",
      "supportsTablet": true,
      "bundleIdentifier": "com.anonymous.smart-home",
      "entitlements": {
        "com.apple.security.application-groups": [
          "group.com.anonymous.smart-home"
        ]
      }
    },

```

4. Generate iOS project
   
```bash
npx expo prebuild -p ios
```

5. Run App
   
```bash
npx expo run:ios
```


## 📷 Preview

|  |  |
|----------|----------|
| ![Add a Control](https://github.com/user-attachments/assets/acd23b28-93ed-45e0-a512-6601c00a836e) | ![Config Control 1](https://github.com/user-attachments/assets/7ccca75b-e544-4a2e-88a3-b00c14938744) |
| ![Config Control 1](https://github.com/user-attachments/assets/82c47ee3-a7cd-4739-ac96-5382ceeaee53) | ![Control Center OFF](https://github.com/user-attachments/assets/32412f33-549d-4350-a886-f6e218f7730a) |
| ![Control Center ON](https://github.com/user-attachments/assets/a3d6e50e-5bdc-4c4d-b7c1-3518fad210e0) | ![App Home](https://github.com/user-attachments/assets/87cdccb5-7458-4bd3-9b63-c91ed1491c91) |
| ![image](https://github.com/user-attachments/assets/6a165543-97e9-427c-898e-6a0eb12de580) | ![image](https://github.com/user-attachments/assets/57286dac-ba26-453a-99de-066a8403f165)
 |
