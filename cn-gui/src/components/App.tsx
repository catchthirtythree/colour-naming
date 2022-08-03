import { ReactElement, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import './App.css';

interface IColourInfo {
  hex: string;
  rgb: string;
  name: string;
}

function App(): ReactElement<any, any> {
  const [inputValue, setInputValue] = useState<string>('');
  const [lastValidInput, setLastValidInput] = useState<string>('');
  const [colourInfo, setColourInfo] = useState<IColourInfo | null>(null);

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
    <div>
      <div id="input-container">
        <div id="octothorpe">
          <span
            id="text"
            style={{ color: colourInfo ? colourInfo.hex : 'black' }}>
            #
          </span>
          <span id="shadow">#</span>
        </div>

        {/* @TODO(michael): Make the octothorpe part of the input. */}
        {/* @TODO(michael): Make the input text all UPPERCASE. */}

        <div id="input">
          <input
            style={{ color: colourInfo ? colourInfo.hex : 'black' }}
            pattern="[0-9a-f]"
            maxLength={6}
            value={inputValue}
            onChange={(event) => {
              handleColourInfo(event.target.value);
              setInputValue(event.target.value);
            }}
            onBlur={(event) => {
              setInputValue(lastValidInput);
            }}
          />
          <span id="shadow">{inputValue}</span>
        </div>
      </div>

      <div>
        <pre>hex  - {colourInfo?.hex}</pre>
        <pre>rgb  - {colourInfo?.rgb}</pre>
        <pre>name - {colourInfo?.name}</pre>
      </div>
    </div>
  );
}

export default App;
