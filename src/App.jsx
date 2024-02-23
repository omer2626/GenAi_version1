import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Globe from './components/Globe'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductPage from './components/ProductPage'
import HomePage from './components/HomePage'
import TTI from './components/TTI'
import Team from './components/Team'
import TTS from './components/TTS'
import TTM from './components/TTM'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<HomePage />}></Route>
            <Route path='/products' element={<ProductPage />}></Route>
            <Route path='/team' element={<Team />}></Route>
          </Route>
          <Route path='/TTI' element={<TTI />}></Route>
          <Route path='/TTS' element={<TTS />}></Route>
          <Route path='/TTM' element={<TTM />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
