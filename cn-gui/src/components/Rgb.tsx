import { ReactElement, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import './Rgb.css';
import { IColourInfo } from '../types/colour-info';
import { clamp } from '../utils/clamp';
import { Info } from './Info';

export function Rgb(): ReactElement<any, any> {
  const DEFAULT_R = 76;
  const DEFAULT_G = 79;
  const DEFAULT_B = 86;

  const [colourRed, setColourRed] = useState<number>(DEFAULT_R);
  const [colourGreen, setColourGreen] = useState<number>(DEFAULT_G);
  const [colourBlue, setColourBlue] = useState<number>(DEFAULT_B);

  const [colourInfo, setColourInfo] = useState<IColourInfo>({
    hex: '#4C4F56',
    rgb: `rgb(${DEFAULT_R}, ${DEFAULT_G}, ${DEFAULT_B})`,
    name: 'Abbey',
  });

  const handleColourChange = async (r: number, g: number, b: number) => {
    try {
      const response = await invoke<IColourInfo>('convert_rgb_string', {
        r: colourRed,
        g: colourGreen,
        b: colourBlue
      });

      if (response) {
        setColourInfo(response);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    handleColourChange(colourRed, colourGreen, colourBlue);
  }, [colourRed, colourGreen, colourBlue]);

  return (
    <div id="Rgb_container">
      <div id="input-container">
        <div className="colour">
          <span>r</span>
          <input
            type="number"
            min={0}
            max={255}
            value={colourRed}
            onChange={(event) => {
              let currentValue = event.target.value;
              let clamped = clamp(Number(currentValue), 0, 255);
              setColourRed(clamped);
            }}
          />
        </div>

        <div className="colour">
          <span>g</span>
          <input
            type="number"
            min={0}
            max={255}
            value={colourGreen}
            onChange={(event) => {
              let currentValue = event.target.value;
              let clamped = clamp(Number(currentValue), 0, 255);
              setColourGreen(clamped);
            }}
          />
        </div>

        <div className="colour">
          <span>b</span>
          <input
            type="number"
            min={0}
            max={255}
            value={colourBlue}
            onChange={(event) => {
              let currentValue = event.target.value;
              let clamped = clamp(Number(currentValue), 0, 255);
              setColourBlue(clamped);
            }}
          />
        </div>
      </div>

      <div id="arrow-container">
        <span>--&gt;</span>
      </div>

      <Info colour={colourInfo} />
    </div>
  );
}
