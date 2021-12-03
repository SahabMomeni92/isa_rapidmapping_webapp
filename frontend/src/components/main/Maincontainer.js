import { Box,Divider,Typography } from '@material-ui/core'
import React from 'react'
import { BrowserRouter, Switch , Route , Redirect ,withRouter } from 'react-router-dom';
import useStyles from './styles'
import {connect} from 'react-redux'
import clsx from 'clsx';


const Maincontainer = (props) => {
    const classes = useStyles()
    console.log(props)
    const handleChange = (e)=>{
        console.log(e);
    }
    return (
           <Box display='flex' flexDirection='column' 
                className={clsx({
                    [classes.MainContainerOpen]: props.StateMenu,
                    [classes.MainContainerClose]: !props.StateMenu
                })}>
                <Typography variant="h1" className={classes.PageName}>{props.children.props.page_name}
                </Typography>
                <Divider className={classes.MainDividers}></Divider>
                {props.children}            
           </Box> 
    )
}

{/* <DatePicker calendar={persian} locale={persian_fa} onChange={(event)=>handleChange(event)}></DatePicker> */}
                {/* <Calendar></Calendar> */}
const mapStateToProps = state=>{
    return {
        StateMenu:state.sidemenu.StateMenu,
        SidebarWidth:state.sidemenu.SidebarWidth
    }
}

export default connect(mapStateToProps)(withRouter(Maincontainer));