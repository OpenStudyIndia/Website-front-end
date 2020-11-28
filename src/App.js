import React from 'react';
import './App.css'
import QuizLoad from './ClassQuiz/QuizLoad'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
export default function App() {
  return(
    <>
    <Router>
      <QuizLoad/>
      <Switch>
        <Route/>
      </Switch>
    </Router>
    </>
  )
}