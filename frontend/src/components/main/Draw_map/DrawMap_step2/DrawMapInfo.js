import { Button, Box, Grid, TextField, Typography, TextareaAutosize, Card } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import React , {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LayerInfo_map from '../../../Maps/LayerInfo_map/LayerInfo_map';
import useStyles from './styles'
import DatePicker from "react-multi-date-picker"
import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import Alert from '@material-ui/lab/Alert';
import { importMap_api } from '../../../../api/api_importMap';
import { MAP_IMPORT_FAIL, MAP_IMPORT_SUCCESS } from '../../../../redux/ImportMap/types';
import { DrawMapData_IMPOERT_FAIL, DrawMapData_IMPOERT_SUCCESS } from '../../../../redux/DrawMap/types';

const StyledTextField = withStyles({
    root: {
      
      '& label.Mui-focused': {
        color: 'green',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
      },
    },
  })(TextField);

const DisabledTextField = withStyles({
    root: {
      
      // '& label.Mui-focused': {
      //   color: 'green',
      // },
      // '& .MuiInput-underline:after': {
      //   borderBottomColor: 'green',
      // },
      // '& .MuiOutlinedInput-root': {
      //   '& fieldset': {
      //     borderColor: 'red',
      //   },
      //   '&:hover fieldset': {
      //     borderColor: 'black',
      //   },
      //   '&.Mui-focused fieldset': {
      //     borderColor: 'black',
      //   },
      // },
    },
  })(TextField);
const LayerInfo = (props) => {
    const dispatch = useDispatch()
    const DisasterDate_ref = React.useRef()
    const ProccessDate_ref  = React.useRef()
    const ImageDate_ref = React.useRef()
    const [alert,setAlert] = React.useState('info');
    const [alertVariant,setAlertVariant] = React.useState('outlined');
    const [message, setMessage] = useState("لطفاً اطلاعات فرم را پر کنید");  
    // import map state
    const [LayerSat,setLayerSat] = React.useState(''); 

    // formData.append('date',mapDate_ref.current.children[0].value.replace("/", "-").replace("/","-"))
    const handleGetInformations = (e)=>{
        const DisasterDate = DisasterDate_ref.current.children[0].value.replace("/", "-").replace("/","-")
        const ProccessDate = ProccessDate_ref.current.children[0].value.replace("/", "-").replace("/","-")
        const ImageDate = ImageDate_ref.current.children[0].value.replace("/", "-").replace("/","-")
        if(LayerSat && ImageDate && ProccessDate && DisasterDate){
            dispatch({type:DrawMapData_IMPOERT_SUCCESS,payload:{
                LayerSat:LayerSat,
                DisasterDate:DisasterDate,
                ProccessDate:ProccessDate,
                ImageDate:ImageDate
            }})
            setMessage('اطلاعات به درستی وارد شده است می توانید به مرحله بعدی بروید')
            setAlert('success')
            setAlertVariant('filled')
        }
        else{
            dispatch({type:DrawMapData_IMPOERT_FAIL})
            setMessage('لطفاْ فرم بالا را تکمیل کنید')
            setAlert('error')
            setAlertVariant('filled')
        }
    }
    const handleTitleChange = (e)=>{
        setLayerSat(e.target.value)
    };  
    const classes = useStyles()
    return (
        <Box className={classes.layerInfo}>
            <Grid container direction='row-reverse' spacing={1} >
                    <Grid xs={12} sm={12} item >
                        <div className={classes.mapInfo_container}>
                            <Grid xs={12} sm={12} className={classes.formControl}>
                                <Typography className={classes.formLable}>نام ماهواره فایل سیلاب</Typography>
                            </Grid>
                            <Grid xs={12} sm={12} className={classes.formControl}>
                                <StyledTextField 
                                    autoComplete="fname"                           
                                    name="firstName"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    onChange={e=>handleTitleChange(e)}
                                    id="firstName"         />
                            </Grid>
                            <Grid xs={12} sm={12} className={classes.formControl}>
                                <Typography className={classes.formLable}>تاریخ وقوع مخاطره</Typography>
                            </Grid>
                            <Grid xs={12} sm={12} className={classes.formControl}>
                                    
                                        <DatePicker 
                                        containerStyle={{width:'100%'}}   
                                        ref = {DisasterDate_ref}
                                        inputClass = {classes.DatePicker}
                                        calendar={persian} 
                                        locale={persian_fa}
                                        required>                                           
                                        </DatePicker>
                                                    
                            </Grid>
                            <Grid xs={12} sm={12} className={classes.formControl}>
                                <Typography className={classes.formLable}>تاریخ اخذ تصویر ماهواره ای </Typography>
                            </Grid>
                            <Grid xs={12} sm={12} className={classes.formControl}>
                                    
                                        <DatePicker 
                                        containerStyle={{width:'100%'}}   
                                        ref = {ImageDate_ref}
                                        inputClass = {classes.DatePicker}
                                        calendar={persian} 
                                        locale={persian_fa}
                                        required>                                           
                                        </DatePicker>
                                                    
                            </Grid>
                            <Grid xs={12} sm={12} className={classes.formControl}>
                                <Typography className={classes.formLable}>تاریخ ‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍پردازش تصویر </Typography>
                            </Grid>
                            <Grid xs={12} sm={12} className={classes.formControl}>
                                    
                                        <DatePicker 
                                        containerStyle={{width:'100%'}}   
                                        ref = {ProccessDate_ref}
                                        inputClass = {classes.DatePicker}
                                        calendar={persian} 
                                        locale={persian_fa}
                                        required>                                           
                                        </DatePicker>
                                                    
                            </Grid>  
                            <Grid xs={12} sm={12} item>        
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.mapUpload_Btn}
                                onClick = {e=>handleGetInformations(e)}
                            >
                                ارسال اطلاعات
                            </Button>  
                        </Grid>                                        
                        </div>
                     
                    </Grid>
                                             
                        <Grid xs={12} sm={12} item>        
                            <Alert variant={alertVariant}  severity={alert} >
                              <Typography>{message}</Typography>
                            </Alert>  
                        </Grid>    
                           
            </Grid>         
        </Box>
    )
}


export default LayerInfo

