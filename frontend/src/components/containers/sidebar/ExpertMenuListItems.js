import React from 'react'
import useStyle from './styles'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { List,ListItem ,ListItemIcon,ListItemText,Tooltip,Divider } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MapIcon from '@material-ui/icons/Map';
import ViewListIcon from '@material-ui/icons/ViewList';
import EventIcon from '@material-ui/icons/Event';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const ExpertMenuListItems = () => {
    const classes = useStyle()
    return (
        <List >
            <Divider ></Divider>
            <ListItem button className={classes.ListMenu} >
                <Tooltip title="پروفایل کاربری" >
                    <ListItemIcon><AccountBoxIcon fontSize='medium'/></ListItemIcon>
                </Tooltip>                
                <ListItemText primary='پروفایل کاربری'>                  
                </ListItemText>
            </ListItem>
            <Divider></Divider>
            <ListItem button className={classes.ListMenu} >
                <ListItemIcon><ListAltIcon fontSize='medium'/></ListItemIcon>
                <ListItemText primary='مدیریت کاربران'>                  
                </ListItemText>
            </ListItem>
            <Divider></Divider>
            <ListItem button className={classes.ListMenu} >
                <ListItemIcon><AddBoxIcon fontSize='medium'/></ListItemIcon>
                <ListItemText primary=' افزایش سطح دسترسی'>                  
                </ListItemText>
            </ListItem>
            <Divider></Divider>
            <ListItem button className={classes.ListMenu} >
                <ListItemIcon><ExitToAppIcon fontSize='medium'/></ListItemIcon>
                <ListItemText primary='خروج'>                  
                </ListItemText>
            </ListItem>
            <Divider></Divider>
        </List>  
    )
}

export default ExpertMenuListItems
