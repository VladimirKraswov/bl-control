import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { useBluetooth } from "rn-bluetooth-classic";

interface DeviceConnectionModalProps {
  visible: boolean;
  closeModal: () => void;
  onConnectionResult: (device: any, status: boolean) => void;
}

const DeviceConnectionModal: React.FC<DeviceConnectionModalProps> = ({
  visible,
  closeModal,
  onConnectionResult,
}) => {
  const { isScanning, devices, scanForDevices, connectToDevice } = useBluetooth();
  const [connectedDevice, setConnectedDevice] = useState<any | null>(null);

  useEffect(() => {
    if (visible) {
      requestBluetoothPermissions().then((hasPermissions) => {
        if (hasPermissions && !isScanning) {
          scanForDevices();
        }
      });
    }
  }, [visible]);

  const requestBluetoothPermissions = async () => {
    if (Platform.OS === "android") {
      if (Platform.Version >= 31) {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
        return (
          granted["android.permission.BLUETOOTH_SCAN"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted["android.permission.BLUETOOTH_CONNECT"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted["android.permission.ACCESS_FINE_LOCATION"] ===
            PermissionsAndroid.RESULTS.GRANTED
        );
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    }
    return true;
  };

  const handleConnect = async (device: any) => {
    try {
      await connectToDevice(device.id);
      setConnectedDevice(device);
      onConnectionResult(device, true);
      closeModal();
    } catch (error) {
      console.error("Failed to connect:", error);
      onConnectionResult(null, false);
    }
  };

  const renderDeviceItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.deviceItem}
      onPress={() => handleConnect(item)}
    >
      <Text style={styles.deviceName}>{item.name || "Unknown Device"}</Text>
      <Text style={styles.deviceId}>{item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Available Devices
          </Text>
          <FlatList
            data={devices}
            keyExtractor={(item) => item.id}
            renderItem={renderDeviceItem}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No devices found</Text>
            }
          />
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  deviceItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    alignItems: "center",
  },
  deviceName: {
    fontSize: 16,
  },
  deviceId: {
    fontSize: 12,
    color: "#555",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#FF6060",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
   

 fontWeight: "bold",
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginVertical: 20,
  },
});

export default DeviceConnectionModal;