import React from 'react'
import ReactDOM from 'react-dom'


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
        <Header course={course} />
        <Content name1={part1} amount1={exercises1} name2={part2} amount2={exercises2} name3={part3} amount3={exercises3}/>
        <Total amount1={exercises1} amount2={exercises2} amount3={exercises3}/>
      </div>
    )
  }

  const Header = (props) => {
    return (
     <div>
            <h1>{props.course}</h1>
      </div>
    )

}

const Content = (props) => {
    return (
        <div>
            <Part name={props.name1} amount={props.amount1}></Part>
            <Part name={props.name2} amount={props.amount2}></Part>
            <Part name={props.name3} amount={props.amount3}></Part>
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>Number of exercises: {props.amount1 + props.amount2 + props.amount3}</p>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.name} {props.amount}</p>
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'))
