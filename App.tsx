import React from "react";

import { BluetoothProvider } from "rn-bluetooth-classic";
import { Frame } from "./Frame";

const App = () => {
  return (
    <BluetoothProvider>
      <Frame />
    </BluetoothProvider>
  );
};

export default App;