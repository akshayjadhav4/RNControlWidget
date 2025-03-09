import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { DeviceState, DeviceType } from "@/types";
import { DEFAULT_DEVICE_STATES } from "@/constants";
import {
  loadDeviceStates,
  saveDeviceStates,
  resetDeviceStates,
} from "@/services/storageService";

interface DeviceContextType {
  deviceStates: DeviceState;
  updateDeviceState: (device: DeviceType, value: boolean | number) => void;
  resetAllDevices: () => void;
  isLoading: boolean;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [deviceStates, setDeviceStates] = useState<DeviceState>(
    DEFAULT_DEVICE_STATES
  );
  const [isLoading, setIsLoading] = useState(true);

  // Load device states from storage on mount
  useEffect(() => {
    const initializeStates = async () => {
      try {
        const states = await loadDeviceStates();
        setDeviceStates(states);
      } catch (error) {
        console.error("Failed to load device states:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeStates();
  }, []);

  // Update a specific device state
  const updateDeviceState = async (
    device: DeviceType,
    value: boolean | number
  ) => {
    const updatedStates = {
      ...deviceStates,
      [device]: value,
    };

    setDeviceStates(updatedStates);
    await saveDeviceStates(updatedStates);
  };

  // Reset all device states to defaults
  const resetAllDevices = async () => {
    const defaultStates = await resetDeviceStates();
    setDeviceStates(defaultStates);
  };

  return (
    <DeviceContext.Provider
      value={{
        deviceStates,
        updateDeviceState,
        resetAllDevices,
        isLoading,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

// Custom hook to use the device context
export const useDevices = (): DeviceContextType => {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error("useDevices must be used within a DeviceProvider");
  }
  return context;
};
