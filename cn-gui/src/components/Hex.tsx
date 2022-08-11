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

export function Hex(props: {
  colour: IColourInfo,
  onSetColour: (colour: IColourInfo) => void,
}): ReactElement<any, any> {
  const [inputValue, setInputValue] = useState<string>(props.colour.hex);
  const [lastValidInput, setLastValidInput] = useState<string>(props.colour.hex);

  useEffect(() => {
    setInputValue(props.colour.hex);
  }, [props]);

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
              const cleaned = cleanHex(event.target.value);

              setInputValue(cleaned);

              convertHexToColour(cleaned).then((colour) => {
                if (colour) {
                  setLastValidInput(cleaned);
                  props.onSetColour(colour);
                }
              });
            }}
            onBlur={(event) => {
              setInputValue(lastValidInput);
            }}
          />
          <span id="shadow">{inputValue}</span>
        </div>
      </div>
    </div>
  );
}
