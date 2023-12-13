import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginLoading from './pages/LoginLoading';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename='/nexus'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/loggingIn' element={<LoginLoading/>} />
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
