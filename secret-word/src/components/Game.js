import style from './Game.module.css'

import React from 'react'

const Game = ({verifyLetter}) => {
  return (

    <div className={style.game}>
      <p className={style.points}>
        <span>Pontuação: 000</span>
      </p>
      <h1>Advinhe a palavra</h1>
      <h3 className={style.tip}>
        Dica sobre a palavra: <span>Dica...</span>
      </h3>
      <div className={style.wordContainer}>
        <span className={style.letter}>A</span>
        <span className={style.blankSquare}>B</span>
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
        <span>b, c</span>
        <span>d, e</span>
      </div>
    </div>
  )
}

export default Game