import { Box,Typography,IconButton,Badge, withStyles, Menu, ListItemIcon ,ListItemText,MenuItem,
        ButtonBase , Divider , Link , ListItem} from '@material-ui/core'
import React ,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import useStyles from './styles'
import Avatar from '@material-ui/core/Avatar';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {LOGOUT} from '../../../../redux/Authentication/types'

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

function ListItemLink(props) {
    const { icon, primary, to , onClick } = props;
    
    const renderLink = React.useMemo(
      () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
      [to],
    );
  
    return (    
        <ListItem button onClick={onClick} component={renderLink}>
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText primary={primary} />
        </ListItem>
    );
  }
  
ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    onClick: PropTypes.func
  };
  

const Topnav_left = (props) => {
    const classes = useStyles() 
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [userPermissions,SetuserPermissions] = React.useState(null);
    // console.log(props.user);
    const user_permissons = ()=>{
        if (props.user.is_manager){
            SetuserPermissions('مدیر')
        }
        else if(props.user.is_expert){
            SetuserPermissions('کارشناس')
        }
        else{
            SetuserPermissions('کاربر عادی')
        }
    }
    useEffect(() => {
        user_permissons()
    }, [])
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogOut = () => {
        dispatch({type:LOGOUT})
    }
    console.log(userPermissions);
    return (            
            <Box display='flex' flexDirection='row-reverse' flexGrow='1' alignItems='center' >
                <IconButton aria-label="avatar" onClick={handleClick}>
                    <Avatar alt='sahab momeni' src="" />
                </IconButton>     
                    <StyledMenu id="customized-menu" anchorEl={anchorEl} 
                        open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem className={classes.details_menuItem} >
                            <ListItemIcon >
                                <AccountBoxIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText  primary=" کاربری" />
                        </MenuItem>
                        <MenuItem className={classes.details_menuItem}>
                            <ListItemIcon >
                                <NotificationsIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText  primary="پیام ها" />
                            
                        </MenuItem>
                        <Divider></Divider>
                            <MenuItem className={classes.exit_menuItem} >
                                <ListItemLink onClick={handleLogOut} to="login/" primary="خروج"
                                icon={<ExitToAppIcon fontSize="small" />} />                   
                            </MenuItem>                  
                    </StyledMenu>      
                <Typography className={classes.profileName}>سطح دسترسی:{userPermissions}
                </Typography>
                <IconButton className={classes.notifications} aria-label="show 17 new notifications" >
                <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                </Badge>
                </IconButton> 
                {/* <IconButton aria-label="full screen">
                    <FullscreenIcon />
                </IconButton>      */}
                {/* <ButtonBase >
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                </ButtonBase>      */}
                        
            </Box>  
    )           
}

// const mapDispatchToProps = dispatch => {
//     return {
//       logout: () => dispatch({type:LOGOUT}),
//       load_user: ()=> dispatch({type:USER_LOADED_REQUEST})
//   }}
  
// const mapStateToProps = state=>{
//     return {
//     user:state.auth.user  
// }}
  
export default Topnav_left
