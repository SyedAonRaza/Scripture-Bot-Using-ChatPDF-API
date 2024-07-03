import React from 'react';
import './DragDropArea.css';

function DragDropArea({ onDrop, dragCompleted }) {
  const handleDrop = (event) => {
    event.preventDefault();
    onDrop();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="drag-drop-area" onDrop={handleDrop} onDragOver={handleDragOver}>
      {dragCompleted ? 'Drag and Drop Completed' : 'Drag and Drop Here to Get Started'}
    </div>
  );
}

export default DragDropArea;
