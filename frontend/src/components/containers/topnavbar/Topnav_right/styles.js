import { makeStyles } from "@material-ui/core";
import {alpha} from "@material-ui/core/styles"

const useStyles = makeStyles((theme)=>(
    {
        SideBarIcon:{
            marginRight:'1rem',
            marginLeft:'1rem',
            [theme.breakpoints.down('md')]: {
                marginLeft:'0rem',
            },
        },
        logo:{
            maxWidth:'100%',
            height:'auto',
            width:'10rem',     
            [theme.breakpoints.down('xs')]: {
                width:'6rem', 
            },
            marginRight:'1rem' ,  
        },
        detailsText:{
            fontSize:'.8rem',
            fontWeight:'400',
            color:'black',
            [theme.breakpoints.down('xs')]: {
                display:'none'
            }
        },
        details_menu:{
            paper: '1px solid #d3d4d5',     
        },
        details_btn:{    
            backgroundColor:alpha(theme.palette.common.white,0.1),
            marginRight:'1rem',
            borderRadius:'10px', 
            '&:hover':{
                backgroundColor:alpha(theme.palette.common.black,0.25)
            },
            [theme.breakpoints.down('xs')]: {
                display:'none'
            },
        },
        RespondSM_details_btn:{
            backgroundColor:alpha(theme.palette.common.white,0.1),
            marginRight:'1rem',
            maxWidth:'100%',
            height:'auto', 
            '&:hover':{
                backgroundColor:alpha(theme.palette.common.black,0.25)
            },
            [theme.breakpoints.up('sm')]: {
                display:'none'
            }
        },
        details_menuItem:{
            '&:hover':{
                backgroundColor:'#4dabf5',
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                    color: 'white',
                  }
            },
            direction:'ltr'
        },
    }
))
export default useStyles