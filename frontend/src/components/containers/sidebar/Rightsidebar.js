import { Drawer} from '@material-ui/core'
import React from 'react'
import useStyles from './styles'
import clsx from 'clsx';
import {connect} from 'react-redux'
import ExpertMenuListItems from './ExpertMenuListItems'


const Rightsidebar = (props) => {
    const classes = useStyles()
    
    return (     
                <Drawer variant='permanent' anchor='right' className={classes.drawer}
                    classes={{paper:clsx({
                        [classes.drawerOpen]: props.StateMenu,
                        [classes.drawerClose]: !props.StateMenu
                    })}}>                                     
                        <ExpertMenuListItems/>        
                </Drawer>
    )
}


const mapStateToProps = state=>{
    return {
        StateMenu:state.sidemenu.StateMenu
    }
}

export default connect(mapStateToProps)(Rightsidebar);

