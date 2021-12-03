import { Divider, Grid } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import Map_Details from './Map_Details'
import useStyles from './styles'


export const Main = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Map_Details />
        </div>
    )
}


