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
  isSelected,
  isFadedByHovered,
  nothingToFade,
  onSquareLeave,
  onSquareEnter,
  selectedColor,
} = {}) {
  let className = 'square';
  let text = '';
  let disable = false;

  if (isFadedByClick && isSelected) {
    className = 'square_blured';
    text = '';
  } else {
    className = 'square';
    if (isSelected) {
      text = selectedColor;
    }
  }
  if (!nothingToFade) {
    text = label;
  }
  if ((isFadedByHovered && !nothingToFade) || (isFadedByClick && isSelected)) {
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
  let labelColorsButton;
  let choosedColor = null;
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hoveredOverIndex, setHoveredOverIndex] = useState(null);
  const [boardOpen, setBoardOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  function handleClickSquare(i) {
    setSelectedIndex(i);
    if ((choosedColor = 'A')) {
      setSelectedColor(choosedColor);
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
    setSelectedIndex(null);
    setHoveredOverIndex(null);
    if (selectedIndex !== null) {
      choosedColor = 'A';
    }
  }
  function handleClickSelectButtonB() {
    setBoardOpen(true);
    setSelectedIndex(null);
    setHoveredOverIndex(null);
  }
  if (boardOpen === true) {
    boardClassName = 'board-row';
    buttonClassName = 'button_colors';
    labelColorsButton = 'Colors X';
  } else {
    labelColorsButton = 'Colors';
  }
  const squares = Object.entries(theme.palette).map(([key, color]) => (
    <Square
      key={key}
      label={key[0].toUpperCase(0) + key.slice(1)}
      color={color}
      onSquareClick={() => handleClickSquare(key)}
      isFadedByClick={key !== selectedIndex}
      isSelected={selectedIndex}
      onSquareLeave={() => handleSquareLeave()}
      onSquareEnter={() => handleSquareEnter(key)}
      isFadedByHovered={key !== hoveredOverIndex}
      nothingToFade={!hoveredOverIndex}
      selectedColor={selectedColor}
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
        style={{ backgroundColor: theme.palette[selectedIndex] }}
        onClick={() => handleClickSelectButtonA()}
      >
        Select New color
      </button>
      <button
        style={{ backgroundColor: 'red' }}
        onClick={() => handleClickSelectButtonB()}
      >
        Select New color
      </button>

      <div className={boardClassName}>{squares}</div>
    </div>
  );
}

export default function App() {
  return <Board />;
}
