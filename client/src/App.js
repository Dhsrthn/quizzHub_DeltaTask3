import Welcome from './Welcome';
import Homepage from './homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './profile';
import CreateQuizForm from './questionform';
import QuizDisplay from './quiz';
import History from './history';
import NotFound from './notfound';
import SearchResult from './search';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Welcome/>}></Route>
          <Route exact path='/home' element={<Homepage/>}></Route>
          <Route exact path='/profile/:username' element={<Profile/>}></Route>
          <Route exact path='/create' element={<CreateQuizForm/>}></Route>
          <Route exact path='/quiz/:quizid' element={<QuizDisplay/>}></Route>
          <Route exact path='/profile/:username/history' element={<History/>}></Route>
          <Route exact path='/search/user/:username' element={<SearchResult/>}></Route>
          <Route exact path='*' element={<NotFound/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
