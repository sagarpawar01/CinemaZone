import React, { useEffect } from 'react'
import axios from 'axios'
import { Chip } from "@material-ui/core";

const Genres = ({
    type,selectedGenres,setSelectedGenres,setGenres,genres,setPage}) => {
// console.log(selectedGenres)
     const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
     }
     const handleRemove = (genre) => {
        setSelectedGenres(selectedGenres.filter((selected) => selected.id !== genre.id));
    setGenres([...genres,genre]);
    setPage(1);
     }     
     const fetchGenres= async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=d917f472ced01b7c3e7949bb0ed1a659&language=en-US`)
        setGenres(data.genres)
     }   


     useEffect(() => {
        fetchGenres()
        
        return () => {
            setGenres([])
        }

        // eslint-disable-next-line

      },[])
     
  return (
    <div style={{padding : "6px 0"}}>
        {selectedGenres && selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          color='primary'
          onDelete={() => handleRemove(genre)}
        />
      ))}
        {genres && genres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  )
}

export default Genres