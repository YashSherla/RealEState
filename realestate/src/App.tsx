
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { HomePage } from './pages/Home'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { Profile } from './pages/UserProfile'
import { Navbar } from './components/Navbar'
import { About } from './pages/About'
import { userAtom } from './store/userAtom'
import { useEffect, useState } from 'react'
import { CreateListing } from './pages/CreateListing'
import { Listing } from './pages/Listing'
import { UpdatingListing } from './pages/UpdatingListing'
import { Search } from './pages/Search'

const AppwithState = () =>{
 const setStoreProfile  = useSetRecoilState(userAtom);
 const userProfile = useRecoilValue(userAtom);
 const [loading, setLoading] = useState(true);
 useEffect(()=>{
  const token = localStorage.getItem("access_token");
  if (token) {
    const user = JSON.parse(localStorage.getItem("user_data")|| '{}');
    setStoreProfile(user);
  }
  setLoading(false);
 },[setStoreProfile])

 return <div>
        <Navbar />
        <Routes>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={loading ? null : (userProfile ? <Profile /> : <Navigate to="/sign-in" />)} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/listing/:id" element={<Listing />} />
          <Route path="/update-listing/:id" element={<UpdatingListing />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
}

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AppwithState />
      </BrowserRouter>
    </RecoilRoot> 
  )
}
export default App
