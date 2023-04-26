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
  suggestedIndex,
  step,
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
    className = 'square blured';
    text = '';
  }
  if (step === 'suggestion') {
    if (index === suggestedIndex) {
      className = 'square expanded';
      if (isFadedByHovered && fadeSquare) {
        className = 'square expanded blured';
      }
    } else if (index >= suggestedIndex - 3 && index < suggestedIndex) {
      className = 'square minimized';
      if (isFadedByHovered && fadeSquare) {
        className = 'square minimized blured';
      }
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
  let boardClassName = 'board-row closed';
  let buttonClassName = 'button_colors closed';
  let step = null;
  let buttonColorSelectionA = 'button';
  let buttonColorSelectionB = 'button';
  let labelColorsButton;
  let suggestedIndex = null;
  const [selectedColor, setSelectedColor] = useState('A');
  const [selectedColorA, setSelectedColorA] = useState(null);
  const [selectedColorB, setSelectedColorB] = useState(null);
  const [overColor, setOverColor] = useState(null);
  const [boardOpen, setBoardOpen] = useState(false);
  const [selectedIndexA, setSelectedIndexA] = useState(null);

  function handleClickSquare(c, i) {
    setOverColor(null);
    if (selectedColor === 'A') {
      setSelectedColorA(c);
      setSelectedIndexA(i);
      setSelectedColor('B');
    } else if (selectedColor === 'B') {
      setSelectedColorB(c);
      setSelectedColor(null);
    }
  }
  function handleSquareLeave() {
    setOverColor(null);
  }
  function handleSquareEnter(i) {
    setOverColor(i);
  }
  function handleClickColorsButton() {
    setBoardOpen(!boardOpen);
  }
  function handleClickSelectButtonA() {
    setBoardOpen(true);
    setSelectedColorA(null);
    setSelectedColorB(null);
    setSelectedColor('A');
  }
  function handleClickSelectButtonB() {
    setBoardOpen(true);
    setSelectedColorB(null);
    setSelectedColor('B');
  }
  if (selectedIndexA !== null) {
    if (selectedIndexA % 2 === 1) {
      suggestedIndex = selectedIndexA + 4;
    } else {
      suggestedIndex = selectedIndexA + 3;
    }
    if (suggestedIndex >= Object.entries(theme.palette).length) {
      suggestedIndex = 3;
    }
  }
  if (boardOpen === true) {
    buttonClassName = 'button_colors';
    labelColorsButton = 'Colors X';
    boardClassName = 'board-row';
    if (selectedColor === 'B') {
      step = 'suggestion';
      buttonColorSelectionB = 'button_selected';
    } else if (selectedColor === 'A') {
      buttonColorSelectionA = 'button_selected';
    }
  } else {
    labelColorsButton = 'Colors';
  }

  const squares = Object.entries(theme.palette).map(([key, color], index) => (
    <Square
      key={key}
      label={key}
      color={color}
      onSquareClick={() => handleClickSquare(key, index)}
      isSelectedA={key === selectedColorA}
      isSelectedB={key === selectedColorB}
      onSquareLeave={handleSquareLeave}
      onSquareEnter={() => handleSquareEnter(key)}
      isFadedByHovered={key !== overColor}
      fadeSquare={overColor}
      index={index}
      suggestedIndex={suggestedIndex}
      step={step}
    />
  ));

  return (
    <div>
      <button className={buttonClassName} onClick={handleClickColorsButton}>
        {labelColorsButton}
      </button>

      <button
        className={buttonColorSelectionA}
        style={{
          backgroundColor: theme.palette[selectedColorA],
          height: 32,
          width: 120,
        }}
        onClick={handleClickSelectButtonA}
      >
        Color A
      </button>
      <button
        className={buttonColorSelectionB}
        style={{
          backgroundColor: theme.palette[selectedColorB],
          height: 32,
          width: 120,
        }}
        onClick={handleClickSelectButtonB}
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
