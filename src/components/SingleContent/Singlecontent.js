import { Badge } from '@material-ui/core'
import React from 'react'
import { img_300 } from '../../config/config'
import { unavailable } from '../../config/config'
import './Singlecontent.css'
import ContentModal from '../contentModal/ContentModal'

const Singlecontent = ({
    id,poster,title,date,media_type,vote_average
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge badgeContent={vote_average.toFixed(1)} color={vote_average > 6 ? "primary" : "secondary"} />
        <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
        <b className="title">{title}</b>
        <span className='subTitle'>{media_type === 'tv' ? 'TV Series' : 'movie'}
        <span className="subTitle">{date}</span>
        </span>
        </ContentModal>
  )
}

export default Singlecontent