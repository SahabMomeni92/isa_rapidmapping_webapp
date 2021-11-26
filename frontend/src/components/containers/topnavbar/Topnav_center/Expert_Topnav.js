import React from 'react'
import { Link as RouterLink , withRouter , useHistory  } from 'react-router-dom';

import useStyles from './styles'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ListAltIcon from '@material-ui/icons/ListAlt';
import HomeIcon from '@material-ui/icons/Home';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MapIcon from '@material-ui/icons/Map';
import LayersIcon from '@material-ui/icons/Layers';
import ViewListIcon from '@material-ui/icons/ViewList';
import EventIcon from '@material-ui/icons/Event';
import { Typography } from '@material-ui/core';




const Expert_Topnav = (props) => {
    const history = useHistory()
    const classes = useStyles()
    const [value, setValue] = React.useState(null);
    const handleNavigationRoute = (route)=>{
        
        history.push(route)  
    }
    return (
        <div>
            <BottomNavigation
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            showLabels
                            >      
                            
                            <BottomNavigationAction     
                                    className = {classes.BottomNavigationAction}  
                                    label= 'خانه'
                                    icon={<HomeIcon fontSize='medium'/>} 
                                    onClick={()=>handleNavigationRoute('/')}
                                    />     
                            <BottomNavigationAction
                             className = {classes.BottomNavigationAction}
                             label= 'لیست نقشه ها'
                             icon={<ListAltIcon fontSize='medium'/>} />
                            <BottomNavigationAction
                             className = {classes.BottomNavigationAction}
                             label= 'افزودن نقشه'
                             icon={<AddBoxIcon fontSize='medium'/>}
                             onClick={()=>handleNavigationRoute('/import_map')}
                              />
                 
                            <BottomNavigationAction
                             className = {classes.BottomNavigationAction}
                             label= 'ترسیم نقشه'
                             icon={<MapIcon fontSize='medium'/>} />
                            <BottomNavigationAction
                             className = {classes.BottomNavigationAction}
                             label= ' مدیریت نقشه ها'
                             icon={<ViewListIcon fontSize='medium'/>} /> 
                            <BottomNavigationAction
                             className = {classes.BottomNavigationAction}
                             label= 'مدیریت رویدادها'
                             icon={<EventIcon fontSize='medium'/>} /> 
                            <BottomNavigationAction
                             className = {classes.BottomNavigationAction}
                             label= 'لایه های مکانی'
                             icon={<LayersIcon fontSize='medium'/>} /> 
                            <BottomNavigationAction
                             className = {classes.BottomNavigationAction}
                             label= 'گزارش گیری'
                             icon={<AssignmentIcon fontSize='medium'/>} />  
            </BottomNavigation>
        </div>
    )
}

export default withRouter(Expert_Topnav)
