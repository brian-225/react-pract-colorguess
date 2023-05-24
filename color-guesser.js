import React, { useState, useEffect } from 'react';

function ColorGuessingGame() {
  const [squareColor, setSquareColor] = useState('');
  const [buttonColors, setButtonColors] = useState([]);
  const [resultText, setResultText] = useState('');

  useEffect(() => {
    generateRandomColors();
  }, []);

  const generateRandomColors = () => {
    const colors = generateRandomColorSet();
    setSquareColor(colors.squareColor);
    setButtonColors(colors.buttonColors);
    setResultText('');
  };

  const generateRandomColorSet = () => {
    const squareColor = getRandomHexCode();
    const button1Color = getRandomHexCode();
    const button2Color = getRandomHexCode();

    const buttonColors = [
      { color: button1Color, isCorrect: false },
      { color: button2Color, isCorrect: false },
      { color: squareColor, isCorrect: true },
    ];

    return { squareColor, buttonColors: shuffleArray(buttonColors) };
  };

  const getRandomHexCode = () => {
    const letters = '0123456789ABCDEF';
    let hexCode = '#';
    for (let i = 0; i < 6; i++) {
      hexCode += letters[Math.floor(Math.random() * 16)];
    }
    return hexCode;
  };

  const handleButtonClick = (color) => {
    if (color.isCorrect) {
      setResultText('Correct!');
    } else {
      setResultText('Incorrect');
    }
    generateRandomColors();
  };

  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <div className="color-guessing-game">
      <div className="color-square" style={{ backgroundColor: squareColor }}></div>
      <div className="button-container">
        {buttonColors.map((buttonColor, index) => (
          <button
            key={index}
            className="color-button"
            style={{ backgroundColor: buttonColor.color }}
            onClick={() => handleButtonClick(buttonColor)}
          >
            {buttonColor.color}
          </button>
        ))}
      </div>
      <p className="result-text">{resultText}</p>
    </div>
  );
}

export default ColorGuessingGame;
