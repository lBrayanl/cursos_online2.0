
import React from 'react'
import { useState } from 'react';
import '../css/estiloquiz.css'


const Quiz = () => {
    var Questionbank = [
        {
            Question: "¿Quien creo el Framework React.js?",
            Answers: [
                { Answer: "Facebook", isCorrect: true },
                { Answer: "Google", isCorrect: false },
                { Answer: "Microsoft", isCorrect: false },
                { Answer: "Apple", isCorrect: false }
            ]
        },
        {
            Question: "Que lenguaje de programacion usa Spring boot?",
            Answers: [
                { Answer: "JavaScript", isCorrect: false },
                { Answer: "Java", isCorrect: true },
                { Answer: "Python", isCorrect: false },
                { Answer: "C#", isCorrect: false }
            ]
        }, {
            Question: "¿En que año se fundo JavaScript?",
            Answers: [
                { Answer: "1995", isCorrect: true },
                { Answer: "1998", isCorrect: false },
                { Answer: "2000", isCorrect: false },
                { Answer: "1993", isCorrect: false }
            ]
        },
        {
            Question: "¿Que lenguaje usa Laravel?",
            Answers: [
                { Answer: "Php", isCorrect: true },
                { Answer: "Java", isCorrect: false },
                { Answer: "C#", isCorrect: false },
                { Answer: "Python", isCorrect: false }
            ]
        },
        {
            Question: "¿Cuál sería el resultado de 3+2+''7''?",
            Answers: [
                { Answer: "12", isCorrect: false },
                { Answer: "35", isCorrect: false },
                { Answer: "57", isCorrect: true },
                { Answer: "47", isCorrect: false }
            ]
        }
    ]

    //useState Hook
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

const handleAnswerResponse=(isCorrect)=>
{
    if(isCorrect)
    {
        setScore(score+1);
    }

   const nextQuestion= currentQuestion+1;
   if(nextQuestion<Questionbank.length)
   {
    setCurrentQuestion(nextQuestion);
   }
   else{
    setShowScore(true);
   }
}

const resetQuiz=()=>
{
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
}

    return (
      <div className="containerPrincipal">
        <div className='app'>
            {showScore ? (
                <div className='score-section'>
                    You have scored {score} out of {Questionbank.length}
                    <>
                       <button type="submit" onClick={resetQuiz}>Play Again!!</button>
                    </>
                </div>
            )
                : (
                    <>
                        <div className='question-section'>
                            <div className='question-count'>
                               <span>{currentQuestion+1}</span>/{Questionbank.length}
                            </div>

                            <div className='question-text'>
                             {Questionbank[currentQuestion].Question}
                            </div>
                        </div>

                        <div className='answer-section'>
                          {Questionbank[currentQuestion].Answers.map((answer)=>
                          (
                              <button onClick={()=>handleAnswerResponse(answer.isCorrect)}>{answer.Answer}</button>
                          ))}
                        </div>
                    </>
                )
            }

        </div>
        </div>
    );
}

export default Quiz;