import React, { useState } from 'react'

function convert(value, unit) {
  const v = Number(value)
  if (Number.isNaN(v)) return null
  let c, f, k
  if (unit === 'C') {
    c = v
    f = c * 9/5 + 32
    k = c + 273.15
  } else if (unit === 'F') {
    f = v
    c = (f - 32) * 5/9
    k = c + 273.15
  } else if (unit === 'K') {
    k = v
    c = k - 273.15
    f = c * 9/5 + 32
  }
  return {
    C: Number(c.toFixed(2)),
    F: Number(f.toFixed(2)),
    K: Number(k.toFixed(2)),
  }
}

export default function App() {
  const [input, setInput] = useState('')
  const [unit, setUnit] = useState('C')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleConvert(e) {
    e.preventDefault()
    setError('')
    const val = input.trim()
    if (val === '') {
      setError('Please enter a temperature value.')
      setResult(null)
      return
    }
    const num = Number(val)
    if (Number.isNaN(num)) {
      setError('Enter a valid number.')
      setResult(null)
      return
    }
    const res = convert(num, unit)
    setResult(res)
    setSubmitted(true)
  }

  function handleInputChange(e) {
    setInput(e.target.value)
    setSubmitted(false)
    if (e.target.value.trim() === '') {
      setResult(null)
      return
    }
  }

  function handleUnitChange(e) {
    setUnit(e.target.value)
    setSubmitted(false)
    if (input.trim() === '') {
      setResult(null)
      return
    }
  }

  return (
    <div className="container">
      <h1>Temperature Converter</h1>
      <form onSubmit={handleConvert} className="form">
        <div className="row">
          <label>Temperature</label>
          <input type="text" value={input} onChange={handleInputChange} placeholder="Enter value" />
        </div>
        <div className="row">
          <label>Unit</label>
          <select value={unit} onChange={handleUnitChange}>
            <option value="C">Celsius (°C)</option>
            <option value="F">Fahrenheit (°F)</option>
            <option value="K">Kelvin (K)</option>
          </select>
        </div>
        <div className="row">
          <button type="submit">Convert</button>
        </div>
      </form>
      {error && <div className="error">{error}</div>}
      {submitted && result && (
        <div className="results">
          <h2>Results</h2>
          <ul>
            <li>Celsius: {result.C} °C</li>
            <li>Fahrenheit: {result.F} °F</li>
            <li>Kelvin: {result.K} K</li>
          </ul>
        </div>
      )}
    </div>
  )
}
