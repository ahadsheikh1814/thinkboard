import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import NoteCard from '../components/NoteCard'

const Home = () => {

  const [isRateLimitade, setIsRateLimitade] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchNotes = async ()=>{
      try {
        const res = await axios.get('http://localhost:5001/api/notes')
        console.log(res.data)
        setNotes(res.data)
      } catch (error) {
        console.log("error fetching notes",error)

        if(error.response.status === 429){
          setIsRateLimitade(true)
        }else{
          toast.error("Failed to fetch notes")
        }
      }finally{
        setLoading(false)
      }
    }
    fetchNotes()
  },[])
  return (
    <div>
      <Navbar />
      {isRateLimitade && <RateLimitedUI />}

      {loading && <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>}

      {notes.length > 0 && !isRateLimitade&& (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 mx-auto max-w-7xl">
          {notes.map((note)=>(
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home