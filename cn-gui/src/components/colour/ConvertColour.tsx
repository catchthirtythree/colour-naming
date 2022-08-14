import React from "react";
import { ColourInfo, IColourInfo } from "../../types/colour-info";

import "./ConvertColour.css";
import { Info } from "./../Info";
import { Hex } from "./Hex";
import { Name } from "./Name";
import { Rgb } from "./Rgb";

export class ConvertColour extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);

    this.state = {
      colour: new ColourInfo(
        '#4C4F56',
        'rgb(76, 79, 86)',
        'Abbey',
      )
    };
  }

  render() {
    return (
      <div id="ConvertColour_container">
        <div id="inputs">
          <Hex
            colour={this.state.colour}
            onSetColour={(colour: IColourInfo) => this.setState({ colour })}
          />
          <Rgb
            colour={this.state.colour}
            onSetColour={(colour: IColourInfo) => this.setState({ colour })}
          />
          <Name
            colour={this.state.colour}
            onSetColour={(colour: IColourInfo) => this.setState({ colour })}
          />
        </div>

        <div id="result">
          <span id="text">Result:</span>
          <Info colour={this.state.colour} />
        </div>
      </div>
    );
  }
}
