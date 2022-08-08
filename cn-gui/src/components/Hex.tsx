import { ReactElement, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import './Hex.css';
import { IColourInfo } from '../types/colour-info';
import { Info } from './Info';

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
            value={inputValue}
            onChange={(event) => {
              // Get the current value from the input.
              let currentValue = event.target.value;
              console.log(currentValue);
              // Replace any non-hex values from the string.
              let cleanedValue = currentValue.replaceAll(/[^0-9a-fA-F]/g, '');
              // Don't let the string be longer than 6 characters after cleaned.
              let maxLengthValue = cleanedValue.substring(0, 6);
              // Add the octothorpe to the start of the string.
              let hexValue = `#${maxLengthValue}`;
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

      <Info colour={colourInfo} />
    </div>
  );
}
