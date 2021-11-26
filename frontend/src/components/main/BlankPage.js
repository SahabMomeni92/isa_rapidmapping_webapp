import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

const useStyles = makeStyles(theme=>(
    {
        root:{
            margin:'1rem',
            background:'white',
            height:'100vh'
        }
    }
))

const BlankPage = () => {
    const classes = useStyles()
    return (
        <Box flex className={classes.root}>
            sax2
        </Box>
    )
}

export default BlankPage
