
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { HomePage } from './pages/Home'
import { RecoilRoot } from 'recoil'
import { Profile } from './pages/Profile'
import { Navbar } from './components/Navbar'
import { About } from './pages/About'
import { PrivateRoute } from './components/PrivateRoute'

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot> 
  )
}
export default App
