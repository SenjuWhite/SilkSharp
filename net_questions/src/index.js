import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './layout/Header'
import Footer from './layout/Footer'
import QuestionList from './components/QuestionList'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import QuestionInfo from './components/QuestionInfo';
import Quiz from './components/Quiz';
import QuizGPT from './components/QuizGPT';
import Interviews from './components/Interviews';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <div className='main-container'>
    <BrowserRouter>
   
    <Header/>
    <Routes>
      <Route path='/'element={<QuestionList></QuestionList>}></Route>
      <Route path='/questionInfo/:id'element={<QuestionInfo></QuestionInfo>}></Route>
      <Route path='/quiz' element={<Quiz></Quiz>}></Route>
      <Route path='/test' element={<QuizGPT></QuizGPT>}></Route>
      <Route path='/interviews' element={<Interviews></Interviews>}></Route>
    </Routes>
    <Footer></Footer>
    </BrowserRouter>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

