import React from 'react'
import ReactDOM from 'react-dom'

const header = (course) => {
  return (
    <h1>
      {course}
    </h1>
  )
}

const content = (part1, part2, part3) => {
  return (
    <>
    {part(part1)}
    {part(part2)}
    {part(part3)}
    </>
    )
}

const part = (part) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const total = (part1, part2, part3) => {
  return (
    <p>
      Number of exercises {part1.exercises + part2.exercises +part3.exercises}
    </p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    
    <div>
      {header(course)}
      {content(part1, part2, part3)}
      {total(part1, part2, part3)}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))