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
  const path = window.location.pathname;

  console.log(path);

  return (
    <div id="App_container">
      <div id="header">
        Name that Colour
      </div>

      <div id="content">
        <div id="routing">
          <div
            className="route"
            data-selected={ path === '/' || path === '/hex' }
            onClick={(event) => {
              window.location.href = '/hex';
            }}>
            Convert Hex
          </div>

          <div
            className="route"
            data-selected={ path === '/rgb' }
            onClick={(event) => {
              window.location.href = '/rgb';
            }}>
            Convert Rgb
          </div>

          <div
            className="route"
            data-selected={ path === '/name' }
            onClick={(event) => {
              window.location.href = '/name';
            }}>
            Convert Name
          </div>
        </div>

        {/* @TODO(michael): Make the routes work along with the routing links. */}

        <Router>
          <Routes>
            <Route path="/" element={<Rgb />} />
            <Route path="/hex" element={<Hex />} />
            <Route path="/rgb" element={<Rgb />} />
            <Route path="/name" element={<Name />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
