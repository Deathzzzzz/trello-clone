import React, { useState, useRef, useEffect } from 'react';
import '../styles/AddCardForm.css';

const AddCardForm = ({ onAddCard, onCancel }) => {
  const [content, setContent] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    if (content.trim()) {
      onAddCard(content.trim());
      setContent('');
    } else {
      onCancel();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="add-card-form">
      <textarea
        ref={textareaRef}
        className="add-card-textarea"
        placeholder="Introduce un título para esta tarjeta..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <div className="add-card-actions">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Agregar tarjeta
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default AddCardForm;
