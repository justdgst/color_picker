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
  isSelectedA,
  isSelectedB,
  isFadedByHovered,
  nothingToFade,
  onSquareLeave,
  onSquareEnter,
} = {}) {
  let className = 'square';
  let text = '';
  let disable = false;

  if (isSelectedA) {
    text = 'A';
  }
  if (isSelectedB) {
    text = 'B';
  }
  if (!nothingToFade) {
    text = label;
  }
  if (isFadedByHovered && !nothingToFade) {
    className = 'square_blured';
    text = '';
  }

  return (
    <button
      className={className}
      onClick={onSquareClick}
      style={{ backgroundColor: color }}
      onMouseEnter={onSquareEnter}
      onMouseLeave={onSquareLeave}
    >
      {text}
    </button>
  );
}

function Board() {
  let boardClassName = 'board-row_closed';
  let buttonClassName = 'button_colors_closed';
  let labelColorsButton;
  const [selectedIndexA, setSelectedIndexA] = useState(null);
  const [selectedIndexB, setSelectedIndexB] = useState(null);
  const [hoveredOverIndex, setHoveredOverIndex] = useState(null);
  const [boardOpen, setBoardOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('A');
  function handleClickSquare(i) {
    console.log(selectedColor);
    if (selectedColor === 'A') {
      setSelectedIndexA(i);
    } else if (selectedColor === 'B') {
      setSelectedIndexB(i);
    }
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
  function handleClickSelectButtonA() {
    setBoardOpen(true);
    setSelectedIndexA(null);
    setSelectedColor('A');
  }
  function handleClickSelectButtonB() {
    setBoardOpen(true);
    setSelectedIndexB(null);
    setSelectedColor('B');
  }
  if (boardOpen === true) {
    buttonClassName = 'button_colors';
    labelColorsButton = 'Colors X';
    if (selectedColor === 'B') {
      boardClassName = 'board-row_suggestion';
    } else {
      boardClassName = 'board-row';
    }
  } else {
    labelColorsButton = 'Colors';
  }
  const squares = Object.entries(theme.palette).map(([key, color]) => (
    <Square
      key={key}
      label={key[0].toUpperCase(0) + key.slice(1)}
      color={color}
      onSquareClick={() => handleClickSquare(key)}
      isSelectedA={key === selectedIndexA}
      isSelectedB={key === selectedIndexB}
      onSquareLeave={() => handleSquareLeave()}
      onSquareEnter={() => handleSquareEnter(key)}
      isFadedByHovered={key !== hoveredOverIndex}
      nothingToFade={!hoveredOverIndex}
    />
  ));

  return (
    <div>
      <button
        className={buttonClassName}
        onClick={() => {
          handleClickColorsButton();
        }}
      >
        {labelColorsButton}
      </button>

      <button
        style={{ backgroundColor: theme.palette[selectedIndexA] }}
        onClick={() => handleClickSelectButtonA()}
      >
        Color A
      </button>
      <button
        style={{ backgroundColor: theme.palette[selectedIndexB] }}
        onClick={() => handleClickSelectButtonB()}
      >
        Color B
      </button>

      <div className={boardClassName}>{squares}</div>
    </div>
  );
}

export default function App() {
  return <Board />;
}
