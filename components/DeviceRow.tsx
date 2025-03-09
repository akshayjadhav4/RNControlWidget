import { COLORS, SPACING } from "@/constants";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface DeviceRowProps {
  name: string;
  state: string;
  children: React.ReactNode;
}

const DeviceRow: React.FC<DeviceRowProps> = ({ name, state, children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.deviceName}>{name}</Text>
        <Text style={styles.deviceState}>{state}</Text>
      </View>
      <View style={styles.controlContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  infoContainer: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
  },
  deviceState: {
    fontSize: 14,
    color: COLORS.secondary,
    marginTop: SPACING.small / 2,
  },
  controlContainer: {
    minWidth: 100,
    alignItems: "flex-end",
  },
});

export default DeviceRow;
