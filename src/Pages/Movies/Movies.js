import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import CustomPagination from '../../components/pagination/CustomPagination'
import Singlecontent from '../../components/SingleContent/Singlecontent'
import Genres from '../../components/Genres/Genres'
import useGenres from '../../hooks/useGenre'

const Movies = () => {

  const [page,setPage] = useState(1)
  const [content,setContent] = useState([])
  const [numberOfPages,setnumberOfPages] = useState()
  const [selectedGenres,setSelectedGenres] = useState([])
  const [genres,setGenres] = useState([])
  const genreforURL = useGenres(selectedGenres)
  
  const fetchMovies = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=d917f472ced01b7c3e7949bb0ed1a659&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
    // console.log(data)
    

    setContent(data.results)
    setnumberOfPages(500)
    // console.log(data.total_pages)
  } 
  
  useEffect(() => {
    fetchMovies()
    // eslint-disable-next-line
  },[page,genreforURL])

  return (
    <div>
    <span className="pageTitle">Movies</span>
    <Genres type='movie' selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} setGenres={setGenres} genres={genres} setPage={setPage} />
    <div className="trending">
{content && content.map((c) =>
<Singlecontent
 key={c.id}
 id={c.id}
 poster={c.poster_path}
 title={c.title || c.name}
 date={c.first_air_date || c.release_date}
 media_type = 'movie'
 vote_average = {c.vote_average}
  />
)}
    </div>
    {numberOfPages > 1 && (
    <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />

    ) }
    </div>
  )
}

export default Movies