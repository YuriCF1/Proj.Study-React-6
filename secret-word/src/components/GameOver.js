import {style} from './GameOver.module.css'

import React from 'react'

const GameOver = ({retry}) => {
  return (
    <div>
      <h1>Game Over</h1>
      <button onClick={retry}>Recomeçar</button>
    </div>
  )
}

export default GameOver