import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const getRandomInt = (max, lastnumber) => {

  let number = lastnumber
  while (number === lastnumber) {
    number = Math.floor(Math.random() * max)
  }
  return number
}
  

const getArrayOfZeros = (arrayLength) => (
  Array.apply(null, new Array(arrayLength)).map(Number.prototype.valueOf, 0)
)


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(getArrayOfZeros(anecdotes.length))

  const handlePoints = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    setSelected(getRandomInt(anecdotes.length, selected))
  }
  
  const maxVotes = Math.max(...points)

  const mostVoted = () => {
    

    for (var i=0; i<points.length; i++) {
      if (points[i] === maxVotes) {
        return anecdotes[i]
      }
    }
  }

  return (
    <div>
      <h1>
        Anecdote of the day
      </h1>

      <div>
        {props.anecdotes[selected]}
      </div>
      
      <div>
        has {points[selected]} votes
      </div>

      <div>
        <button onClick={() => handlePoints()}> vote </button>
        <button onClick={() => setSelected(getRandomInt(anecdotes.length, selected))}> next anecdote </button>
      </div>

      <h1>
        Anecdote with most votes
      </h1>
      <div>
        {mostVoted()}
      </div>
      <div>
        has {maxVotes} votes
      </div>

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
