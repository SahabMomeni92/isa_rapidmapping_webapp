import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme)=>(
    {
        MainContainerOpen:{   
            flexGrow:1,   
            height:'auto',
            // background:'gold !important',
            
            paddingTop:'5rem', 
            // width:'calc(100% - 260px)', 
            width:'100%',
            paddingRight:'260px',
      
            transition: theme.transitions.create('padding-right', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
        },
        MainContainerClose:{  
            flexGrow:1,        
            height:'auto',
            paddingTop:'5rem',   
            width:'100%', 
            paddingRight:'60px', 
             
            transition: theme.transitions.create('padding-right', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
        },
        PageName:{
            fontSize:'1.75rem',
            fontWeight:'Bold',
            margin:'1rem',
        },
        MainDividers:{
            marginRight:'1rem',
            marginLeft:'1rem',
        }
    }
))

export default useStyles 