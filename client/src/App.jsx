import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import ApplyJob from "./pages/ApplyJob"
import Application from "./pages/Application"

function App() {

  return (
    <>
      <div>
        <Routes>

          <Route path="/" element={<Home/>} />
          <Route path="/apply-job/:id" element={<ApplyJob/>} />
          <Route path="/applications" element={<Application/>} />

        </Routes>
      </div>
    </>
  )
}

export default App
