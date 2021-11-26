import { makeStyles } from "@material-ui/core";
import {alpha} from "@material-ui/core/styles"
const useStyles = makeStyles(theme=>(
    {
        profileName:{
            marginLeft:'1rem',
            fontSize:'.8rem',
            fontWeight:'400',
            [theme.breakpoints.down('xs')]: {
                display:'none'
            }
        },
        
        Avatar:{
            maxWidth:'100%',
            height:'auto',
            width:'3rem',
            [theme.breakpoints.down('xs')]: {
                width:'2rem'
            }
        },
        notifications:{
            marginLeft:'1rem',
            marginRight:'1rem',
            width:'3rem',
            color:alpha(theme.palette.common.black,0.25),
            [theme.breakpoints.down('md')]: {
                marginLeft:'0rem',
                marginRight:'0rem',
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
        exit_menuItem:{
            '&:hover':{
                backgroundColor:'red',
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                    color: 'white',
                  }
            },
            direction:'ltr',
            padding:0,
            margin:0,
            display:'flex',
            flex:'0 0 auto'
        },
        detailsText:{
            fontSize:'.8rem',
            fontWeight:'400',
            color:'black',
            [theme.breakpoints.down('md')]: {
                display:'none'
            }
        },
        details_menu:{
            paper: '1px solid #d3d4d5',     
        },
        details_btn:{    
            backgroundColor:alpha(theme.palette.common.white,0.1),
            marginRight:'1rem',
            maxWidth:'100%',
            borderRadius:'10px',
            height:'auto', 
            '&:hover':{
                backgroundColor:alpha(theme.palette.common.black,0.25)
            },
            [theme.breakpoints.down('xs')]: {
                display:'none'
            }
        },
        RespondSM_details_btn:{
            backgroundColor:alpha(theme.palette.common.white,0.1),
            marginRight:'1rem',
            width:'3rem',
            height:'10rem',
            // display:'none',
            '&:hover':{
                backgroundColor:alpha(theme.palette.common.black,0.25)
            },
            [theme.breakpoints.down('md')]: {
                display:'inline'
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
        searchIcon: {
            padding: theme.spacing(0, 2),
            // width:'3rem',
            // height:'2rem',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor:alpha(theme.palette.common.black, 0.2),
            // border:`1px solid ${alpha(theme.palette.common.black, 0.25)} !important`,
            [theme.breakpoints.up('md')]:{
                display:'none',
            },
            [theme.breakpoints.down('sm')]:{
                padding:'unset'
            }
          },
    }
))
export default useStyles