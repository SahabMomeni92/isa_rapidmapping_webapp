import { Box,Typography,InputBase,Button, ButtonBase } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import React , {useEffect} from 'react'
import useStyles from './styles'
import SearchIcon from '@material-ui/icons/Search';

import Expert_Topnav from './Expert_Topnav';
import Manager_Topnav from './Manager_Topnav';

// const StyledInputBase = withStyles(
//     {
//         'root':{
//             fontFamily:'yekan'
//         }
//     }
// )((props)=>(
//     <InputBase {...props}></InputBase>
// ))


const Topnav_center = (props) => {
    const classes = useStyles()
    
    const [userPermissions,SetuserPermissions] = React.useState(null);
    // console.log(props.user);
    const user_permissons = ()=>{
        if (props.user.is_manager){
            SetuserPermissions('manager')
        }
        else if(props.user.is_expert){
            SetuserPermissions('expert')
        }
        else{
            SetuserPermissions('normal')
        }
    }
    useEffect(() => {
        user_permissons()
    }, [])
    return (
        <Box display='flex' flexDirection='row' justifyContent='right' alignItems='right' flexGrow='1' flex='1 1 auto' >
            {/* <ButtonBase >
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
            </ButtonBase>   */}
            {/* <div className={classes.search}>    
                <InputBase
                placeholder="جست و جو ..."
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                />
            </div>            */}
            {userPermissions === 'expert' && <Expert_Topnav>{props.children}</Expert_Topnav>}
            {userPermissions === 'manager' && <Manager_Topnav></Manager_Topnav>}
        </Box>
    )
}

export default Topnav_center
