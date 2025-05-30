import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { PrivateRoute } from './components/PrivateRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        { /* Home */ }
        <Route path="/" element={
          <PrivateRoute>
            <Home/>
          </PrivateRoute>
          
        } />

        { /* Login */ }
        <Route path="/login" element={<Login/>} />

      </Routes>
    </BrowserRouter>
  )
}

