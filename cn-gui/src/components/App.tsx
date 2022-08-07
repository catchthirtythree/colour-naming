import { ReactElement } from "react";

import "./App.css";
import { Hex } from "./Hex";
import { Rgb } from "./Rgb";

export function App(): ReactElement<any, any> {
  return (
    <div id="App_container">
      <Hex />
      <Rgb />
    </div>
  );
}
