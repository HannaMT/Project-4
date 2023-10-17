import React, {useState} from 'react';
import './App.css';
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [bannedAttributes, setBannedAttributes] = useState([]);
  const [history, setHistory] = useState([]);

  const fetched = async () => {
    const headers = new Headers({
      'x-api-key': ACCESS_KEY,
    });
  
    // Fetch data from the dog API with headers
    const response = await fetch('https://api.thedogapi.com/v1/images/search', {
      method: 'GET',
      headers: headers,
    });
  
    const jsonData = await response.json();
    setData(jsonData[0]);
    setHistory([...history, jsonData[0]]);
  };

  const FetchData = () => {
    fetched();
    setCount(count + 1);
  };

  const bannedDogs = () =>{
    setBannedAttributes([...bannedAttributes, data.url])
  }
  return (
    <div id = "App">
      <div id="center">
      <h1>Dog Image</h1>
      <button onClick={FetchData}>Fetch</button>
      {data && (
        <div>
          <button onClick={bannedDogs}><img src={data.url} alt="Dog" /></button>
        </div>
      )}
      </div>

      <div className="Right">
        <h2>Banned List</h2>
        <ul>
          {bannedAttributes.map((url, index) => (
            <li key={index}>
              <img src={url} alt="Banned" />
            </li>
          ))}
        </ul>
      </div>

      <div className = "Left">
        <h2>History</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              <img src={item.url} alt="Dog" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
