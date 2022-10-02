import React from 'react';
import { useState, useRef } from 'react';
import './Game.css';

const Game = ({ verifyLetter,
     pickedpickerdWord,
     pickerdCategory,
     letters,
     guessedletters,
     wrongLetters,
     guesses,
     score }) => {

     const [letter, setLetters] = useState("");
     const letterInputeRef = useRef(null);
     const handleSubmit = (e) => {
          e.preventDefault();

          verifyLetter(letter);

          setLetters("");

          letterInputeRef.current.focus();
     };

     return (


          <div className='game'>
               <p className='points'>
                    <span>Pontuação:{score}</span>
               </p>
               <h1>Advinhe a palavra</h1>
               <h3 className='tip'>
                    Dica sobre a pavavra: <span> {pickerdCategory} </span>
               </h3>
               <p className='dica'> Você ainda tem {guesses} tentativa(s). </p>
               <div className='wordContainer'>
                    {letters.map((letters, i) => (
                         guessedletters.includes(letters) ? (
                              <span key={i} className='letter'>
                                   {letters}
                              </span>
                         ) : (
                              <span key={i} className='blankSquare'></span>
                         )
                    ))}
               </div>
               <div className='letterContainer'>
                    <p>Tente advinhar uma letra da palavra</p>
                    <form onSubmit={handleSubmit}>
                         <input
                              type="text"
                              name="letter"
                              maxLength="1"
                              required
                              onChange={(e) => setLetters(e.target.value)}
                              value={letter}
                              ref={letterInputeRef}
                         />
                         <button className='btJogar'> Jogar </button>
                    </form>
               </div>
               <div className='wrongLettersContainer'>
                    <p className='letraU'>Letras já ultilizadas:</p>
                    {wrongLetters.map((letter, i) => (
                         <span className='letras' key={i}> {letter}, </span>
                    ))}
               </div>
          </div>
     )
}

export default Game

{/*<div className='comp_game'>
<h1> Game </h1>
<button onClick={verifyLetter}> Finalizar Jogo </button>
</div>*/}