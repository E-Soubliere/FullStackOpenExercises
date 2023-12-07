import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  

  return (
    <div>
      <h2>Give Feedback</h2>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
	return (
		<tr>
			<td style={{paddingRight: "50px"}}>{text}</td>
			<td>{value}</td>
		</tr>
	)
}

const Statistics = ({good, neutral, bad}) => {
	const total = good + neutral + bad;
	const avg = (good - bad) / total;
	const pos = good / total;
	return (
		<div>
			<h2>Statistics</h2>
			{ total > 0 ? 
				<table>
					<StatisticLine text={"Good"} value ={good} />
					<StatisticLine text={"Neutral"} value ={neutral} />
					<StatisticLine text={"Bad"} value ={bad} />
					<StatisticLine text={"All"} value ={total} />
					<StatisticLine text={"Average"} value ={avg + "%"} />
					<StatisticLine text={"Positive"} value ={pos + "%"} />
				</table>
				: <p>No feedback given</p>
			}
			
		</div>
	)
}

export default App