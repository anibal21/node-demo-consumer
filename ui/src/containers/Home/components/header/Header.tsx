import React from 'react'
import { headerStyle } from './styles'

const Header = () => {
    const classes = headerStyle()

    return <div className={classes.container}>Header</div>
}

export default Header