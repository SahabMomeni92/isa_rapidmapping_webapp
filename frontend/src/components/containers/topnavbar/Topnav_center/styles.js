import { makeStyles } from "@material-ui/core";
import {alpha} from "@material-ui/core/styles"



const useStyles = makeStyles((theme)=>(
    {
        root:{
            disply:'inline-block',
        },
        search:{
            '&:hover':{
                backgroundColor: alpha(theme.palette.common.black, 0.25)
            },
            width:'20%',
            height:'2rem',
            backgroundColor:alpha(theme.palette.common.white, 0.1),
            position:'relative',
            border:`1px solid ${alpha(theme.palette.common.black, 0.25)} !important`,
            padding:'unset',
            margin:'unset',
            
        },
        searchBox:{
            fontsize:'1rem',
            fontFamily:'yekan',
            fontWeight:'400',
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            width:'3rem',
            height:'2rem',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:alpha(theme.palette.common.black, 0.2),
            border:`1px solid ${alpha(theme.palette.common.black, 0.25)} !important`,
            padding:'unset',
            margin:'unset',
          },
          inputRoot: {
            color: 'inherit',
            fontFamily:'yekan'
          },
          inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
              width: '20ch',
            },
          },
          lable:{
            fontSize:'1rem'
          },
          BottomNavigationAction:{
            width:'7rem',
            '& .MuiBottomNavigationAction-label':{
              fontFamily:'yekan'
            }
          }
    }
))

export default useStyles