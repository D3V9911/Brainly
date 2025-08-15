
import './App.css'
import { Dashboard } from './pages/dashboard'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SharePage from './pages/SharePage'

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/dashboard' element={<Dashboard />} />
  <Route path='/share/:shareLink' element={<SharePage />} />
    </Routes>
  </BrowserRouter>
}

export default App
