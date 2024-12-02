import React, { useState } from 'react';
import axios from 'axios';
import CharacterModal from './CharacterModal'; // Import the new component
import './Search.css';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://www.moogleapi.com/api/v1/characters/search?name=${query}`
      );
      setResults(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch search results.');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
    setIsModalOpen(false);
  };

  return (
    <div className="main-content">
      <div className="search-container">
        <h1>Search</h1>
        <input
          type="text"
          placeholder="Search for characters or monsters..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="results-container">
        {results.length > 0 ? (
          results.map((result, index) => (
            <div
              key={index}
              className="result-card"
              onClick={() => openModal(result)} // Open modal on click
            >
              {result.pictures && result.pictures.length > 0 ? (
                <img
                  src={result.pictures[0].url}
                  alt={result.name}
                  className="result-image"
                />
              ) : (
                <div className="result-image-placeholder">No Image</div>
              )}
              <h3>{result.name}</h3>
              {result.origin && <p>Origin: {result.origin}</p>}
              {result.race && <p>Race: {result.race}</p>}
            </div>
          ))
        ) : (
          <p>No results found. Try a different search term.</p>
        )}
      </div>

      {/* Modal for Character Details */}
      <CharacterModal
        isOpen={isModalOpen}
        onClose={closeModal}
        character={selectedCharacter}
      />
    </div>
  );
};

export default SearchPage;
