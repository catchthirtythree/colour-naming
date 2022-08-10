import { ReactElement, useEffect, useState } from 'react';

import './Rgb.css';
import { IColourInfo } from '../types/colour-info';
import { clamp } from '../utils/clamp';
import { convertRgbToColour } from '../commands/colour';

export function convertColour(input: string): string {
  if (!input.trim()) {
    return input.trim();
  }

  let number = Number(input);
  let clamped = clamp(number, 0, 255);
  return clamped.toString();
}

export function parseRGB(rgb: string): [number, number, number] {
  let regex = new RegExp('rgb\\((.*)\\)');
  let match = rgb.match(regex);
  if (!match) {
    return [0, 0, 0];
  }

  let [r, g, b] = match[1].split(', ');
  return [Number(r), Number(g), Number(b)];
}

export function Rgb(props: {
  colour: IColourInfo,
  onSetColour: (colour: IColourInfo) => void,
}): ReactElement<any, any> {
  const [r, g, b] = parseRGB(props.colour.rgb);

  const [colourRed, setColourRed] = useState<string>(r.toString());
  const [colourGreen, setColourGreen] = useState<string>(g.toString());
  const [colourBlue, setColourBlue] = useState<string>(b.toString());

  useEffect(() => {
    const [r, g, b] = parseRGB(props.colour.rgb);

    setColourRed(r.toString());
    setColourGreen(g.toString());
    setColourBlue(b.toString());
  }, [props]);

  return (
    <div id="Rgb_container">
      <div id="input-container">
        <span id="text">Your RGB:</span>

        <div id="input">
          <div className="colour">
            <span>r</span>
            <input
              type="number"
              min={0}
              max={255}
              value={colourRed}
              onChange={(event) => {
                let converted = convertColour(event.target.value);

                setColourRed(converted);

                const [r, g, b] = [
                  clamp(Number(converted), 0, 255),
                  clamp(Number(colourGreen), 0, 255),
                  clamp(Number(colourBlue), 0, 255),
                ];

                convertRgbToColour(r, g, b).then(colour => {
                  if (colour) {
                    props.onSetColour(colour);
                  }
                });
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
                let converted = convertColour(event.target.value);

                setColourGreen(converted);

                const [r, g, b] = [
                  clamp(Number(colourRed), 0, 255),
                  clamp(Number(converted), 0, 255),
                  clamp(Number(colourBlue), 0, 255),
                ];

                convertRgbToColour(r, g, b).then(colour => {
                  if (colour) {
                    props.onSetColour(colour);
                  }
                });
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
                let converted = convertColour(event.target.value);

                setColourBlue(converted);

                const [r, g, b] = [
                  clamp(Number(colourRed), 0, 255),
                  clamp(Number(colourGreen), 0, 255),
                  clamp(Number(converted), 0, 255),
                ];

                convertRgbToColour(r, g, b).then(colour => {
                  if (colour) {
                    props.onSetColour(colour);
                  }
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
