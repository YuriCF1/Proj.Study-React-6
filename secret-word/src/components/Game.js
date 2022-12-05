import style from './Game.module.css'

import React from 'react'

const Game = ({verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score}) => {
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
        {letters.map((letter, index) => (
          guessedLetters.includes(letter) ? (
            <span key={index} className={style.letter}>{letter}</span>

          ) : (
            <span key={index} className={style.blankSquare}></span>
          )
        ))}
        {/* <span className={style.letter}>A</span>
        <span className={style.blankSquare}>B</span> */}
      </div>
      <div className={style.letterContainer}>
        <p>Tente advinha a letra da palavra</p>
        <form action="">
          <input type="text" name='letter' maxLength="1" required/>
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
  )
}

export default Game