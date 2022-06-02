import React, {useEffect, useState} from 'react'
import {Container,AppBar,Typography,Grid,Grow} from '@material-ui/core'
import memories from '../src/img/memories.png'
import Form from './components/Form/Form'
import Posts from './components/Posts/Posts'
import useStyle from './styles'
import { useDispatch } from 'react-redux'
import {getPosts} from './actions/posts'
import './index.css'

const App = () => {
  const [currentId,setCurrentId]  = useState(null)
  const classes = useStyle()
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getPosts())
  },[currentId,dispatch])

  return (
    <Container maxidth = 'lg'>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
        <img className={classes.image} src={memories} alt='memories' height={50}></img>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container className={classes.mainContainer} justifyContent='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App


