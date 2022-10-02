import React from 'react';
import './End.css';

const End = ({ retry, score }) => {
     return (
          <div className='comp_end'>
               <h1> fim de jogo </h1>
               <h2> A sua pontuação foi: <span> {score} </span> </h2>
               <button onClick={retry}> Finalizar Jogo </button>

          </div>
     )
}

export default End