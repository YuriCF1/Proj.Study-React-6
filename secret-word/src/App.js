// TENTAR FAZE
// - ACENTOS DAS LETRAS, IGNORAR - Done
// Mudar a cor quando acertar - Done
// Salvar a palavra no local storage para não mudar ao recarregar
//Fazer botão para as palavras em inglês 

//Css
import "./App.css";

//React
import { useCallback, useEffect, useRef, useState } from "react";

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

const InitialGuesses = 25;

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

  const palavra = useRef()
  const [wordGuessed, setWordGuessed] = useState()
  
  let counter = 0;
  for (let i = 0; i < Object.keys(allWords).length; i++) {
    counter += Object.values(allWords)[i].length
  }
  
  console.log(counter);
  
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
      return pickedWordAndCatergory()
    } else if (!used.includes(word)) {
      setUsed((actualUsed) => [...actualUsed, word]);
      return { word, category }; //Retornando como objeto usando chaves. Se for colchetes, dá erro, pois vira 'array'
    } 

  }, [allWords, used]);

  // Starts the secret word game________________________________________
  const startGame = useCallback(() => {
    //Clear states
    clearLetterStates();
    setWordGuessed(false)


    //Pick word and pick category
    if (used.length !== counter) {
      console.log(gameStage);
      var { word, category } = pickedWordAndCatergory();

    } else {
        return setGameStage(stages[2].name);
    }

      //Creating am array of letters
      var wordLetters = word.split("");
      wordLetters = wordLetters.map((letter) => letter.toLowerCase());
      setOriginals(wordLetters);

      let noAcents = word
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase(); // Tirando os acentos das letras
      let arrayNoAcents = noAcents.split("");

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

      setGameStage(stages[1].name); 
  }, [pickedWordAndCatergory, gameStage, counter, used]); // Quando essa função mudar, o useCallback reconstruirá a startGame, pois a mesma tem tal dependência***************************

  // Process the letter in the input_______________________________________________________________________________________________
  const verifyLetter = (letter) => {
    const normalizeLetter = letter.toLowerCase();

    //Check if letter has already been tried
    if (
      guessedLetters.includes(normalizeLetter) ||
      wrongLetters.includes(normalizeLetter)
    ) {
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
      // let anotherLetter = originals[indexOfLetter]
      setGussedLetters((actualGuessedLetters) => [
        //Retornando como objeto usando chaves. Se for colchetes, dá erro, pois vira 'array'
        ...actualGuessedLetters,
        normalizeLetter,
        // anotherLetter,
      ]);
      console.log("Letras tentadas", guessedLetters);

    } else {
      setWrongLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizeLetter,
      ]);
      setGuesses((actualGuesses) => [actualGuesses - 1]);
    }
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
    const uniqueLetters = [...new Set(letters)]; //Tirando as letras repetidas

    // Right word
    if (guessedLetters.length === uniqueLetters.length) {
      console.log('acertadas: ', uniqueLetters);
      // add score
      setScore((actualScore) => (actualScore += 100));

      // ******************************restart the game with a new word******************************
      setWordGuessed(true)
      setTimeout(startGame, 1000)
    }

    //Todo dado monitorado precisa ser posto no array
  }, [guessedLetters, letters, startGame]); //NESSE CASO, se esses 2 últimos elementos a mais mudarem, não vai acontecer nada. Porém, ficar atento ao aviso no futuro
  //Sendo uma função dependente do useEffect, ela irá executar várias vezes. ISSO NÂO PODE, por isso, tem que haver o useCallback na mesma ***********************************

  // Restarts the game
  const retry = () => {
    setScore(0);
    setGuesses(InitialGuesses);

    setGameStage(stages[0].name);
    setUsed([])
  };

  useEffect(() => {
    console.log("Palavras já escolhidas: ", used);
  }, [used]);
  
  const show = (w)=> {
   if (wordGuessed) {
      w.classList.remove('Game_wordContainer__Qq1kP');
      w.classList.add('Game_wordContainerRight__8ALVU');
   } else if (!wordGuessed) {
      w.classList.remove('Game_wordContainerRight__8ALVU');
      w.classList.add ('Game_wordContainer__Qq1kP');
   }
 
  //   if(w && wordGuessed) {
  //     w.classList.remove('Game_letter__uXOTj');
  //     w.classList.add('Game_letterRight__vS+Vo');
  //   } else if (w && !wordGuessed) {
  //     w.style.cssText = 'color: black'       
  //   }
  }

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
          retry={retry}
          palavra={palavra}
          show={show}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;





// POSSÍVEL EXEMPLO DE IMPORTAR DOM NODE DA CHILD COMPONENT
// import React from 'react'

// class Input extends React.Component {
//   constructor(props) {
//     super(props)
//     // create a ref to store the textInput DOM element
//     this.textInput = React.createRef()
//   }

//   focus() {
//     // EXPLANATION: a reference to the node becomes accessible at the current attribute of the ref.
//     // make the DOM node focus
//     this.textInput.current.focus();
//   }
  
//   render() {
//     return (
//       <input
//         type="text"
//         ref={this.textInput}
//       />
//     )
//   }
// }