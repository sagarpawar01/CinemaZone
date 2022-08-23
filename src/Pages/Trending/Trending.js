import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import CustomPagination from '../../components/pagination/CustomPagination'
import Singlecontent from  '../../components/SingleContent/Singlecontent'
import './trending.css'

const Trending = () => {

    const [page,setPage] = useState(1) 
    const [content,setContent] = useState([])

    const fetchTrending = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=d917f472ced01b7c3e7949bb0ed1a659&page=${page}`)
        
        // console.log(data)

        setContent(data.results)

    }

    useEffect(() => {
      fetchTrending()
      // eslint-disable-next-line
    },[page])

  return (
    <div>
    <span className="pageTitle">Trending</span>
    <div className="trending">
{content && content.map((c) =>
<Singlecontent
 key={c.id}
 id={c.id}
 poster={c.poster_path}
 title={c.title || c.name}
 date={c.first_air_date || c.release_date}
 media_type = {c.media_type}
 vote_average = {c.vote_average}
  />
)}
    </div>
    <CustomPagination setPage={setPage} />
    </div>
  )
}

export default Trending