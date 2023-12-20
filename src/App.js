import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginLoading from './pages/LoginLoading';
import Dashboard from './pages/Dashboard';
import Posts from './pages/Posts';
import Search from './pages/Search';
import Connections from './pages/Connections';
import Introspective from './pages/Introspective';
import Comments from './pages/Comments';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename='/nexus'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/loggingIn' element={<LoginLoading/>} />
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/posts' element={<Posts />}/>
          <Route path='/search' element={<Search />}/>
          <Route path='/connections' element={<Connections />}/>
          <Route path='/introspective' element={<Introspective />}/>
          <Route path='/comments' element={<Comments />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
