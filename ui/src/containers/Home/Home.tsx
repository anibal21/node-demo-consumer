import React from 'react'
import Header from './components/header/Header'
import Post from './components/post/Post'

import Grid from '@material-ui/core/Grid'

import { homeStyles } from './styles'

const Home = (props: any) => {

    const classes = homeStyles()

    return <Grid
        container={true}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        className={classes.container}
    >
        <Grid className={classes.header}>
            <Header />
        </Grid>
        <Grid className={classes.table}>
            <Post />
        </Grid>
    </Grid>
}    

export default Home