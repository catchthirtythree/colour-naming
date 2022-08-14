import React from "react";
import { ColourInfo } from "../types/colour-info";

import "./App.css";
import { ConvertColour } from "./colour/ConvertColour";
import { ConvertPixel } from "./pixel/ConvertPixel";

export enum Page {
  ConvertColour,
  ConvertPixel,
}

export class App extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);

    this.state = {
      colour: new ColourInfo(
        '#4C4F56',
        'rgb(76, 79, 86)',
        'Abbey',
      ),
      page: Page.ConvertPixel,
    };
  }

  render() {
    return (
      <div id="App_container">
        <div id="header">
          Name that Colour
        </div>

        <div id="content">
          <div id="navigation">
            <div
              className="button"
              aria-selected={this.state.page === Page.ConvertColour}
              onClick={(event) => this.setState({ page: Page.ConvertColour })}
            >
              Convert Colour
            </div>

            <div
              className="button"
              aria-selected={this.state.page === Page.ConvertPixel}
              onClick={(event) => this.setState({ page: Page.ConvertPixel })}
            >
              Convert Pixel
            </div>
          </div>

          <div id="page">
            {this.state.page === Page.ConvertColour && <ConvertColour />}
            {this.state.page === Page.ConvertPixel && <ConvertPixel />}
          </div>
        </div>
      </div>
    );
  }
}
