import React, { useEffect, useState } from 'react';
import { getCharacters, getMonsters, getGames, getRandomCharacter, searchCharacters, searchMonsters } from './moogleapi.js';
import './styles.css';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [monsters, setMonsters] = useState([]);
  const [games, setGames] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState([]);
  const [randomCharacter, setRandomCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('characters'); // New state to manage search type

  useEffect(() => {
    const fetchData = async () => {
      try {
        const charactersData = await getCharacters();
        const monstersData = await getMonsters();
        const gamesData = await getGames();
        setCharacters(charactersData);
        setMonsters(monstersData);
        setGames(gamesData);
        setFilteredCharacters(charactersData);
        setFilteredMonsters(monstersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchRandomCharacter = async () => {
    try {
      const randomData = await getRandomCharacter();
      setRandomCharacter(randomData);
    } catch (error) {
      console.error('Error fetching random character:', error);
    }
  };

  const handleSearchChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      try {
        if (searchType === 'characters') {
          const searchResults = await searchCharacters(`name=${value}`);
          setFilteredCharacters(searchResults);
        } else if (searchType === 'monsters') {
          const searchResults = await searchMonsters(`name=${value}`);
          setFilteredMonsters(searchResults);
        }
      } catch (error) {
        console.error(`Error searching ${searchType}:`, error);
      }
    } else {
      setFilteredCharacters(characters);
      setFilteredMonsters(monsters);
    }
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
    setSearchTerm('');
    setFilteredCharacters(characters);
    setFilteredMonsters(monsters);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <button className="scroll-button" onClick={scrollToBottom}>Go to Bottom</button>
      <h1>MoogleFinder</h1>
      <img src={`${process.env.PUBLIC_URL}/moogleicon.png`} alt="Moogle" className="moogle-image" />
      <button onClick={fetchRandomCharacter}>Get Random Character</button>
      {randomCharacter && (
        <div className="character-card">
          <h1>Name: {randomCharacter.name}</h1>
          <h3>Origin: {randomCharacter.origin}</h3>
          <h3>Job/Class: {randomCharacter.job}</h3>
          {randomCharacter.picture && <img src={randomCharacter.picture} alt={randomCharacter.name} />}
        </div>
      )}
      <select value={searchType} onChange={handleSearchTypeChange}>
        <option value="characters">Characters</option>
        <option value="monsters">Monsters</option>
      </select>
      <input
        type="text"
        placeholder={`Search ${searchType}...`}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div>
        {searchType === 'characters' && filteredCharacters.map((character) => (
          <div key={character.name} className="character-card">
            <h1>{character.name}</h1>
            <h3>{character.origin}</h3>
            <h3>{character.gender}</h3>
            {character.picture && <img src={character.picture} alt={character.name} />}
          </div>
        ))}
        {searchType === 'monsters' && filteredMonsters.map((monster) => (
          <div key={monster.name} className="character-card">
            <h1>{monster.name}</h1>
            <h3>{monster.game}</h3>
            <h3>Elemental Affinity: {monster.elementalAffinities?.join(', ') || 'None'}</h3>
            {monster.picture && <img src={monster.picture} alt={monster.name} />}
          </div>
        ))}
      </div>
      <button className="scroll-button" onClick={scrollToTop}>Back to Top</button>
    </div>
  );
};

export default App;
