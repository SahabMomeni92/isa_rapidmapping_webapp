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
const ExpertMenuListItems = () => {
    const classes = useStyle()
    return (
        <List >
            <ListItem button className={classes.ListMenu} >
                <Tooltip title="صفحه اصلی" >
                    <ListItemIcon><HomeIcon fontSize='medium'/></ListItemIcon>
                </Tooltip>                
                <ListItemText primary='صفحه اصلی'>                  
                </ListItemText>
            </ListItem>
            <Divider></Divider>
            <ListItem button className={classes.ListMenu} >
                <ListItemIcon><ListAltIcon fontSize='medium'/></ListItemIcon>
                <ListItemText primary='لیست نقشه های پایش سریع'>                  
                </ListItemText>
            </ListItem>
            <Divider></Divider>
            <ListItem button className={classes.ListMenu} >
                <ListItemIcon><AddBoxIcon fontSize='medium'/></ListItemIcon>
                <ListItemText primary='اضافه کردن نقشه پایش سریع'>                  
                </ListItemText>
            </ListItem>
            <Divider></Divider>
            <ListItem button className={classes.ListMenu} >
                <ListItemIcon><AssignmentIcon fontSize='medium'/></ListItemIcon>
                <ListItemText primary='گزارش گیری'>                  
                </ListItemText>
            </ListItem>
            <Divider></Divider>
            <ListItem button className={classes.ListMenu} >
                <ListItemIcon><MapIcon fontSize='medium'/></ListItemIcon>
                <ListItemText primary='صفحه نقشه سامانه'>                  
                </ListItemText>
            </ListItem>
            <Divider></Divider>                                                               
            <ListItem button className={classes.ListMenu} >
                <ListItemIcon><ViewListIcon fontSize='medium'/></ListItemIcon>
                <ListItemText primary='مدیریت نقشه های ارسالی'>                  
                </ListItemText>
            </ListItem>
            <Divider></Divider>
            <ListItem button className={classes.ListMenu} >
                <ListItemIcon><EventIcon fontSize='medium'/></ListItemIcon>
                <ListItemText primary='رویدادها'>                  
                </ListItemText>
            </ListItem>
            <Divider></Divider>
        </List>  
    )
}

export default ExpertMenuListItems
