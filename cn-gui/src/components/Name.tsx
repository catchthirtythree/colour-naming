import { ReactElement, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import './Name.css';
import { IColourInfo } from '../types/colour-info';
import { ALL_PAIRS, IColourPair } from '../types/colour-pair';

export function Name(): ReactElement<any, any> {
  const DEFAULT_COLOUR_NAME = 'Gimblet';

  const [colourName, setColourName] = useState<string>(DEFAULT_COLOUR_NAME);
  const [colourPairs, setColourPairs] = useState<IColourPair[]>(ALL_PAIRS);

  const [colourInfo, setColourInfo] = useState<IColourInfo>({
    hex: '#BABA69',
    rgb: 'rgb(186, 186, 105)',
    name: 'Gimblet',
  });

  const handleColourChange = async (colourName: string) => {
    try {
      const response = await invoke<IColourInfo>('convert_name_string', {
        name: colourName
      });

      if (response) {
        setColourInfo(response);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div id="Name_container">
      <div id="colour-name-container">
        <select id="colour-select"
          onChange={(event) => {
            let currentValue = event.target.value;
            let index = Number(currentValue);
            let pair = ALL_PAIRS[index];
            console.log(pair, pair.getRGB(), pair.toStringHex());
            handleColourChange(pair.name);
          }}
        >
          {
            colourPairs.map((pair, index) => {
              return (
                <option
                  key={index}
                  value={index}
                  style={{
                    backgroundColor: pair.toStringHex(),
                    color: pair.isColourLight() ? 'black' : 'white',
                    mixBlendMode: 'lighten',
                  }}>
                  {pair.name}
                </option>
              );
            })
          }
        </select>
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
