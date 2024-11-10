import { useState } from 'react'

const Button = ({clickEventHandler, text}) => <button onClick={clickEventHandler}>{text}</button>
const HighestVoted = ({p, anecdotesArr}) => {
  const highRank = p.findIndex((e) => e == Math.max(...p))
  const anec = anecdotesArr[highRank]
  console.log(anec)
  return (
    <>
      {anecdotesArr[highRank]}
    </>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  
  function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    const randomNum = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    console.log(randomNum);
    return randomNum // The maximum is inclusive and the minimum is inclusive
  }
  
  const numAnecdotes = anecdotes.length
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(numAnecdotes).fill(0))

  const updatePoints = () => {
    const copy = [...points]
    const selIndex = selected
    copy[selIndex] += 1
    setPoints(copy)
  }

  //console.log(points)
  return (    
    <div>
      <div><b>Anecdote of the day</b></div>
      {anecdotes[selected]}
      <div>has {points[selected]} votes</div>
      <div>
      <Button text="vote" clickEventHandler={() => updatePoints()}></Button>
      <Button text="next anecdote" clickEventHandler={() => {setSelected(getRandomIntInclusive(0 , numAnecdotes - 1))}}></Button>

      <div><b>Anecdote with most votes</b></div>
      <HighestVoted p={points} anecdotesArr={anecdotes}></HighestVoted>
      </div>
    </div>
  )
}

export default App
