export interface DeviceState {
  lights: boolean;
  fan: boolean;
  thermostat: number;
}

export type DeviceType = "lights" | "fan" | "thermostat";

// Map device types to their IDs used in the widget
export const DEVICE_ID_MAP: Record<DeviceType, string> = {
  lights: "1",
  fan: "2",
  thermostat: "3",
};
