import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total total={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  )

}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = ({parts}) => {
  return (
    parts.map((part, index) => {
      return (<p key={index}> {part.name} {part.exercises} </p>)
    })
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.total}</p>
  )
}

export default App
