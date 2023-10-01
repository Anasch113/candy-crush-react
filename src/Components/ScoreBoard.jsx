import React from 'react'
import "./scoreboard.css"
const ScoreBoard = ({score, moves}) => {
  return (
    <div className='score-board'>
      <h2> Score: {score}</h2>
      <h2>Moves: {moves}</h2>
    </div>
  )
}

export default ScoreBoard

