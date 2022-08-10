import { ReactElement, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import './Name.css';
import { IColourInfo } from '../types/colour-info';
import { ALL_PAIRS, IColourPair } from '../types/colour-pair';
import { sortArray } from '../utils/sort';
import { convertNameToColour } from '../commands/colour';

export function sortPairs(item1: IColourPair, item2: IColourPair): number {
  return item1.name.localeCompare(item2.name);
}

export function Name(props: {
  colour: IColourInfo,
  onSetColour: (colour: IColourInfo) => void,
}): ReactElement<any, any> {
  const colourPairs = sortArray(ALL_PAIRS, sortPairs);
  const index = colourPairs.findIndex(pair => pair.name === props.colour.name);

  return (
    <div id="Name_container">
      <div id="input-container">
        <span id="text">Your Name:</span>

        <div id="input">
          <select
            id="colour-selector"
            value={index}
            onChange={(event) => {
              let currentValue = event.target.value;
              let index = Number(currentValue);
              let pair = colourPairs[index];

              convertNameToColour(pair.name).then(colour => {
                if (colour) {
                  props.onSetColour(colour);
                }
              })
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
      </div>
    </div>
  );
}
