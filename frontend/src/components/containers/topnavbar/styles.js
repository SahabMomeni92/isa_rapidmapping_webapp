import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme=>(
    {
        topnav:{
            flexGrow: 1,
            // padding:'1rem 0',
            // boxShadow:'0px 1px 15px 1px white',
            // border:'1px solid white',
        },
        Appbar:{         
                backgroundColor:'rgb(255, 255, 255) !important',
                height:'4rem',
                flexDirection:'row !important',
                // zIndex:theme.zIndex.drawer + 1,
                display:''
        },
        topnav_right:{
            flexBasis:'18%',
            // backgroundColor:'green',
            padding:'1.5rem 0rem',
            // border:'10px solid black'
            [theme.breakpoints.down('sm')]: {
                flexBasis:'50%',
              }
        },
        topnav_left:{
            flexBasis:'25%',
            // backgroundColor:'green',
            // direction:'ltr'
            [theme.breakpoints.down('sm')]: {
                flexBasis:'50%',
              }
        },
        topnav_center:{
            flexBasis:'57%',
            textAlign:'center',
            [theme.breakpoints.down('sm')]: {
                flexBasis:'0%',
                display:'none'
              }
            // backgroundColor:'gold',
        },
    }
))

export default useStyles