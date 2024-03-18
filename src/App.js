import './App.css'

import React, { useEffect, useState } from 'react'
import Footer from './components/Footer'
import Question from './components/Question'
import Introduction from './components/Introduction'
import api from './components/QuestionsAPI'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
  const [welcome, setWelcome] = useState(true)
  const [questions, setQuestions] = useState([])
  const [game, setGame] = useState(false)
  const [score, setScore] = useState(0)
  const [checked, setChecked] = useState(false)
  const [allAnswersHeld, setAllAnswersHeld] = useState(false)
  const [categories, setCategories] = useState([])
  // const [gameOptions, setGameOptions] = React.useState(
  //   {
  //     category:"",
  //     difficulty:"",
  //     type:""
  //   }
  // )

  useEffect(() => {
    api('api_category.php').then(res => setCategories(res.trivia_categories))
  }, [])

  // React.useEffect(() => {
  //   api('api.php', {
  //     amount: 10
  //   })
  //   // const apiUrl = 'https://opentdb.com/api.php?amount=5&type=multiple'
  //   // fetch(apiUrl)
  //   //   .then(res => res.json())
  //   //   .then(data => {
  //   //     function getNewQuestions(listOfQuestions) {
  //   //       const resetQuestions = listOfQuestions.map(question => {
  //   //         return {
  //   //           id: nanoid(),
  //   //           question: question.question,
  //   //           correctAnswer: question.correct_answer,
  //   //           answers: settingAnswers(
  //   //             shuffleAnswers([
  //   //               ...question.incorrect_answers,
  //   //               question.correct_answer
  //   //             ]),
  //   //             question.correct_answer
  //   //           )
  //   //         }
  //   //       })
  //   //       return resetQuestions
  //   //     }
  //   //     setQuestions(getNewQuestions(data.results))
  //   //   })
  // }, [game])

  useEffect(() => {
    let answersHeld = []

    questions.map(question => {
      question.answers.map(answer => {
        if (answer.isHeld) {
          answersHeld.push(answer.isHeld)
          answersHeld.length === 5
            ? setAllAnswersHeld(true)
            : setAllAnswersHeld(false)
        }
        return answer
      })
      return questions
    })
  }, [questions])

  function handleStartGame(props) {
    api('api.php', { 
      amount: 5,
      ...props
     }).then(res => {
      function getNewQuestions(listOfQuestions) {
        const resetQuestions = listOfQuestions.map(question => {
          return {
            id: nanoid(),
            question: question.question,
            correctAnswer: question.correct_answer,
            answers: settingAnswers(
              shuffleAnswers([
                ...question.incorrect_answers,
                question.correct_answer
              ]),
              question.correct_answer
            )
          }
        })
        return resetQuestions
      }
      setQuestions(getNewQuestions(res.results))
     })
    setWelcome(prevState => !prevState)
  }

  function newGame() {
    setWelcome(true)
    // setGame(prevState => !prevState)
    setChecked(false)
    setScore(0)
    setAllAnswersHeld(false)
  }

  let buttonStyles = {}
  if (!allAnswersHeld) {
    buttonStyles = {
      backgroundColor: '#d6dbf5',
      color: '#293264'
    }
  }

  function settingAnswers(listOfAnswers, correctAnswer) {
    return listOfAnswers.map(answer => {
      return {
        id: nanoid(),
        isHeld: false,
        answer: answer,
        // correct: answer === heldCorrectcorrectAnswer ? true : false,
        correct: answer === correctAnswer ? true : false,
        heldCorrect: false,
        heldIncorrect: false,
        checked: false
      }
    })
  }

  function shuffleAnswers(answerList) {
    let i = answerList.length
    while (--i > 0) {
      let randIndex = Math.floor(Math.random() * (i + 1))
      ;[answerList[randIndex], answerList[i]] = [
        answerList[i],
        answerList[randIndex]
      ]
    }
    return answerList
  }

  const questionElements = questions.map(question => {
    return (
      <Question
        id={question.id}
        key={question.id}
        question={question.question}
        answers={question.answers}
        runHold={runHold}
      />
    )
  })

  function runHold(answerId, questionId) {
    setQuestions(prevQuestions =>
      prevQuestions.map(question => {
        if (question.id === questionId) {
          const answerList = question.answers.map(answer => {
            if (answer.id === answerId || answer.isHeld) {
              return {
                ...answer,
                isHeld: !answer.isHeld
              }
            } else {
              return answer
            }
          })
          return {
            ...question,
            answers: answerList
          }
        } else {
          return question
        }
      })
    )
  }

  function checkAnswers() {
    setQuestions(prevQuestions => {
      const result = prevQuestions.map(question => {
        const checkedAnswers = question.answers.map(answer => {
          if (answer.isHeld && !answer.correct) {
            return {
              ...answer,
              heldIncorrect: true,
              checked: true
            }
          } else if (answer.isHeld && answer.correct) {
            setScore(prevScore => prevScore + 1)
            return {
              ...answer,
              heldCorrect: true,
              checked: true
            }
          } else {
            return {
              ...answer,
              checked: true
            }
          }
        })
        return {
          ...question,
          answers: checkedAnswers
        }
      })
      return result
    })
    setChecked(true)
  }

  return (
    <main>
      <img className="image-top" src="./images/image-top.png" />

      {welcome ? (
        <Introduction
          handleStartGame={handleStartGame}
          categories={categories}
        />
      ) : (
        <div className="game-container">
          {score === 5 && <Confetti />}
          {questionElements}
          <div className="button-container">
            {checked ? (
              <div>
                <span className="score">
                  You scored <span className="score-number">{score}</span>/5
                  correct answers
                </span>
                <button onClick={newGame} className="button button-main">
                  Play Again
                </button>
              </div>
            ) : (
              <button
                disabled={!allAnswersHeld}
                onClick={checkAnswers}
                className="button button-main"
                style={buttonStyles}
              >
                {allAnswersHeld
                  ? 'Check answers'
                  : 'Please select all 5 answers'}
              </button>
            )}
          </div>
        </div>
      )}

      <img className="image-bottom" src="./images/image-bottom.png" />

      <Footer />
    </main>
  )
}
