import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
import DeviceConnectionModal from "./DeviceConnectionModal";
import Joystick from "./Joystick";

export const Frame = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [connectedDevice, setConnectedDevice] = useState<any | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string | null>(null);
  const [command, setCommand] = useState<string>("");

  const openModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleConnection = (device: any, status: boolean) => {
    setConnectedDevice(status ? device : null);
    setConnectionStatus(status ? "Connected" : "Connection Failed");
  };

  const sendCommand = async (cmd: string) => {
    if (connectedDevice) {
      try {
        await connectedDevice.write(cmd + "\n"); // Отправка команды на устройство
      } catch (error) {
        Alert.alert("Error", "Failed to send command");
      }
    }
  };

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.deviceStatusWrapper}>
          {connectionStatus ? (
            <Text style={styles.deviceStatusText}>{connectionStatus}</Text>
          ) : (
            <Text style={styles.deviceStatusText}>
              Please Connect to a Bluetooth Device
            </Text>
          )}
        </View>
        <TouchableOpacity onPress={connectedDevice ? () => handleConnection(null, false) : openModal} style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>
            {connectedDevice ? "Disconnect" : "Connect"}
          </Text>
        </TouchableOpacity>
        {connectedDevice && (
          <>
          <View style={styles.commandWrapper}>
            <TextInput
              style={styles.commandInput}
              placeholder="Enter command"
              value={command}
              onChangeText={setCommand}
            />
            <TouchableOpacity onPress={() => sendCommand(command)} style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
          <Joystick sendCommand={sendCommand} />
          </>
          
        )}
        <DeviceConnectionModal
          closeModal={hideModal}
          visible={isModalVisible}
          onConnectionResult={handleConnection}
        />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  deviceStatusWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deviceStatusText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
    color: "black",
  },
  ctaButton: {
    backgroundColor: "#FF6060",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  commandWrapper: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
  },
  commandInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});