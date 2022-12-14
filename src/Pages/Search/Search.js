import { Button, createTheme, Tab, Tabs, TextField, ThemeProvider } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import axios from 'axios'
import Singlecontent from '../../components/SingleContent/Singlecontent'
import CustomPagination from '../../components/pagination/CustomPagination'

const Search = () => {

  const [type,setType] = useState(0)
  const [page,setPage] = useState(1)
  const [searchText,setSearchText] = useState("")
  const [content, setContent] = useState()
  const [numberOfPages, setnumberOfPages] = useState(0)


  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary : {
        main : "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/search/${type?"tv":"movie"}?api_key=d917f472ced01b7c3e7949bb0ed1a659&language=en-US&query=${searchText}&page=${page}&include_adult=false`)
    setContent(data.results)
    setnumberOfPages(500)
  }

  useEffect(() => {
    window.scroll(0,0)
  
    fetchSearch()
  }, [type,page])
  

  return (
    <div>
    <ThemeProvider theme={darkTheme}>
      <div style={{display : "flex",margin : "15px 0"}}>
    <TextField style={{flex : 1}} className='searchBox' label='Search' variant='filled'
     onChange={(e) => setSearchText(e.target.value)}
      />
      <Button variant='contained' style={{marginLeft : 10}} onClick={fetchSearch}>
      <SearchIcon />
      </Button>
      </div>
      <Tabs value={type} indicatorColor='primary' textColor='primary' onChange={(event,newValue) => {
        setType(newValue) 
        setPage(1)
      }}
      style={{paddingBottom : 5}}
      >
        <Tab style={{width : "50%"}} label='Search Movies' />
        <Tab style={{width : "50%"}} label='Search Tv Series' />
      </Tabs>

    </ThemeProvider>
    <div className="trending">
{content && content.map((c) =>
<Singlecontent
 key={c.id}
 id={c.id}
 poster={c.poster_path}
 title={c.title || c.name}
 date={c.first_air_date || c.release_date}
 media_type = {type ? 'tv' : 'movie'}
 vote_average = {c.vote_average}
  />
)}
{searchText && 
!content && (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2> )
}
    </div>
    {numberOfPages > 1 && (
    <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />

    ) }
    </div>
  )
}

export default Search