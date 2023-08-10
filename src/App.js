import React from 'react'
import Dashboard from './Pages/Dashboard'
import WeatherInfo from './Pages/WeatherInfo'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/weatherinfo" element={<WeatherInfo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App