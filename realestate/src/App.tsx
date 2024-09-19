
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { HomePage } from './pages/Home'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
