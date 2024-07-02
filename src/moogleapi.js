import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://www.moogleapi.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCharacters = async () => {
  const response = await apiClient.get('/characters');
  return response.data;
};

export const getMonsters = async () => {
  const response = await apiClient.get('/monsters');
  return response.data;
};

export const getGames = async () => {
  const response = await apiClient.get('/games');
  return response.data;
};

export const getRandomCharacter = async () => {
  const response = await apiClient.get('/characters/random');
  return response.data;
};

export const searchCharacters = async (query) => {
  const response = await apiClient.get(`/characters/search?${query}`);
  return response.data;
};

export const searchMonsters = async (query) => {
  const response = await apiClient.get(`/monsters/search?${query}`);
  return response.data;
};
