import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import DeviceRow from "./DeviceRow";
import { useDevices } from "@/context/DeviceContext";
import {
  COLORS,
  THERMOSTAT_MIN,
  THERMOSTAT_MAX,
  THERMOSTAT_STEP,
} from "@/constants";

const ThermostatDevice: React.FC = () => {
  const { deviceStates, updateDeviceState } = useDevices();
  const temperature = deviceStates.thermostat;

  const handleChange = (value: number) => {
    // Round to nearest step
    const roundedValue = Math.round(value);
    updateDeviceState("thermostat", roundedValue);
  };

  return (
    <DeviceRow name="Thermostat" state={`${temperature}°F`}>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={THERMOSTAT_MIN}
          maximumValue={THERMOSTAT_MAX}
          step={THERMOSTAT_STEP}
          value={temperature}
          onValueChange={handleChange}
          minimumTrackTintColor={COLORS.primary}
          maximumTrackTintColor={COLORS.secondary}
          thumbTintColor={COLORS.primary}
        />
        <View style={styles.rangeContainer}>
          <Text style={styles.rangeText}>{THERMOSTAT_MIN}°F</Text>
          <Text style={styles.rangeText}>{THERMOSTAT_MAX}°F</Text>
        </View>
      </View>
    </DeviceRow>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    width: 150,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  rangeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  rangeText: {
    fontSize: 12,
    color: COLORS.secondary,
  },
});

export default ThermostatDevice;
