import { createTheme } from "@material-ui/core";

const theme = createTheme({
    overrides:{ 
       MuiTypography:{
        root:{
            fontFamily:'Yekan !important',
        }
       },
       MuiDrawer:{
            direction:'ltr !important'
       },
       MuiIconButton:{
           root:{
               padding:'0',
           }
       },
       MuiListItem:{
        root:{
            margin:'0',
        }
       },
       MuiListItemText:{
           root:{
               flex:'0 0 auto',
               padding:'0',
               margin:'0'
           }
       },
       MuiBottomNavigationAction:{
        root: {
            "&$selected": {
              color: "rgb(7, 79, 235)"
            },
            
          },
          selected: {}
        },
       MuiStepper:{
           root:{
               direction:'ltr',
               
           }
       },
       MuiStepLabel:{
           root:{
               direction:'ltr',
               textAlign:'left',           
           }
       } ,
       MuiStepIcon:{ 
           root:{
                '& .MuiStepIcon-active':{
                    color:'gold'
                }  ,
                "&$active":{
                    color:'gold'
                },
                "&$completed":{
                    color:'blue'
                },
           }
       },
       MuiButton:{
           root:{
                "&$containedPrimary":{
                    backgroundColor:'rgb(69, 133, 245)',
                    color:'white'
                },
                "&$disabled":{
                    color:'black'
                }
           }
       },
        MuiOutlinedInput:{
            input:{
                fontFamily:'yekan !important',
                textAlign:'right !important'
            }            
      } ,
      MuiInputLabel:{
          root:{
            textAlign:'right !important',
            direction:'rtl !important'
          }
      },
      MuiFormHelperText:{
          root:{
              fontFamily:'yekan'
          }
      },
      MuiTextField:{
          root:
          {
              height:'3rem'
          }
      }
    },
    palette:{
        primary:{
              main:'#f8f8f8',
        }
    },   
})

export default theme