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
  fadeSquare,
  onSquareLeave,
  onSquareEnter,
  index,
  boardClassName,
} = {}) {
  let className = 'square';
  let text = '';
  let disable = false;

  if (isSelectedA) {
    text = 'A';
    disable = true;
  }
  if (isSelectedB) {
    text = 'B';
    disable = true;
  }
  if (fadeSquare) {
    text = label;
  }
  if (isFadedByHovered && fadeSquare) {
    className = 'square square_blured';
    text = '';
  }
  if (boardClassName === 'board-row_suggestion') {
    if (index >= 0 && index <= 2) {
      className = 'square_retresized';
    } else if (index === 3) {
      className = 'square_expanded';
    } else {
      className = 'square';
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
  let buttonColorSelectionA = null;
  let buttonColorSelectionB = null;
  let labelColorsButton;
  const [selectedIndexA, setSelectedIndexA] = useState(null);
  const [selectedIndexB, setSelectedIndexB] = useState(null);
  const [hoveredOverIndex, setHoveredOverIndex] = useState(null);
  const [boardOpen, setBoardOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('A');
  function handleClickSquare(i) {
    if (selectedColor === 'A') {
      setSelectedIndexA(i);
      setSelectedColor('B');
    } else if (selectedColor === 'B') {
      setSelectedIndexB(i);
      setSelectedColor(null);
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
    setSelectedIndexB(null);
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
    boardClassName = 'board-row';
    if (selectedColor === 'B') {
      boardClassName = 'board-row_suggestion';
      buttonColorSelectionB = 'button_selected';
    } else if (selectedColor === 'A') {
      buttonColorSelectionA = 'button_selected';
    }
  } else {
    labelColorsButton = 'Colors';
  }
  if (selectedIndexA) {
  }
  const squares = Object.entries(theme.palette).map(([key, color], index) => (
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
      fadeSquare={hoveredOverIndex}
      index={index}
      boardClassName={boardClassName}
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
        className={buttonColorSelectionA}
        style={{
          backgroundColor: theme.palette[selectedIndexA],
          height: 32,
          width: 120,
        }}
        onClick={() => handleClickSelectButtonA()}
      >
        Color A
      </button>
      <button
        className={buttonColorSelectionB}
        style={{
          backgroundColor: theme.palette[selectedIndexB],
          height: 32,
          width: 120,
        }}
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
