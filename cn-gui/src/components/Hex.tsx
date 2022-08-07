import { ReactElement, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import './Hex.css';
import { IColourInfo } from '../types/colour-info';

export function Hex(): ReactElement<any, any> {
  const DEFAULT_HEX = '#BABA69';

  const [inputValue, setInputValue] = useState<string>(DEFAULT_HEX);
  const [lastValidInput, setLastValidInput] = useState<string>(DEFAULT_HEX);
  const [colourInfo, setColourInfo] = useState<IColourInfo>({
    hex: '#BABA69',
    rgb: 'rgb(186, 186, 105)',
    name: 'Gimblet',
  });

  const handleColourInfo = async (inputValue: string) => {
    try {
      const response = await invoke<IColourInfo>('convert_hex_string', {
        hex: inputValue
      });

      if (response) {
        setLastValidInput(inputValue);
        setColourInfo(response);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div id="Hex_container">
      <div id="input-container">
        <div id="input">
          <input
            style={{ color: colourInfo ? colourInfo.hex : 'black' }}
            pattern="^[#]([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$"
            maxLength={7}
            value={inputValue}
            onChange={(event) => {
              // Get the current value from the input.
              let currentValue = event.target.value;
              // Replace any non-hex values from the string.
              let cleanedValue = currentValue.replaceAll(/[^0-9a-fA-F]/g, '');
              // Add the octothorpe to the start of the string.
              let hexValue = `#${cleanedValue}`;
              handleColourInfo(hexValue);
              setInputValue(hexValue);
            }}
            onBlur={(event) => {
              setInputValue(lastValidInput);
            }}
          />
          <span id="shadow">{inputValue}</span>
        </div>
      </div>

      <div id="arrow-container">
        <span>--&gt;</span>
      </div>

      <div id="colour-container">
        <div id="grid-headers">
          <div className="header">===</div>
          <div className="header">hex</div>
          <div className="header">rgb</div>
          <div className="header">name</div>
        </div>

        <div id="grid-values">
          <div className="value">
            <div id="colour" style={{ backgroundColor: colourInfo.hex }}></div>
          </div>
          <div className="value">{colourInfo.hex}</div>
          <div className="value">{colourInfo.rgb}</div>
          <div className="value">{colourInfo.name}</div>
        </div>
      </div>
    </div>
  );
}
