import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme=>(
    {
        root:{
            margin:'1rem',
            background:'white',
            padding:'1rem',
            border:'1px solid black',
            
        },
        paper:{
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border:'1px solid black',
            padding:'1rem'
          },
        actionsContainer:{
            direction:'ltr !important',
            textAlign:'center',
            marginTop:'1rem'
        },
        form:{
            margin:'0.5rem'
        },
        formControl: {
            width: '100%', 
            marginTop: theme.spacing(3),
          },
        selectEmpty: {
            marginTop: '2rem',
          },
        SelectDisaster:
            {
                width: '100%', 
                
              },
        selectFont:{
            fontFamily:'yekan',
            textAlign:'right'
        } ,    
        formLable:{
            direction:'rtl',
            color:'black',
            fontSize:'1rem',
            fontWeight:'bold',
            marginTop:'1rem'
        },
        FormRadioBottom:{
            direction:'rtl',
            marginTop:'1rem'
        },
        formButton:{
            background:'white',
            width:'100% !important',
            border:'solid 0.1rem black'
        },
        formContainer:{
            marginTop:'1rem'
        },
        formContainerRadiobottom:{
            marginTop:'2rem'
        },
        formContainerRadiobottomLable:{
            marginTop:'4rem'
        },
        Alert:{
            // direction:'center',
            // color:'red'
        }
        }
  
))

export default useStyles