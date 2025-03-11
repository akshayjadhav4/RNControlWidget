import AsyncStorage from "@react-native-async-storage/async-storage";
import { DeviceState, DeviceType, DEVICE_ID_MAP } from "@/types";
import { DEFAULT_DEVICE_STATES } from "@/constants";

/**
 * Save device states to AsyncStorage
 */
export const saveDeviceStates = async (states: DeviceState): Promise<void> => {
  try {
    // Save each device state using the widget-compatible key format
    for (const [device, value] of Object.entries(states) as [
      DeviceType,
      boolean | number
    ][]) {
      const deviceId = DEVICE_ID_MAP[device];
      const key = `deviceState_${deviceId}`;
      await AsyncStorage.setItem(key, value.toString());
    }
  } catch (error) {
    console.error("Error saving device states:", error);
  }
};

/**
 * Load device states from AsyncStorage
 */
export const loadDeviceStates = async (): Promise<DeviceState> => {
  try {
    const states = { ...DEFAULT_DEVICE_STATES };

    // Load each device state using the widget-compatible key format
    for (const [device, deviceId] of Object.entries(DEVICE_ID_MAP) as [
      DeviceType,
      string
    ][]) {
      const key = `deviceState_${deviceId}`;
      const value = await AsyncStorage.getItem(key);

      if (value !== null) {
        if (device === "thermostat") {
          states[device] = parseInt(value, 10);
        } else {
          states[device] = value === "1" || value === "true";
        }
      }
    }

    return states;
  } catch (error) {
    console.error("Error loading device states:", error);
    return DEFAULT_DEVICE_STATES;
  }
};

/**
 * Reset device states to defaults
 */
export const resetDeviceStates = async (): Promise<DeviceState> => {
  try {
    await saveDeviceStates(DEFAULT_DEVICE_STATES);
    return DEFAULT_DEVICE_STATES;
  } catch (error) {
    console.error("Error resetting device states:", error);
    return DEFAULT_DEVICE_STATES;
  }
};
