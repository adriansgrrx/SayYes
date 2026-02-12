import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Message from './pages/Message'

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/message" element={<Message />} />
      </Routes>
    </Router>
  )
}

export default App
