import { ReactElement, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri'

import logo from './logo.svg';
import './App.css';

interface IColourInfo {
  hex: String;
  rgb: String;
  hsl: String;
  name: String;
}

function App(): ReactElement<any, any> {
  const [inputValue, setInputValue] = useState<string>('');
  const [colourInfo, setColourInfo] = useState<IColourInfo | null>(null);

  const onConvertHex = async () => {
    try {
      const response = await invoke<IColourInfo>('convert_hex_string', {
        hex: inputValue
      });

      setColourInfo(response);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    onConvertHex();
  }, [inputValue]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <input
          value={inputValue}
          placeholder="hex"
          onChange={(event) => setInputValue(event.target.value)}
        />

        <div>
          <pre>hex  - {colourInfo?.hex}</pre>
          <pre>rgb  - {colourInfo?.rgb}</pre>
          <pre>hsl  - {colourInfo?.hsl}</pre>
          <pre>name - {colourInfo?.name}</pre>
        </div>
      </header>
    </div>
  );
}

export default App;
