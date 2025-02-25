import './App.css'
import React from 'react'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import HomePage from './component/home/homepage'
import PredictPage from './component/predict/predictpage'
import HelpPage from './component/help/helppage'
import SearchPage from './component/search/searchpage'

function App () {
  return (
    <div className="App">
      <BrowserRouter >
        <div className="mainStack">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/searchpage">Search</Link>
            <Link to="/predictpage">Predict</Link>
            <Link to="/help">Help</Link>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/searchpage" element={<SearchPage />}></Route>
            <Route path="/predictpage" element={<PredictPage />}></Route>
            <Route path="/help" element={<HelpPage />}></Route>
          </Routes>
        </div>
      </BrowserRouter >
    </div>
  )
}

export default App

