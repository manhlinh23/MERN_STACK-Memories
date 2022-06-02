import React from 'react'
import Post from '../Posts/Post/Post'
import { Grid, CircularProgress} from '@material-ui/core'
import useStyle from './styles'
import { useSelector } from 'react-redux'
const Posts = ({setCurrentId}) => {
  const classes = useStyle()
  const posts = useSelector((state) => state.posts)
  return (
    posts.length ?
      (<Grid className = {classes.container} container alignItems='stretch' spacing={3}>
        {posts.map((post) => {
          return(
            <Grid key={post._id} item xs={12} sm={6}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          )
          })
        }
      </Grid>) : <CircularProgress/>
  )
}

export default Posts
