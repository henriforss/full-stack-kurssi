import { useState } from "react"



const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}


const StatisticLine = (props) => {
  return (
    <tr><td>{props.text}</td><td>{props.value}</td></tr>
  )
}


const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const totalReviews = good + neutral + bad

  const averageReview = () => {
    const averageValue = (good - bad) / totalReviews
    return (
      averageValue
    )
  }
  
  const positiveReview = () => {
    const positiveValue = good / totalReviews * 100
    return (
      positiveValue
    )
  }
  
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>No feedback given</div>
    )
  } else {
    return (
      <table>
        <tbody>
            <StatisticLine text="Good" value={props.good} />  
            <StatisticLine text="Neutral" value={props.neutral} />
            <StatisticLine text="Bad" value={props.bad} />
            <StatisticLine text="All" value={props.good + props.neutral + props.bad} />
            <StatisticLine text="Average" value={averageReview()} />
            <StatisticLine text="Positive" value={positiveReview() + " %"} />

        </tbody>
      </table>
    )
  }
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const newValue = good + 1
    setGood(newValue)
  }

  const handleNeutral = () => {
    const newValue = neutral + 1
    setNeutral(newValue)
  }

  const handleBad = () => {
    const newValue = bad + 1
    setBad(newValue)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGood} text="Good" />
      <Button handleClick={handleNeutral} text="Neutral" />
      <Button handleClick={handleBad} text="Bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}



export default App
