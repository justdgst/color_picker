import React, { useState } from 'react';
import './App.css';

const theme = {
  palette: {
    brick: '#E55E5E',
    teal: '#008080',
    blue: '#54ceeb',
    red: '#800000',
    pink: '#ea82f0',
    green: '#c2e55e',
    yellow: '#e5ac5e',
    orange: '#d83b00',
  },
};

function Square({
  color,
  label,
  onSquareClick,
  isFadedByClick,
  isFadedByHovered,
  nothingToFade,
  onSquareLeave,
  onSquareEnter,
} = {}) {
  let className = 'square';
  let text = '';
  let disable = false;

  if (isFadedByClick) {
    className = 'square_blured';
    text = '';
  } else {
    className = 'square';
  }
  if (!nothingToFade) {
    text = label;
  }
  if ((isFadedByHovered && !nothingToFade) || isFadedByClick) {
    className = 'square_blured';
    text = '';
    if (isFadedByClick) {
      disable = true;
    }
  }

  return (
    <button
      className={className}
      onClick={onSquareClick}
      style={{ backgroundColor: color }}
      onMouseEnter={onSquareEnter}
      onMouseLeave={onSquareLeave}
      disabled={disable}
    >
      {text}
    </button>
  );
}

function Board() {
  let boardClassName = 'board-row_closed';
  let buttonClassName = 'button_colors_closed';
  let label;
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hoveredOverIndex, setHoveredOverIndex] = useState(null);
  const [boardOpen, setBoardOpen] = useState(false);
  function handleClickSquare(i) {
    setSelectedIndex(i);
  }
  function handleSquareLeave() {
    setHoveredOverIndex(null);
  }
  function handleSquareEnter(i) {
    setHoveredOverIndex(i);
  }
  function handleClickColorsButton() {
    setBoardOpen(!boardOpen);
  }
  function handleClickSelectButton() {
    setSelectedIndex(null);
    setHoveredOverIndex(null);
  }

  if (boardOpen === true) {
    boardClassName = 'board-row';
    buttonClassName = 'button_colors';
    label = 'Colors X';
  }
  const squares = Object.entries(theme.palette).map(([key, color]) => (
    <Square
      key={key}
      label={key[0].toUpperCase(0) + key.slice(1)}
      color={color}
      onSquareClick={() => handleClickSquare(key)}
      isFadedByClick={selectedIndex && key !== selectedIndex}
      onSquareLeave={() => handleSquareLeave()}
      onSquareEnter={() => handleSquareEnter(key)}
      isFadedByHovered={key !== hoveredOverIndex}
      nothingToFade={!hoveredOverIndex}
    />
  ));
  return (
    <div>
      <button
        onClick={() => {
          handleClickColorsButton();
        }}
      >
        Colors
      </button>
      <button
        style={{ backgroundColor: 'red' }}
        onClick={() => handleClickSelectButton()}
      >
        Select New color
      </button>
      <div>
        <button
          className={buttonClassName}
          onClick={() => {
            handleClickColorsButton();
          }}
        >
          {label}
        </button>
        <div className={boardClassName}>{squares}</div>
      </div>
    </div>
  );
}

export default function App() {
  return <Board />;
}
