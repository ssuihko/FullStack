import React from 'react'

  const Course = ( {course} ) => {
    
    return (
      <div key={course.name}>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/> 
      </div>
    )
  }

  const Content = (props) => {

    const { parts } = props
        
    return (
        <div>
          {parts.map(parts =>
          <Part key={parts.id} name={parts.name} amount={parts.exercises}></Part>)}
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


const Part = (props) => {
    return (
        <div>
            <p>{props.name} {props.amount}</p>
        </div>
    )
}

const Total = (props) => {
 
  const { parts } = props

  const luku = parts.reduce((result, { exercises } ) =>
      result + exercises, 0)

  

    return (
        <div key={luku}>
            <p>Total of {luku} exercises</p>
        </div>
    )
}



  export default Course