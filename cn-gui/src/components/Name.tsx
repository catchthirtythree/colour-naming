import { ReactElement, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import './Name.css';
import { IColourInfo } from '../types/colour-info';
import { ALL_PAIRS, IColourPair } from '../types/colour-pair';
import { Info } from './Info';

export function Name(): ReactElement<any, any> {
  const DEFAULT_COLOUR_NAME = 'Gimblet';

  const [colourName, setColourName] = useState<string>(DEFAULT_COLOUR_NAME);
  const [colourPairs, setColourPairs] = useState<IColourPair[]>(ALL_PAIRS);

  const [colourInfo, setColourInfo] = useState<IColourInfo>({
    hex: '#000000',
    rgb: 'rgb(0, 0, 0)',
    name: 'Black',
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
      <div id="input-container">
        <select id="colour-selector"
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

      <Info colour={colourInfo} />
    </div>
  );
}
