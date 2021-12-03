import React, { useEffect } from 'react'
import {Container,Navbar,Nav,NavDropdown} from 'react-bootstrap'
import useStyles from './styles'
import classNames from 'classnames'
import Topnav_right from './Topnav_right/Topnav_right'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Avatar, Box, Divider } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import Topnav_center from './Topnav_center/Topnav_center'
import { useTheme } from '@material-ui/core/styles';
import Topnav_left from './Topnav_left/Topnav_left'
import {useDispatch,useSelector} from 'react-redux'
import {LOGOUT,USER_LOADED_REQUEST} from '../../../redux/Authentication/types'
// const StyledAppbar = withStyles(    
//     {
//         root:{      
//             backgroundColor:'rgb(255, 255, 255) !important',
//             height:'5rem',
//             flexDirection:'row !important'
//         }
//     }
// )(
//     (props)=>(
//         <AppBar {...props} ></AppBar>
//     )
// )

const Topnav = (props) => {
    const theme = useTheme()
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    useEffect( () => {
      dispatch({type:USER_LOADED_REQUEST})
      }, [])
    return (  
                        <AppBar classes = {{root:classes.Appbar}} position="fixed" >
                             <Toolbar className={classes.topnav_right}>
                                <Topnav_right ></Topnav_right>
                             </Toolbar>
                             {/* <Divider orientation="vertical" style={{marginRight:'35px'}}/> */}
                             <Toolbar className={classes.topnav_center} >
                              {user ===null && <p>...loading</p>}
                                {user != null && <Topnav_center user={user}></Topnav_center>}                   
                             </Toolbar>
                             
                             <Toolbar className={classes.topnav_left}>
                                {user ===null && <p>...loading</p>}
                                {user != null && <Topnav_left user={user}></Topnav_left>}                                                              
                             </Toolbar>
                        </AppBar>  

        // <Box display='flex' className={classes.Topnav}>
        //     <Box display='flex' className={classes.topnav_right} justifyContent='center' alignItems='center' flexDirection='row'>   
        //                 <AppBar position="static" >
        //                     <Toolbar>
        //                         <IconButton edge="start" className={classes.menuButton} aria-label="menu">
        //                             <MenuIcon />
        //                         </IconButton>
        //                         <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }}>
        //                         </InputBase>
        //                     </Toolbar>
        //                 </AppBar>    
        //     </Box>
        //     <Box display='flex' className={classes.topnav_image}>
        //                 <AppBar position="static" >
        //                     <Toolbar>
        //                         <IconButton edge="start" className={classes.menuButton} aria-label="menu">
        //                             <MenuIcon />
        //                         </IconButton>
        //                         <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }}>
        //                         </InputBase>
        //                     </Toolbar>
        //                 </AppBar> 
        //     </Box>
        //     <Box display='flex' className={classes.topnav_left}>
        //                 <AppBar position="static" >
        //                     <Toolbar>
        //                         <IconButton edge="start" className={classes.menuButton} aria-label="menu">
        //                             <MenuIcon />
        //                         </IconButton>
        //                         <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }}>
        //                         </InputBase>
        //                     </Toolbar>
        //                 </AppBar>
        //     </Box>
        // </Box>
        
        
        // <div>
        //     <Navbar className={classes.topnav}>
        //         <div className={classNames(classes.topnav_right,'d-flex align-items-center')}> 
        //                 <Navbar.Brand href="#home">منو شماره 1</Navbar.Brand>
        //                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //                 <Navbar.Collapse id="basic-navbar-nav">
        //                     <Nav className="me-auto">
        //                         <Nav.Link href="#home">منو شماره 2</Nav.Link>
        //                         <Nav.Link href="#link">منو شماره 3</Nav.Link>
        //                         <NavDropdown title="منو شماره 4" id="basic-nav-dropdown">
        //                             <NavDropdown.Item href="#action/3.1">منو شماره 5</NavDropdown.Item>
        //                             <NavDropdown.Item href="#action/3.2">منو شماره 6 </NavDropdown.Item>
        //                             <NavDropdown.Item href="#action/3.3">منو شماره 7</NavDropdown.Item>
        //                             <NavDropdown.Divider />
        //                             <NavDropdown.Item href="#action/3.4">منو شماره 8 </NavDropdown.Item>
        //                         </NavDropdown>
        //                     </Nav>
        //                 </Navbar.Collapse>
        //         </div> 
        //         <div className={classNames(classes.topnav_image,'d-flex align-items-center justify-content-center')}>Image</div>
        //         <Topnav_left></Topnav_left>  
        //     </Navbar>
        // </div>
    )
}

export default Topnav
