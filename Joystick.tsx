import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface JoystickProps {
  sendCommand: (command: string) => void;
}

const Joystick: React.FC<JoystickProps> = ({ sendCommand }) => {
  return (
    <View style={styles.joystickContainer}>
      <TouchableOpacity
        style={styles.controlButton}
        onPress={() => sendCommand("w 1 3")}
      >
        <Text style={styles.buttonText}>↑</Text>
      </TouchableOpacity>

      <View style={styles.middleRow}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => sendCommand("w 3 3")}
        >
          <Text style={styles.buttonText}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => sendCommand("w 2 3")}
        >
          <Text style={styles.buttonText}>↓</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => sendCommand("w 4 3")}
        >
          <Text style={styles.buttonText}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.specialButton}
          onPress={() => sendCommand("w 5 3")}
        >
          <Text style={styles.buttonText}>Hello</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.specialButton}
          onPress={() => sendCommand("w 6 10")}
        >
          <Text style={styles.buttonText}>Dance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  joystickContainer: {
    alignItems: "center",
    margin: 20,
  },
  controlButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  middleRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 20,
  },
  specialButton: {
    backgroundColor: "#FF6060",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
});

export default Joystick;