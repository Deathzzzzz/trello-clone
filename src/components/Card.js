import React from 'react';
import '../styles/Card.css';

const Card = ({ card, columnId, onCardDragStart, onCardDragEnd, isDragging }) => {
  const handleDragStart = (e) => {
    onCardDragStart(card.id, columnId);
  };

  const handleDragEnd = (e) => {
    onCardDragEnd();
  };

  return (
    <div 
      className={`card ${isDragging ? 'dragging' : ''}`}
      draggable
      data-card-id={card.id}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="card-labels">
        {card.labels.map((label, index) => (
          <div key={index} className={`label ${label}`}></div>
        ))}
      </div>
      <div className="card-content">{card.content}</div>
    </div>
  );
};

export default Card;
