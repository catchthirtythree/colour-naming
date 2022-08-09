import { Component, ReactElement, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import './Hex.css';
import { ColourInfo, IColourInfo } from '../types/colour-info';
import { Info } from './Info';
import { useParams } from 'react-router-dom';

export function cleanHex(str: string): string {
  // Replace any non-hex values from the string.
  let cleanedValue = str.replaceAll(/[^0-9a-fA-F]/g, '');
  // Don't let the string be longer than 6 characters after cleaned.
  let maxLengthValue = cleanedValue.substring(0, 6);
  // Add the octothorpe to the start of the string.
  return `#${maxLengthValue}`;
}

export async function convertHexToColour(hex: string): Promise<IColourInfo> {
  try {
    return await invoke<IColourInfo>('convert_hex_string', { hex });
  } catch (err) {
    throw "Unhandled exception converting hex.";
  }
}

export function Hex(): ReactElement<any, any> {
  const DEFAULT_HEX = '#4C4F56';

  const param = useParams<{ hex: string }>();
  const hex = cleanHex(param.hex ?? DEFAULT_HEX);

  const [inputValue, setInputValue] = useState<string>(hex);
  const [lastValidInput, setLastValidInput] = useState<string>(hex);
  const [colourInfo, setColourInfo] = useState<IColourInfo>(new ColourInfo(
    '#4C4F56',
    'rgb(76, 79, 86)',
    'Abbey',
  ));

  useEffect(() => {
    convertHexToColour(inputValue).then((colour) => {
      if (colour) {
        setLastValidInput(inputValue);
        setColourInfo(colour);
      }
    });
  }, [inputValue]);

  return (
    <div id="Hex_container">
      <div id="input-container">
        <div id="input">
          <input
            style={{ color: colourInfo ? colourInfo.hex : 'black' }}
            pattern="^[#]([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$"
            value={inputValue}
            onChange={(event) => {
              setInputValue(cleanHex(event.target.value));
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
