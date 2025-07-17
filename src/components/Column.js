import React, { useState, useRef } from 'react';
import Card from './Card';
import AddCardForm from './AddCardForm';
import '../styles/Column.css';

const Column = ({ 
  column, 
  onUpdateTitle, 
  onAddCard, 
  onCopyColumn, 
  onDeleteColumn,
  onCardDragStart,
  onCardDragEnd,
  onColumnDrop,
  draggedCard,
  activeColumnMenu,
  setActiveColumnMenu
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const menuRef = useRef(null);

  const handleTitleChange = (e) => {
    onUpdateTitle(column.id, e.target.value);
  };

  const handleTitleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    
    if (activeColumnMenu === column.id) {
      setActiveColumnMenu(null);
    } else {
      setActiveColumnMenu(column.id);
    }
  };

  const handleAddCard = (content) => {
    onAddCard(column.id, content);
    setShowAddForm(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    onColumnDrop(column.id);
  };

  return (
    <div 
      className={`column ${isDragOver ? 'drag-over' : ''}`}
      data-column-id={column.id}
    >
      <div className="column-header">
        <input 
          type="text" 
          className="column-title" 
          value={column.title}
          onChange={handleTitleChange}
          onKeyPress={handleTitleKeyPress}
        />
        <button className="column-menu" onClick={toggleMenu}>
          ⋯
        </button>
        {activeColumnMenu === column.id && (
          <div className="column-actions show" ref={menuRef}>
            <button onClick={() => setShowAddForm(true)}>Agregar tarjeta</button>
            <button onClick={() => onCopyColumn(column.id)}>Copiar lista</button>
            <button className="delete" onClick={() => onDeleteColumn(column.id)}>
              Eliminar lista
            </button>
          </div>
        )}
      </div>
      
      <div 
        className="cards-container"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {column.cards.map(card => (
          <Card 
            key={card.id}
            card={card}
            columnId={column.id}
            onCardDragStart={onCardDragStart}
            onCardDragEnd={onCardDragEnd}
            isDragging={draggedCard === card.id}
          />
        ))}
      </div>
      
      {showAddForm ? (
        <AddCardForm 
          onAddCard={handleAddCard}
          onCancel={() => setShowAddForm(false)}
        />
      ) : (
        <button 
          className="add-card-btn" 
          onClick={() => setShowAddForm(true)}
        >
          + Agregar una tarjeta
        </button>
      )}
    </div>
  );
};

export default Column;
