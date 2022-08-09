import { ReactElement, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import "./App.css";
import { Hex } from "./Hex";
import { Name } from "./Name";
import { Rgb } from "./Rgb";

export function App(): ReactElement<any, any> {
  return (
    <div id="App_container">
      <div id="header">
        Name that Colour
      </div>

      <div id="content">
        <div id="routing">
          <div
            className="route"
            data-selected={ window.location.pathname === '/' || window.location.pathname === '/hex' }
            onClick={(event) => {
              window.location.href = '/hex';
            }}>
            Convert Hex
          </div>

          <div
            className="route"
            data-selected={ window.location.pathname === '/rgb' }
            onClick={(event) => {
              window.location.href = '/rgb';
            }}>
            Convert Rgb
          </div>

          <div
            className="route"
            data-selected={ window.location.pathname === '/name' }
            onClick={(event) => {
              window.location.href = '/name';
            }}>
            Convert Name
          </div>
        </div>

        <Router>
          <Routes>
            <Route path="/" element={<Hex />} />
            <Route path="/hex" element={<Hex />} />
            {/* @NOTE(michael): Tauri doesn't have an address bar otherwise this would work. */}
            <Route path="/hex/:hex" element={<Hex />} />
            <Route path="/rgb" element={<Rgb />} />
            <Route path="/name" element={<Name />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
