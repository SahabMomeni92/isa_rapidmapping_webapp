import { makeStyles,useTheme } from "@material-ui/core/styles"
import {connect} from 'react-redux'

const useStyles = makeStyles(()=>{
    const theme = useTheme()
    
    return(
    {
        drawer: {          
                flexShrink: 0,
                whiteSpace: 'nowrap',             
          },
        drawerOpen:{
            width:'260px',
            top:'4rem',
            height:'calc(100% - 4rem)',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            // borderRadius:'0.75rem 0 0 0.75rem !important',
        }  ,
        drawerClose: {
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            top:'4rem',
            height:'calc(100% - 4rem)',
            // borderRadius:'0.75rem 0 0 0.75rem !important',
            width: '57px !important',
            [theme.breakpoints.up('sm')]: {
              width: '57px',
            },
          },
          ListMenu:{
            padding:'1rem',
            '&:hover':{
              backgroundColor:'#4dabf5',
              '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                  color: 'white',
                }
          },
          }
    }
)})
export default useStyles