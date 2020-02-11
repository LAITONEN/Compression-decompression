import React, { useState } from 'react';
import axios from 'axios';
import { ReactComponent as AitoLogo } from './assets/aito-logo.svg';
import './App.css';

function App() {
  const [uncompressed, setUncompressed] = useState('')
  const [compressed, setCompressed] = useState('')

  const compress = async () => {
    let res = await axios.post('/compress', { value: uncompressed.toLowerCase() })
    setCompressed(res.data.join('\n'))
  }

  const decompress = async () => {
    const res = await axios.post('/decompress', { value: compressed.toLowerCase() })
    setUncompressed(res.data.join('\n'))
  }

  const onUncompressedTextAreaChange = (e) => setUncompressed(e.target.value)
  const onCompressedTextAreaChange = (e) => setCompressed(e.target.value)


  return (
    <div className="App">
      <div className="Form">
        <div className={'Title'}>Write the words to be compressed, each on the new line, no other characters allowed</div>
        <textarea placeholder={'Example:\ndriver\ndrone\ndrill\ndollar\nbank'} type={'text'} value={uncompressed} onChange={onUncompressedTextAreaChange} />
        <button onClick={compress}>Compress</button>
      </div>
      <div className="Form">
        <div className={'Title'}>Write the compressed words, each on the new line in the format of digit + white space + letters</div>
        <textarea placeholder={'Example:\n0 driver\n2 one\n2 ill\n1 ollar\n0 bank'} type={'text'} value={compressed} onChange={onCompressedTextAreaChange} />
        <button onClick={decompress}>Decompress</button>
      </div>
      <AitoLogo className={'Logo'} />
    </div>
  );
}

export default App;
