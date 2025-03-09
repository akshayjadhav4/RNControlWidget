import AsyncStorage from "@react-native-async-storage/async-storage";
import { DeviceState } from "@/types";
import { DEFAULT_DEVICE_STATES, STORAGE_KEY } from "@/constants";

/**
 * Save device states to AsyncStorage
 */
export const saveDeviceStates = async (states: DeviceState): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(states));
  } catch (error) {
    console.error("Error saving device states:", error);
  }
};

/**
 * Load device states from AsyncStorage
 */
export const loadDeviceStates = async (): Promise<DeviceState> => {
  try {
    const statesJson = await AsyncStorage.getItem(STORAGE_KEY);
    if (statesJson) {
      return JSON.parse(statesJson);
    }
    // If no states found, save and return defaults
    await saveDeviceStates(DEFAULT_DEVICE_STATES);
    return DEFAULT_DEVICE_STATES;
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
