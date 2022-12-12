// TENTAR FAZE
// - ACENTOS DAS LETRAS, IGNORAR

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

const InitialGuesses = 30;

//__________________________________________________________________________
function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [allWords] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setpickedCategory] = useState("");
  const [letters, setLetters] = useState("");

  const [guessedLetters, setGussedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(InitialGuesses);
  const [score, setScore] = useState(0);

  const [originals, setOriginals] = useState([]);

  const [used, setUsed] = useState([]);

  // Pick a random category and word
  const pickedWordAndCatergory = useCallback(() => {
    const categories = Object.keys(allWords);
    let randomCategory = Math.floor(
      Math.random() * Object.keys(categories).length
    );
    const category = categories[randomCategory];

    const word =
    allWords[category][Math.floor(Math.random() * allWords[category].length)];
    console.log("Palavra de agora: ", word);
    
    
    if (used.includes(word)) {
      console.log("Já tem");
      return pickedWordAndCatergory()
    } else if (!used.includes(word)) {
      setUsed((actualUsed) => [...actualUsed, word]);
      console.log("Nao tem");
      return { word, category }; //Retornando como objeto usando chaves. Se for colchetes, dá erro, pois vira 'array'
    } 
    // else if (used.length ===) {

    // }

  }, [allWords, used]);

  // Starts the secret word game________________________________________
  const startGame = useCallback(() => {
    //Clear states
    clearLetterStates();

    //Pick word and pick category
    var { word, category } = pickedWordAndCatergory();

      //Creating am array of letters
      var wordLetters = word.split("");
      wordLetters = wordLetters.map((letter) => letter.toLowerCase());
      setOriginals(wordLetters);

      let noAcents = word
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase(); // Tirando os acentos das letras
      let arrayNoAcents = noAcents.split("");
      // console.log('Sem assento: ', noAcents);
      // console.log('Array sem assento: ', arrayNoAcents);

      // __________________________________________________TESTE
      // const wita = word.normalize("NFKC")
      // console.log('Normalizada: ', wita);

      // let a = 'Anão'
      // // let b = a.split('')
      // let c = a.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Tirando os acentos das letras
      // console.log('Tentativa: ', c);
      // __________________________________________________TESTE

      //fill state
      setPickedWord(word);
      setpickedCategory(category);
      // setLetters(wordLetters);
      setLetters(arrayNoAcents);

      // console.log('Palavra com assento: ', word);
      // console.log('Array com assento: ', wordLetters);

      setGameStage(stages[1].name);
  }, [pickedWordAndCatergory]); // Quando essa função mudar, o useCallback reconstruirá a startGame, pois a mesma tem tal dependência***************************

  // Process the letter in the input_______________________________________________________________________________________________
  const verifyLetter = (letter) => {
    const normalizeLetter = letter.toLowerCase();

    //Check if letter has already been tried
    if (
      guessedLetters.includes(normalizeLetter) ||
      wrongLetters.includes(normalizeLetter)
    ) {
      // console.log("Acertadas:", guessedLetters);
      // console.log("Erradas:", wrongLetters);
      // console.log('Tentada:', letter);
      return;
    }

    //Push guessed letter or remove a guess
    // if (letters.includes(normalizeLetter)) {
    //   setGussedLetters((actualGuessedLetters) => [
    //     //Retornando como objeto usando chaves. Se for colchetes, dá erro, pois vira 'array'
    //     ...actualGuessedLetters,
    //     normalizeLetter,

    if (letters.includes(normalizeLetter)) {
      // let indexOfLetter = letters.indexOf(normalizeLetter) //Inútil?
      // console.log('Index', indexOfLetter);
      // let anotherLetter = originals[indexOfLetter]
      // console.log('TRUE');

      setGussedLetters((actualGuessedLetters) => [
        //Retornando como objeto usando chaves. Se for colchetes, dá erro, pois vira 'array'
        ...actualGuessedLetters,
        normalizeLetter,
        // anotherLetter,
      ]);

      // console.log('Array original: ', originals);
      // console.log('Letra original: ', originals[indexOfLetter]);
      console.log("Letras tentadas", guessedLetters);

      // console.log(normalizeLetter);
      // console.log(wordLetters);
      // console.log('INDEX: ', wordLetters[indexOfLetter])
      // console.log("Acertadas:", guessedLetters);
    } else {
      setWrongLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizeLetter,
      ]);
      // console.log("Erradas:", wrongLetters);

      setGuesses((actualGuesses) => [actualGuesses - 1]);
    }
    // console.log('Acertadas:', guessedLetters);
    // console.log('Erradas:', wrongLetters);
    // console.log('Tentada:', letter);
    // setGameStage(stages[2].name);
  };

  const clearLetterStates = () => {
    setGussedLetters([]);
    setWrongLetters([]);
  };

  // Check if the guesses ended
  useEffect(() => {
    if (guesses <= 0) {
      //reset all states
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // Check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];
    // console.log("Lista de repetidas", uniqueLetters);

    // Right word
    if (guessedLetters.length === uniqueLetters.length) {
      // add score
      setScore((actualScore) => (actualScore += 100));

      // restart the game with a new word
      startGame();
    }

    //Todo dado monitorado precisa ser posto no array
  }, [guessedLetters, letters, startGame]); //NESSE CASO, se esses 2 últimos elementos a mais mudarem, não vai acontecer nada. Porém, ficar atento ao aviso no futuro
  //Sendo uma função dependente do useEffect, ela irá executar várias vezes. ISSO NÂO PODE, por isso, tem que haver o useCallback na mesma ***********************************

  // Restarts the game
  const retry = () => {
    setScore(0);
    setGuesses(InitialGuesses);

    setGameStage(stages[0].name);
  };

  useEffect(() => {
    console.log("Palavras já escolhidas: ", used);
  }, [used]);

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
          originals={originals}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
