export interface DeviceState {
  lights: boolean;
  fan: boolean;
  thermostat: number;
}

export type DeviceType = "lights" | "fan" | "thermostat";
