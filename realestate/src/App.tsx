
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { HomePage } from './pages/Home'
import { RecoilRoot } from 'recoil'
import { Profile } from './pages/Profile'

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
