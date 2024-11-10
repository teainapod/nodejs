import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Banner = ({text}) => {
  return (
    <b>{text}</b>
  )
} 

const Button = ({onClickHandler, text}) => {
  return (
    <button onClick={onClickHandler}> {text} </button>
  )
} 

const DisplayStats = ({goodStats, neutralStats, badStats}) => {
  const allStats = goodStats + neutralStats + badStats
  if (allStats === 0){
    return(
      <tr><td colSpan={2}>{"No feedback given"}</td></tr> 
    )
  }
  return (
    <>
    <StatisticLine text="good" value={goodStats} />
    <StatisticLine text="neutral" value={neutralStats} />
    <StatisticLine text="bad" value={badStats} />
    <StatisticLine text="all" value={allStats} />
    <StatisticLine text="average" value={allStats/3} />
    <StatisticLine text="positive % " value={(goodStats/allStats)*100} />
    </>
  )
}

const StatisticLine = ({text , value}) => {
  return (
        <tr><td>{text}</td><td>{value}</td></tr>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const updateGood = () => {
    console.log('good button clicked')
    const goodStats = good + 1
    setGood(goodStats)
  }

  const updateNeutral = () => {
    console.log('neutral button clicked')
    const stats = neutral + 1
    setNeutral(stats)
  }

  const updateBad = () => {
    console.log('bad button clicked')
    const stats = bad + 1
    setBad(stats)
  }

  return (
    <div>
      <Banner text="give feedback"/>
      <div>
      <br></br>
      <Button onClickHandler={updateGood} text="good"/>
      <Button onClickHandler={updateNeutral} text="neutral"/>
      <Button onClickHandler={updateBad} text="bad"/>
      </div>
      <br></br>
      <Banner text="statistics"/>
      <table>
        <thead></thead>
        <tbody>
          <DisplayStats goodStats={good} badStats={bad} neutralStats={neutral}/>
      </tbody>
      </table>
    </div>
  )
}

export default App
