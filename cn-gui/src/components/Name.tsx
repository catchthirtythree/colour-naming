import { ReactElement, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import './Name.css';
import { IColourInfo } from '../types/colour-info';
import { ALL_PAIRS, IColourPair } from '../types/colour-pair';
import { Info } from './Info';
import { sortArray } from '../utils/sort';

export function Name(): ReactElement<any, any> {
  const [colourPairs] = useState<IColourPair[]>(
    sortArray(ALL_PAIRS, (item1: IColourPair, item2: IColourPair) => {
      return item1.name.localeCompare(item2.name);
    })
  );
  const [colourInfo, setColourInfo] = useState<IColourInfo>({
    hex: '#4C4F56',
    rgb: 'rgb(76, 79, 86)',
    name: 'Abbey',
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
            let pair = colourPairs[index];
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
