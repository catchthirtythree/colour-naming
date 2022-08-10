import { ReactElement, useEffect, useState } from 'react';

import './Hex.css';
import { IColourInfo } from '../types/colour-info';
import { convertHexToColour } from '../commands/colour';

export function cleanHex(str: string): string {
  // Replace any non-hex values from the string.
  let cleanedValue = str.replaceAll(/[^0-9a-fA-F]/g, '');
  // Don't let the string be longer than 6 characters after cleaned.
  let maxLengthValue = cleanedValue.substring(0, 6);
  // Add the octothorpe to the start of the string.
  return `#${maxLengthValue}`;
}

// @TODO(michael): This should update when Rgb or Name change.
// It doesn't.
// It works when the inputValue changes though.

export function Hex(props: {
  colour: IColourInfo,
  onSetColour: (colour: IColourInfo) => void,
}): ReactElement<any, any> {
  const [inputValue, setInputValue] = useState<string>(props.colour.hex);
  const [lastValidInput, setLastValidInput] = useState<string>(props.colour.hex);

  useEffect(() => {
    setInputValue(props.colour.hex);
  }, [props.colour]);

  return (
    <div id="Hex_container">
      <div id="input-container">
        <span>Your Hex:</span>

        <div id="input">
          <input
            style={{ color: props.colour.hex }}
            pattern="^[#]([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$"
            value={inputValue}
            maxLength={7}
            onChange={(event) => {
              setInputValue(event.target.value);
              convertHexToColour(event.target.value).then((colour) => {
                if (colour) {
                  setLastValidInput(event.target.value);
                  props.onSetColour(colour);
                }
              });
            }}
            onBlur={(event) => {
              convertHexToColour(lastValidInput).then((colour) => {
                if (colour) {
                  setInputValue(lastValidInput);
                  props.onSetColour(colour);
                }
              });
            }}
          />
          <span id="shadow">{inputValue}</span>
        </div>
      </div>
    </div>
  );
}
