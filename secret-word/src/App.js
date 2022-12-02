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

  return (
    <div className="App">
      {/* <StartScreen /> */}
      {gameStage === 'start' && <StartScreen />}
      {gameStage === 'game' && <Game />}
      {gameStage === 'end' && <GameOver />}
    </div>
  );
}

export default App;
