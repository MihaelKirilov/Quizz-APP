import './style.css'

import React, { useState } from 'react'

export default function Introduction(props) {
  const [category, setCategory] = useState(null)
  const [difficulty, setDifficulty] = useState(null)
  const [type, setType] = useState(null)

  return (
    <div className="introduction">
      <div className="game-container">
        <h1 className="game-intro-title">Quizzical</h1>
        <p className="game-intro-text">
          Answer the questions and test your knowledge!
        </p>

        <div className="game-options-container">
          <div className="select-container">
            <label className="option-label" htmlFor="category">
              Category:{' '}
            </label>

            <select
            value={category}
              onChange={e => setCategory(e.target.value)}
              name="category"
              id="category"
              className="option-select"
            >
              <option value=''>Any Category</option>
              {props.categories.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="select-container">
            <label className="option-label" htmlFor="difficulty">
              Difficulty:{' '}
            </label>

            <select
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
              name="difficulty"
              id="difficulty"
              className="option-select"
            >
              <option value="">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="select-container">
            <label className="option-label" htmlFor="type">
              Type of questions:
            </label>

            <select
              value={type}
              onChange={e => setType(e.target.value)}
              name="type" id="type" className="option-select"
            >
              <option value="">Any Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
          </div>
        </div>

        <button
          className="button-start-quiz"
          onClick={() => props.handleStartGame({category: category || undefined,difficulty: difficulty || undefined,type: type || undefined})}
        >
          Start Quiz
        </button>
      </div>
    </div>
  )
}
