import { ReactElement, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri'

import logo from './logo.svg';
import './App.css';

function App(): ReactElement<any, any> {
  const [colourInfo, setColourInfo] = useState('');

  const onConvertHex = async () => {
    try {
      const response = await invoke('convert_hex_string', {
        hex: colourInfo
      });

      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input
          value={colourInfo}
          placeholder="hex"
          onChange={(event) => setColourInfo(event.target.value)}
        />
        <button
          className="btn"
          onClick={onConvertHex}>
          Convert Hex
        </button>
      </header>
    </div>
  );
}

export default App;
