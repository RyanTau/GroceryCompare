import React from 'react';
import './App.css';
import Home from './pages/calcInput';
import Results from './pages/calcResults';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />}></Route>
          <Route path="/results" element={<Results />}></Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
