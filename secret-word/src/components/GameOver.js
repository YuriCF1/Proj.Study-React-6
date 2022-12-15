import style from './GameOver.module.css'

import React from 'react'

const GameOver = ({retry, score}) => {
  return (
    <div>
      <h1>Game Over</h1>
      <h2 className={style.points}>Sua pontuação: {score}</h2>
      <button onClick={retry}>Recomeçar</button>
    </div>
  )
}

export default GameOver