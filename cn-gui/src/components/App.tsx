import { ReactElement } from "react";

import "./App.css";
import { Hex } from "./Hex";
import { Name } from "./Name";
import { Rgb } from "./Rgb";

export function App(): ReactElement<any, any> {
  return (
    <div id="App_container">
      <Hex />
      <Rgb />
      <Name />
    </div>
  );
}
