import React, { useState, useRef } from 'react';
import Column from './Column';
import '../styles/TrelloBoard.css';

const TrelloBoard = () => {
  const [columns, setColumns] = useState([
    {
      id: 'col1',
      title: 'Por hacer',
      cards: [
        { id: 'card1', content: 'Diseñar mockups de la interfaz', labels: ['blue', 'green'] },
        { id: 'card2', content: 'Configurar base de datos', labels: ['red'] },
        { id: 'card3', content: 'Revisar documentación de API', labels: ['yellow'] }
      ]
    },
    {
      id: 'col2',
      title: 'En progreso',
      cards: [
        { id: 'card4', content: 'Implementar autenticación de usuarios', labels: ['orange', 'purple'] },
        { id: 'card5', content: 'Crear componentes reutilizables', labels: ['blue'] }
      ]
    },
    {
      id: 'col3',
      title: 'Completado',
      cards: [
        { id: 'card6', content: 'Configurar proyecto inicial', labels: ['green'] },
        { id: 'card7', content: 'Instalar dependencias', labels: ['green'] }
      ]
    }
  ]);

  const [draggedCard, setDraggedCard] = useState(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState(null);
  const [activeColumnMenu, setActiveColumnMenu] = useState(null);

  const addColumn = () => {
    const newColumn = {
      id: 'col' + Date.now(),
      title: 'Nueva lista',
      cards: []
    };
    setColumns([...columns, newColumn]);
  };

  const updateColumnTitle = (columnId, newTitle) => {
    setColumns(columns.map(col => 
      col.id === columnId ? { ...col, title: newTitle } : col
    ));
  };

  const moveCard = (cardId, fromColumnId, toColumnId) => {
    const newColumns = [...columns];
    const fromColumn = newColumns.find(col => col.id === fromColumnId);
    const toColumn = newColumns.find(col => col.id === toColumnId);
    
    if (fromColumn && toColumn) {
      const cardIndex = fromColumn.cards.findIndex(card => card.id === cardId);
      if (cardIndex !== -1) {
        const card = fromColumn.cards.splice(cardIndex, 1)[0];
        toColumn.cards.push(card);
        setColumns(newColumns);
      }
    }
  };

  const addCard = (columnId, content) => {
    const newCard = {
      id: 'card' + Date.now(),
      content: content,
      labels: []
    };
    
    setColumns(columns.map(col => 
      col.id === columnId 
        ? { ...col, cards: [...col.cards, newCard] }
        : col
    ));
  };

  const copyColumn = (columnId) => {
    const column = columns.find(col => col.id === columnId);
    if (column) {
      const newColumn = {
        id: 'col' + Date.now(),
        title: column.title + ' (copia)',
        cards: column.cards.map(card => ({
          ...card,
          id: 'card' + Date.now() + Math.random()
        }))
      };
      setColumns([...columns, newColumn]);
    }
    setActiveColumnMenu(null);
  };

  const deleteColumn = (columnId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta lista?')) {
      setColumns(columns.filter(col => col.id !== columnId));
    }
    setActiveColumnMenu(null);
  };

  const handleCardDragStart = (cardId, fromColumnId) => {
    setDraggedCard(cardId);
    setDraggedFromColumn(fromColumnId);
  };

  const handleCardDragEnd = () => {
    setDraggedCard(null);
    setDraggedFromColumn(null);
  };

  const handleColumnDrop = (toColumnId) => {
    if (draggedCard && draggedFromColumn) {
      moveCard(draggedCard, draggedFromColumn, toColumnId);
    }
  };

  return (
    <div className="trello-board">
      <div className="header">
        <h1>📋 Mi Tablero</h1>
      </div>
      
      <div className="board-container">
        {columns.map(column => (
          <Column 
            key={column.id}
            column={column}
            onUpdateTitle={updateColumnTitle}
            onAddCard={addCard}
            onCopyColumn={copyColumn}
            onDeleteColumn={deleteColumn}
            onCardDragStart={handleCardDragStart}
            onCardDragEnd={handleCardDragEnd}
            onColumnDrop={handleColumnDrop}
            draggedCard={draggedCard}
            activeColumnMenu={activeColumnMenu}
            setActiveColumnMenu={setActiveColumnMenu}
          />
        ))}
        
        <button className="add-column-btn" onClick={addColumn}>
          + Agregar otra lista
        </button>
      </div>
    </div>
  );
};

export default TrelloBoard;
