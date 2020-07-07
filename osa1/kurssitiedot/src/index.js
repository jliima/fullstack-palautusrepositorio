import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>
      {props.coursename}
    </h1>
  )
}

const Content = (props) => {
  return (
    <>
    <Part partname={props.part1} exerciseamount={props.exerciseamount1}/>
    <Part partname={props.part2} exerciseamount={props.exerciseamount2}/>
    <Part partname={props.part3} exerciseamount={props.exerciseamount3}/>
    </>
    )
}

const Part = (props) => {
  return (
    <p>
      {props.partname} {props.exerciseamount}
    </p>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.exerciseamount1 + props.exerciseamount2 +props.exerciseamount3}
    </p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header coursename={course}/>
      <Content part1={part1} exerciseamount1={exercises1} part2={part2} exerciseamount2={exercises2} part3={part3} exerciseamount3={exercises3}/>
      <Total exerciseamount1={exercises1} exerciseamount2={exercises2} exerciseamount3={exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))