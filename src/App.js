//CSS
import './App.css';

//componentes Reacts
import StartScreen from './components/StartScreen';

// data
import { wordsList } from './data/words';
import Game from './components/Game';
import End from './components/End';

//Import React
import { useCallback, useEffect, useState } from 'react';

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' },
];

const guessesQty = 3

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  //
  const [pickerdWord, setPickedWord] = useState("");
  const [pickerdCategory, setpickerdCategory] = useState("");
  const [letters, setLetters] = useState([]);

  // letras
  const [guessedletters, setGuessedLetters] = useState("");
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words); // pegando as chaves dos objetos em words

    // pegaqndo uma categoria aleatoriamente
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    console.log(category);

    // pegando uma palavra dentro de uma categoria e deixando aleatoria
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    console.log(word);

    return { word, category };
  }, [words]);


  // começo do jogo
  const startGame = useCallback(() => {
    //resetando depois do acerto
    clearLetterStates();

    //destruturando variaveis 
    const { word, category } = pickWordAndCategory();

    console.log(word, category);

    //transformando a palavra em letras
    let wordLetters = word.split("");

    //Tirando o case-Sensitive 
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    console.log(word, category);
    console.log(wordLetters);

    //setando os states
    setPickedWord(word);
    setpickerdCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  // processsmento de input das letras
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    //chegando se a letra já foi usada

    if (guessedletters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // selecionar letra advinhada ou remover um palpite (chances e tentativas)

    // certa
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizedLetter,
      ]);

      //letra errada
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizedLetter,
      ]);
      //eliminando as chances
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);


  };
  //verificando o contador de chances
  useEffect(() => {
    if (guesses <= 0) {

      //apagar e reiniciar 
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  //chegando a condição de vitoria
  useEffect(() => {

    const uniqueLetters = [... new Set(letters)];

    //vitoria
    if (guessedletters.length === uniqueLetters.length) {
      //add score
      setScore((actualScore) => actualScore += 100)

      // restart o game depois da vitoria
      startGame();
    }
  }, [guessedletters, letters, startGame]);


  // reiniciar o jogo
  const retry = () => {

    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {/* mandando a propriedade para StartGame para StartScreen */}

      {gameStage === 'game' && (
        <Game
          verifyLetter={verifyLetter}
          pickerdWord={pickerdWord}
          pickerdCategory={pickerdCategory}
          letters={letters}
          guessedletters={guessedletters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}

      {gameStage === 'end' && (
        <End
          retry={retry}
          score={score}
        />)}
    </div>
  );
}

export default App;
