//Css
import "./App.css";

//React
import { useCallback, useEffect, useState } from "react";

//Data - words
//É uma variável, não tem o default, importa assim. "Com chaves"
import { wordsList } from "./data/words";

//Components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

//Estágios do jogo
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const InitialGuesses = 3;

//__________________________________________________________________________
function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setpickedCategory] = useState("");
  const [letters, setLetters] = useState("");

  const [guessedLetters, setGussedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(InitialGuesses);
  const [score, setScore] = useState(0);

  const pickedWordAndCatergory = () => {
    // Pick a random category
    const categories = Object.keys(words);
    let randomCategory = Math.floor(
      Math.random() * Object.keys(categories).length
    );
    const category = categories[randomCategory];

    // Pick a random category
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category }; //Retornando como objeto usando chaves. Se for colchetes, dá erro, pois vira 'array'
  };

  // Starts the secret word game
  const startGame = () => {
    //Pick word and pick category
    const { word, category } = pickedWordAndCatergory();

    //Creating am array of letters
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((letter) => letter.toLowerCase());

    //fill state
    setPickedWord(word);
    setpickedCategory(category);
    setLetters(wordLetters);

    console.log(word);
    console.log(category);
    console.log(wordLetters);

    setGameStage(stages[1].name);
  };

  // Process the letter in the input_______________________________________________________________________________________________
  const verifyLetter = (letter) => {
    const normalizeLetter = letter.toLowerCase();

    //Check if letter has already been tried
    if (
      guessedLetters.includes(normalizeLetter) ||
      wrongLetters.includes(normalizeLetter)
    ) {
      console.log('Acertadas:', guessedLetters);
      console.log('Erradas:', wrongLetters);
      console.log('Tentada:', letter);
      return;
    }

    //Push guessed letter or remove a guess
    if (letters.includes(normalizeLetter)) {
      setGussedLetters((actualGuessedLetters) => [ //Retornando como objeto usando chaves. Se for colchetes, dá erro, pois vira 'array'
        ...actualGuessedLetters,
        normalizeLetter,
      ]);
    } else {
      setWrongLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizeLetter,
      ]);

      setGuesses((actualGuesses) => [ actualGuesses - 1 ]
      )
    }

    console.log('Acertadas:', guessedLetters);
    console.log('Erradas:', wrongLetters);
    console.log('Tentada:', letter);
    // setGameStage(stages[2].name);
  };

  const clearStates = () => {
    setGussedLetters([]);
    setWrongLetters([]);

  }
// Check if the guesses ended
  useEffect(() => {
    if (guesses <= 0) {
      //reset all states
      clearStates()

      setGameStage(stages[2].name) 
    }

  },[guesses])

  // Check win condition
  useEffect(() => {

  }, [])

  // Restarts the game
  const retry = () => {
    setScore(0)
    setGuesses(InitialGuesses)

    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {/* <StartScreen /> */}
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
