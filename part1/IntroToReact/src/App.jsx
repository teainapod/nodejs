import { useState } from 'react'
function Header(props){
  return (
      <h1>{props.course.name}</h1>      
  )
}

function Part(props){
  return (
    <p>
        {props.part} {props.exercises}
    </p>
  )
}

function Content(p){
  console.log(p)
  const props = p.parts
  return (
    <>
    <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
    <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
    <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
    
    </>
  )

}
function Total(p){
  const props = p.parts
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}


function App() {
  const [ counter, setCounter ] = useState(0)
 
  const increaseByOne = () => {
    console.log('isClicked')
    setCounter(counter + 1)
  } 

  const setToZero = () => setCounter(0)

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Header course={course}/>
      <Content parts={course}/>
      <Total parts={course} />
     
      <div>{counter}</div>
      <button onClick={() => setCounter(counter + 1)}>Increase Counter</button>
      <button onClick={setToZero}>Reset</button>
    </div>
  )
}

export default App
