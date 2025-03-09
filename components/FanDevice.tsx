import React from "react";
import { Switch } from "react-native";
import DeviceRow from "./DeviceRow";
import { useDevices } from "@/context/DeviceContext";
import { COLORS } from "@/constants";

const FanDevice: React.FC = () => {
  const { deviceStates, updateDeviceState } = useDevices();
  const isOn = deviceStates.fan;

  const handleToggle = (value: boolean) => {
    updateDeviceState("fan", value);
  };

  return (
    <DeviceRow name="Fan" state={isOn ? "On" : "Off"}>
      <Switch
        value={isOn}
        onValueChange={handleToggle}
        trackColor={{ false: COLORS.secondary, true: COLORS.primary }}
        thumbColor="#FFFFFF"
      />
    </DeviceRow>
  );
};

export default FanDevice;
