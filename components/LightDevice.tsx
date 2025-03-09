import React from "react";
import { Switch } from "react-native";
import DeviceRow from "./DeviceRow";
import { useDevices } from "@/context/DeviceContext";
import { COLORS } from "@/constants";

const LightDevice: React.FC = () => {
  const { deviceStates, updateDeviceState } = useDevices();
  const isOn = deviceStates.lights;

  const handleToggle = (value: boolean) => {
    updateDeviceState("lights", value);
  };

  return (
    <DeviceRow name="Lights" state={isOn ? "On" : "Off"}>
      <Switch
        value={isOn}
        onValueChange={handleToggle}
        trackColor={{ false: COLORS.secondary, true: COLORS.primary }}
        thumbColor="#FFFFFF"
      />
    </DeviceRow>
  );
};

export default LightDevice;
