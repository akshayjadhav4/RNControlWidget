import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDevices } from "@/context/DeviceContext";
import LightDevice from "@/components/LightDevice";
import FanDevice from "@/components/FanDevice";
import ThermostatDevice from "@/components/ThermostatDevice";
import { COLORS, SPACING } from "@/constants";

const HomeScreen: React.FC = () => {
  const { resetAllDevices, isLoading } = useDevices();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SmartHome</Text>

      <View style={styles.deviceList}>
        <LightDevice />
        <FanDevice />
        <ThermostatDevice />
      </View>

      <View style={styles.resetContainer}>
        <Button
          title="Reset All"
          onPress={resetAllDevices}
          color={COLORS.primary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.large,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: SPACING.large,
    textAlign: "center",
  },
  deviceList: {
    flex: 1,
  },
  resetContainer: {
    marginTop: SPACING.large,
  },
});

export default HomeScreen;
