import { Divider, Grid } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import DrawMap_FloodLocations from './DrawMap_FloodLocations'
import useStyles from './styles'


export const Main = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <DrawMap_FloodLocations />
        </div>
    )
}


