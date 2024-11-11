const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  const initialValue = 0;
  const sumWithInitial = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    initialValue,
  )
  return (
  <>
    {parts.map(p => <Part key={p.id} part={p}></Part>)}
    <h4>total of {sumWithInitial} exercises</h4>
  </>
  )
}
const Course = ({course}) => {
  return (
    <>
    <Header course={course.name}></Header>
    <Content parts={course.parts}></Content>
    </>
  )
}

export default Course