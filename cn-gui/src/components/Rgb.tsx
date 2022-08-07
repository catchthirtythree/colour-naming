import { ReactElement, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import './Rgb.css';
import { IColourInfo } from '../types/colour-info';
import { clamp } from '../utils/clamp';

class RgbColour {
  r?: string;
  g?: string;
  b?: string;

  constructor(r?: string, g?: string, b?: string) {
    this.r = this.clamp(r);
    this.g = this.clamp(g);
    this.b = this.clamp(b);
  }

  clamp(colour?: string): string | undefined {
    if (!colour) {
      return colour;
    }

    let num = Number(colour);
    let clamped = clamp(num, 0, 255);
    return clamped.toString();
  }

  to_rgb_numbers(): [number, number, number] {
    return [Number(this.r), Number(this.g), Number(this.b)];
  }

  to_rgb_string(): string {
    let rgb = [this.r, this.g, this.b];
    let filtered = rgb.filter(col => col !== undefined);
    return `rgb(${filtered.join(', ')})`;
  }

  static parse_rgb_string(rgb: string): RgbColour {
    let regex = new RegExp('rgb\\((.*)\\)');
    let match = rgb.match(regex);
    if (!match || !match[1]) {
      return new RgbColour();
    }

    let split = match[1].split(',');
    let [r, g, b] = split.map(col => col.trim());
    return new RgbColour(r, g, b);
  }
}

export function Rgb(): ReactElement<any, any> {
  const DEFAULT_R = 186;
  const DEFAULT_G = 186;
  const DEFAULT_B = 105;

  const [colourRed, setColourRed] = useState<number>(DEFAULT_R);
  const [colourGreen, setColourGreen] = useState<number>(DEFAULT_G);
  const [colourBlue, setColourBlue] = useState<number>(DEFAULT_B);

  const [colourInfo, setColourInfo] = useState<IColourInfo>({
    hex: '#BABA69',
    rgb: 'rgb(186, 186, 105)',
    name: 'Gimblet',
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
