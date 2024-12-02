import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './pages/Sidebar';
import Home from './pages/Home';
import SearchPage from './pages/Search';
import CollectionPage from './pages/Collection';
import axios from 'axios';
import './styles.css';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch initial data for characters and monsters
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [charactersRes, monstersRes] = await Promise.all([
          axios.get('https://www.moogleapi.com/api/v1/characters'),
          axios.get('https://www.moogleapi.com/api/v1/monsters'),
        ]);
        setCharacters(charactersRes.data);
        setMonsters(monstersRes.data);
      } catch (err) {
        setError('Failed to fetch data from the API.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={<Home characters={characters} monsters={monsters} />}
          />
          <Route
            path="/search"
            element={
              <SearchPage
                characters={characters}
                monsters={monsters}
                loading={loading}
                error={error}
              />
            }
          />
          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
