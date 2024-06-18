// App.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [inputUrl, setInputUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');
  const [visitHistory, setVisitHistory] = useState([]);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/url', { url: inputUrl });
      setShortenedUrl(response.data.msg);
      setInputUrl('');
    } catch (error) {
      setError('Failed to shorten URL. Please try again.');
    }
  };

  // Function to fetch visit history for a shortened URL
  const fetchVisitHistory = async (shortId) => {
    try {
      const response = await axios.get(`http://localhost:8080/${shortId}`);
      setVisitHistory(response.data.analytics);
    } catch (error) {
      console.error('Error fetching visit history:', error);
    }
  };

  // useEffect to fetch visit history when component mounts (example)
  useEffect(() => {
    const exampleShortId = 'exampleShortId'; // Replace with actual shortId
    fetchVisitHistory(exampleShortId);
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          required
        />
        <button type="submit">Shorten URL</button>
      </form>
      {shortenedUrl && <p>Shortened URL: {shortenedUrl}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Visit History</h2>
      <ul>
        {visitHistory.map((visit, index) => (
          <li key={index}>{new Date(visit.timestamp).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
