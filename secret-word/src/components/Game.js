import style from "./Game.module.css";

import React, { useEffect, useRef, useState } from "react";

export const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
  retry,

  originals,
  palavra,
  show,
}) => {
  const [letterInput, setLetterInput] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letterInput);

    setLetterInput("");

    letterInputRef.current.focus(); //"Current" é o valor atual do useRef
  };

  useEffect(() => {
    show(palavra.current);
  }, [guessedLetters, show, palavra]);

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
      <div className={style.wordContainer} ref={palavra}>
        {letters.map((letra, index) => {
          if (guessedLetters.includes(letra)) {
            // console.log('Letra encontrada!!: ', originals[index]);
            return (
              // <span key={index} ref={palavra}>
              <span key={index} className={style.letter}>
                {originals[index]}
              </span>
            );
          } else {
            return <span key={index} className={style.blankSquare}></span>;
          }
        })}

        {/* {letters.map((letter, index) =>
          guessedLetters.includes(letter) ? (
            <span key={index} className={style.letter}>
            {originals[index]}
            </span>
            ) : (
              <span key={index} className={style.blankSquare}></span>
              )
            )} */}
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
            onChange={(e) => setLetterInput(e.target.value)} //PEGANDO O VALOR DO INPUT
            value={letterInput} //Deixando o input dinâmico
            ref={letterInputRef} //Defini numa referência, como se fosse querySelector.
          />
          <button>Jogar </button>
        </form>
      </div>
      <div className={style.wrongLettersContainer}>
        <p>Letras erradas</p>
        {wrongLetters.map((letter, index) => (
          <span key={index}>{`${letter}, `}</span>
        ))}
      </div>
      <div className={style.home}>
        <button onClick={retry}>Tela inicial</button>
      </div>
    </div>
  );
};

export default Game;
