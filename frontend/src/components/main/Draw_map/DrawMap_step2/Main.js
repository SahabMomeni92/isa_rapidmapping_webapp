import { Divider, Grid } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import LayerInfo from './DrawMapInfo'
import useStyles from './styles'


export const Main = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <LayerInfo />
        </div>
    )
}


