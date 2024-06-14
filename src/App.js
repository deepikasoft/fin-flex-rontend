
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login.js'
import UserInfo from './Login/UserInfo.js';
import Social from './Login/Social.js';
import Residential from './Login/Residential.js';

function App() {
  return (
    <div className="App appliactaion-main">
      <BrowserRouter className="">
        <Routes>
          <Route path='' element={<Login/>}/>
          <Route path='userInfo' element={<UserInfo/>}/>
          <Route path='social' element={<Social/>}/>
          <Route path='residential' element={<Residential/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
