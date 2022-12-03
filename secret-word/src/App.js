//Css
import './App.css';

//React
import { useCallback, useEffect, useState } from 'react';

//Data - words 
//É uma variável, não tem o default, importa assim. "Com chaves"
import {wordsList} from './data/words'

//Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

//Estágios do jogo
const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'},
]

//__________________________________________________________________________
function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)
  console.log(words);

  // Starts the secret word game
const startGame = () => {
  setGameStage(stages[1].name)
}

// Process the letter in the input
const verifyLetter = () => {
  setGameStage(stages[2].name)
}

// Restarts the game
const retry = () => {
  setGameStage(stages[0].name)

}

  return (
    <div className="App">
      {/* <StartScreen /> */}
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} />}
      {gameStage === 'end' && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
