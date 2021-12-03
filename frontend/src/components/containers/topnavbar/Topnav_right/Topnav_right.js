import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Typography , Box, Divider} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import InfoIcon from '@material-ui/icons/Info'
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import useStyles from './styles'
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import {withStyles} from '@material-ui/core/styles'
import {OpenMenu,CloseMenu} from '../../../../redux/SidebarMenu/actionCreator'
import {connect} from 'react-redux'




const StyledMenu = withStyles(
    {
        paper:{
            border: '1px solid #d3d4d5',
            borderRadius:'10px'
        },    
    }
)((props)=>(
    <Menu elevation={0} getContentAnchorEl={null}
    anchorOrigin={{vertical:'bottom',horizontal:'center'}} 
    transformOrigin={{vertical:'top',horizontal:'center'}}
    {...props}>    
    </Menu>
))

const Topnav_right = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMenuClick = ()=>{
        const initMenuState = props.StateMenu
        console.log(props);
        if (!initMenuState){
            props.openMenu()
        }
        else{
            props.closeMenu()
        }
    }
    const classes = useStyles()
    const [value, setValue] = React.useState(0);
    return (
                <Box display='flex' flexDirection='row' justifyContent='start' alignItems='center'
                    flexGrow='1'>          
                    <IconButton onClick={handleMenuClick} className={classes.SideBarIcon} edge="start"  aria-label="menu">
                                    <MenuIcon />
                    </IconButton>            
                        <img src="/images/headerLogo.png" alt="#" className={classes.logo}/>
                        <Divider orientation="vertical" style={{width:'1px',color:'black'}}></Divider>
                </Box>                 
    )
}

const mapDispatchToProps = dispatch => ({
    openMenu: () => dispatch(OpenMenu()),
    closeMenu: ()=> dispatch(CloseMenu())
  })

const mapStateToProps = state=>{
    return {
        StateMenu:state.sidemenu.StateMenu
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Topnav_right)
