import React from 'react';
import './CharacterModal.css'; // CSS file for styling the modal

const CharacterModal = ({ isOpen, onClose, character }) => {
  if (!isOpen || !character) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-header">
          {character.pictures && character.pictures.length > 0 ? (
            <img
              src={character.pictures[0].url}
              alt={character.name}
              className="modal-image"
            />
          ) : (
            <div className="modal-image-placeholder">No Image</div>
          )}
          <h2>{character.name}</h2>
        </div>
        <div className="modal-body">
          <p><strong>Origin:</strong> {character.origin}</p>
          <p><strong>Race:</strong> {character.race || 'Unknown'}</p>
          <p><strong>Job:</strong> {character.job || 'Unknown'}</p>
          <p><strong>Height:</strong> {character.height || 'Unknown'}</p>
          <p><strong>Weight:</strong> {character.weight || 'Unknown'}</p>
          <p><strong>Description:</strong> {character.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
