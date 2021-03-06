//import app.css and common react libraries.
//app.css contains css headers refernced by this application in its current form.
import React, { useState } from 'react';
import './quizload.css';
import { Button } from '../Button/Button';

//import questions.json file and load it in the variable questions,
//please note this will be done by question.js which will load and parse the json from an api 
//code may be available in question.js.
import questjson from './questions.json';

import { ShowmyScore } from './ShowScore'; //imports show score, used to display score working on it.

var questions = questjson

//this is the normal function exported.
function QuizLoad() {

  //this var is used to store data of the correct option if the option selected by the user is wrong.
  var correctOption = [];

  //all vars that get and send data, bad variable naming, will change in the future. 
  //please note that consts in usesate (a react library) are being used as variables below
  const [currentQuestion, setCurrentQuestion] = useState(0); //stores the current question number.
  const [showScore, setShowScore] = useState(false); //it is a state that just allows us to go to the score screen or not, will change late, as that will be a different screen All together. 
  const [score, setScore] = useState(0); // this just holds your score
  const [rerender, ReRenderwithcolor] = useState(false); //this is used to go the second screen where correct options are shown.
  const [selectopt, Selectopt] = useState(0); //this variable holds your selected option
  const [wascorrect, Wascorrect] = useState(false); //this variable holds if your chosen option is correct or not.

  //this function is called after the colour rendering is complete and is ready to be removed.
  const afterrerender = () => {
    ReRenderwithcolor(false);//rerender is stopped, this looping mec is shit, someone write a better one, till then too bad. Xd i'm yawning.
    Wascorrect(false);//wascorrect variable is reset.
    Selectopt(0); //option selected is reset.
    
    //sets a local const nextques that is current question+1 and sees if we have not reached end of the list, 
    //if not it just adds one to current question and the loop starts again.
    //i don't know why i didn't use var but shit, it wokrs.
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  }
  // function to get the correct option of the current question.
  const getcorrect = () => {
    //pushes the correct option into the correct option array.
    correctOption.push(questions[currentQuestion].answerOptions.find(({ isCorrect }) => isCorrect === true))
  }
  //function to handle answer click, it takes two variable's 
  //first check's if the selected option iscorrect or not. 
  //optionselect gets the selected option. 
  const handleAnswerOptionClick = (isCorrect, optionSelect) => {
    //first sees if my stupid dumb brain did not send a string 
    //or something in this function, if i did do that, 
    //i will add a bug code that people or the code can automatically report to api to be fixed.
    if (typeof optionSelect === 'number') {
      Selectopt(optionSelect)
    }
    else {
      alert('error code 1 please report by starting an issue.')
    }
    //checks if the smart students brain selected the correct option, 
    //if yes give student a score. but will have more functionality in the future.
    if (isCorrect) {
      setScore(score + 1);
      Wascorrect(true)
    }
    //after all dumb things have happened, it triggers the rerender with color so that correct option is displayed. which is so dumb, but works.
    ReRenderwithcolor(true);
  };
  //whole ui is based on one if statement. oh my god, but it works, so eh??? its just for a quiz and no sensitive data is taken, so?? i am ok with that.
  if (rerender === true) {
    //just starts a timeout so that the rerender with colour goes away automatically after n seconds.
    setTimeout(() => {
      afterrerender()
    }, 5000);
    //returns the colour rendered buttons. run for more info.
    return (
      <div className='app'>
        <div className='question-section'>
          <div className='question-count'>
            <span>Question {currentQuestion + 1}</span>/{questions.length}
          </div>
          <div className='question-text'>{questions[currentQuestion].questionText}</div>
        </div>
        {//checks if the quiz option selected is correct, 
          //if yes then only user selected option is displayed in green, 
          //if it is wrong, then users option is displayed in red 
          //and another option is displayed in green.
        }
        <div className='is-correct'>
          {wascorrect ? (
            <div className='answer-section'>
              {/*using button libary created by me, see button.js*/}
                <Button disable={true} bgcolor='#2f922f' buttonStyle='btn--square'>{questions[currentQuestion].answerOptions[selectopt].answerText}</Button>
            </div>
          ) : (
              <>
                {/*if user option is not correct then get the correct option, 
                  and see the function to see what it does, 
                  but basically it updates the correctoption array with the correct option.*/}
                {getcorrect()}
                <div className='answer-section'>
                  {/* two buttons are displayed, with red and green, 
                    //the user selected option is displayed in red 
                    //and correct option is displayed in green.
                    using button page created by me..*/}
                  <Button disable={true} buttonStyle='btn--square' bgcolor='#ff3333' > {questions[currentQuestion].answerOptions[selectopt].answerText}</Button>
                  <Button disable={true} buttonStyle='btn--square' bgcolor='#2f922f' > {correctOption[0].answerText}</Button>
                </div>
              </>
            )}
        </div>
      </div>
    );
  }
  //oh my god i'm getting away with this shit amn't i?? huhuhuh
  else {
    return (
      <div className='app'>
        {/*wow this shitty score screen is bad, will be updating it, it does work but i changed it. latest version-0.0.0.2-alpha*/}
        {showScore ? (
          <ShowmyScore score={score} totalScore={questions.length} />
        ) : (
            <>
              {/*just shows you the current question with all the options and you can just select one, pretty standard.... 
                //not commenting more.  As i'm sure everyone reading, yes you understand basic stuff underneath.*/}
              <div className='question-section'>
                <div className='question-count'>
                  <span>Question {currentQuestion + 1}</span>/{questions.length}
                </div>
                <div className='question-text'>{questions[currentQuestion].questionText}</div>
              </div>
              <div className='answer-section'>
                {/*using button libary created by me, see button.js*/}
                {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                  <Button buttonStyle='btn--square' buttonSize='btn--medium' onClick={() => handleAnswerOptionClick(answerOption.isCorrect, index)}>{answerOption.answerText}</Button>
                ))}
              </div>
            </>
          )}
      </div>
    );
  }
}

export default QuizLoad
