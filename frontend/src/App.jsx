import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Create from './pages/Create'
import NoteDetails from './pages/NoteDetails'

const App = () => {
  return (
    <div className='h-full w-full'>
      <div class="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/note/:id" element={<NoteDetails />} />
      </Routes>
    </div>
  )
}

export default App
