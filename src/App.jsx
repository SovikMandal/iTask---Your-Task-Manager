import { useState } from 'react'
import Header from './Components/Header'
import Main from './Components/Main'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <>
    <ToastContainer position="top-center" autoClose={3000} />
     <Header/>
     <Main/>
    </>
  )
}

export default App
