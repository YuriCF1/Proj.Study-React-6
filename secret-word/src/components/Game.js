import {style} from './Game.module.css'

import React from 'react'

const Game = ({verifyLetter}) => {
  return (

    <div className="game">
      <p className="points">
        <span>Pontuação: 000</span>
      </p>
      <h1>Advinhe a palavra</h1>
      <h3 className="type">
        Dica sobre a palavra: <span>Dica...</span>
      </h3>
      <div className="wordContainer">
        <span className='letter'>A</span>
        <span className='blankSquare'>B</span>
      </div>
      <div className="letterContainer">
        <p>Tente advinha a letra da palavra</p>
        <form action="">
          <input type="text" name='letter' maxLength="1" required/>
          <button>Jogar </button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas</p>
        <span>b, c</span>
        <span>d, e</span>
      </div>
    </div>
    // <div>
    //   <h1>Game</h1>
    //   <button onClick={verifyLetter}>Finalizar jogo</button>
    // </div>
  )
}

export default Game