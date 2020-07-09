import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const StatisticLine = ({text, value}) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
)

const Statistics = ({good, neutral, bad}) => {
    if (good === 0 && neutral === 0 && bad === 0) {
        return (
            <div>
                No feedback given
            </div>
        )
    }

    const all = good + neutral + bad
    const average = (good-bad)/all
    const positive = ((good)/all)*100 + ' %'

    return (
        <table>
            <tbody>
                <StatisticLine text='good' value={good} />
                <StatisticLine text='neutral' value={neutral} />
                <StatisticLine text='bad' value={bad} />
                <StatisticLine text='all' value={all} />
                <StatisticLine text='average' value={average} />
                <StatisticLine text='positive' value={positive} />
            </tbody>
        </table>
    )
}



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
        <h1>give feedback</h1>
        <Button handleClick={() => setGood(good + 1)} text='good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button handleClick={() => setBad(bad + 1)} text='bad' />
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
        

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)