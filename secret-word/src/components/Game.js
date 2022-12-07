import style from "./Game.module.css";

import React, { useRef, useState } from "react";

const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter)

    setLetter("")

    letterInputRef.current.focus() //"Current" é o valor atual do useRef
  };

  return (
    <div className={style.game}>
      <p className={style.points}>
        <span>Pontuação: {score}</span>
      </p>
      <h1>Advinhe a palavra</h1>
      <h3 className={style.tip}>
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s)</p>
      <div className={style.wordContainer}>
        {letters.map((letter, index) =>
          guessedLetters.includes(letter) ? (
            <span key={index} className={style.letter}>
              {letter}
            </span>
          ) : (
            <span key={index} className={style.blankSquare}></span>
          )
        )}
        {/* <span className={style.letter}>A</span>
        <span className={style.blankSquare}>B</span> */}
      </div>
      <div className={style.letterContainer}>
        <p>Tente advinha a letra da palavra</p>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter} //Deixando o input dinâmico
            ref={letterInputRef} //Defini numa referência, como se fosse querySelector. 

          />
          <button>Jogar </button>
        </form>
      </div>
      <div className={style.wrongLettersContainer}>
        <p>Letras já utilizadas</p>
        {wrongLetters.map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
        {/* <span>b, c</span>
        <span>d, e</span> */}
      </div>
    </div>
  );
};

export default Game;
