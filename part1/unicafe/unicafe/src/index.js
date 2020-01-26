import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (

    <button onClick={props.handleClick}>{props.text}</button>
    )


const StatisticsLine = ({text, value, prosent}) => {

    
    return <p>{text} {value} {prosent}</p>
    
}


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodValue = (newValue) => {
      setGood(newValue)
      
  }

  const setNeutralValue = (newValue) => {
    setNeutral(newValue)
  
}

const setBadValue = (newValue) => {
    setBad(newValue)
    
}

const alll = good + bad + neutral

  return (
     
    <div>
    <h1>Give Feedback</h1>
      
      <Button handleClick={() => setGoodValue(good + 1)} text="Good" />
      <Button handleClick={() => setNeutralValue(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBadValue(bad + 1)} text="Bad" />

    <h1>statistics</h1>

        {alll !== 0 ? 
         ( 
             <table><tbody>
        <tr>
        <td><StatisticsLine text="good" /></td>
        <td><StatisticsLine value={good} /></td>
        </tr>
        <tr>
        <td><StatisticsLine text="neutral" /></td>
        <td><StatisticsLine value={neutral} /></td>
        </tr>
        <tr>
        <td><StatisticsLine text="bad" /></td>
        <td><StatisticsLine value={bad} /></td>
        </tr>
        <tr>
        <td><StatisticsLine text="all" /></td>
        <td><StatisticsLine value={good + neutral + bad} /></td>
        </tr>
        <tr>
        <td><StatisticsLine text="average" /></td>
        <td><StatisticsLine value={(good - bad) / (good + neutral + bad)} /></td>
        </tr>
        <tr>
        <td><StatisticsLine text="positive" /></td>
        <td><StatisticsLine value={(good) / (good + neutral + bad) * 100 } prosent="%" /></td>
        </tr>

       </tbody></table>   )   :    ( <p>No feedback</p> )
        }
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
