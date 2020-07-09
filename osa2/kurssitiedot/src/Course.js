import React from 'react'

const Header = ({coursename}) => (
    <h2>
      {coursename}
    </h2>
)

const Content = ({parts}) => (
    <>
      {parts.map(part => <p key={part.id}> {part.name} {part.exercises}</p>)}
    </>
)

const Total = ({parts}) => {
  const total = parts.map(part => part.exercises).reduce(function(a,b) {
    return a + b
  }, 0)

  return (
    <b>
      total of {total} exercises
    </b>
  )
}

const Course = ({inputcourse}) => (
    <>
    <Header coursename={inputcourse.name} />
    <Content parts={inputcourse.parts} />
    <Total parts={inputcourse.parts} />
    </>
)

export default Course