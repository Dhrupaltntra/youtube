import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
// import Layout from "../Component/Layout/ThemeLayout/Layout"
import Home from "../Component/Home/home"
import SingleVideo from "../Component/Single/single"
import Nested from "../Component/Nested/cities"
import Shorts from "../Component/Shorts/shorts"
import Login from "../Component/Login/Login"
// import Login from "../Component/Login/Login"


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"
          element={
            <Home />
          }
        />
      </Routes>
      <Routes>
        <Route path="/video/:title"
          element={
            <SingleVideo />
          }
        />
      </Routes>
      <Routes>
        <Route path="/nested"
          element={
            <Nested />
          }
        />
      </Routes>
      <Routes>
        <Route path="/shorts"
          element={
            <Shorts />
          }
        />
      </Routes>
      <Routes>
        <Route path="/login"
          element={
            <Login />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;