import React from 'react'
import Typography from '@material-ui/core/Typography'
import { headerStyle } from './styles'

const Header = () => {
    const classes = headerStyle()

    return <div className={classes.container}>
        <Typography variant="h2">HN Feed</Typography>
        <Typography variant="subtitle1">We {'<3'} Hacker News</Typography>
    </div>
}

export default Header