import React from 'react';
import './StartScreen.css';


const StartScreen = ({ startGame }) => {
     return (
          <div className='comp_start'>
               <h1> ENCONTRE A PALAVRA </h1>
               <p> Clique no botão para começar </p>
               <button onClick={startGame}> Começar o jogo </button>
          </div>
     )
}

export default StartScreen