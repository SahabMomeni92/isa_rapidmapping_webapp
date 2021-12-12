import { Box, Divider } from '@material-ui/core'
import React, { useEffect } from 'react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Import_Layer from './DrawMap_step1';
import useStyles from './styles'
import {useDispatch,useSelector} from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {GET_DISASTER_LIST, LAYER_IMPOERT_FAIL} from '../../../redux/ImportMap/types'
import {Main as ImportMap_step2} from './DrawMap_step2/Main';
import {Main as ImportMap_step3} from './DrawMap_step3/Main'
import { getDisasterList } from '../../../api/api_disaster';
import { GET_WMSCapabilities_RESET } from '../../../redux/WebGIS/types';
import { DrawMap_api } from '../../../api/api_drawMap';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const getSteps = ()=>(
    ['وارد کردن فایل رستری سیلاب', 'وارد کردن اطلاعات داده ها', 'اطلاعات مناطق درگیر سیلاب']
)



const getStepContent =(step)=>{
    
    switch (step) {
        case 0:
            // return <ImportMap_step3/>
            // return <div></div>
            return <Import_Layer  />
            // return <ImportMap_step3/>
        case 1:
            return (
                <div>
                        {/* <ImportMap_step3/> */}
                        <ImportMap_step2/>                     
                </div>
                
            )
        case 2:
            return(
                <div>
                        <ImportMap_step3/>
                </div>
            )    
        default:
            return <div>no way</div>;
    }
}

const Draw_map = () => {
    const dispatch = useDispatch()
    const is_DataInformationImported = useSelector(state => state.draw_map.is_DataInformationImported)
    const is_mapDataInserted = useSelector(state => state.draw_map.is_mapDataInserted)
    const insertmap = useSelector(state => state.draw_map.InsertMap)
    const has_layer = useSelector(state=> state.import_map.has_layer)
    const classes = useStyles()
    const [activeStep, setActiveStep] = React.useState(0);
    const [message, setMessage] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [alert,setAlert] = React.useState('warning');
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);} 
    const steps = getSteps();
    const handleNext = () => {
        if (activeStep===0 && !has_layer){
            setMessage('لطفاً یک لایه مکانی مناسب انتخاب کنید. چنانچه لایه مکانی را وارد کردید لطفاً منتظر باشید تا پیغام اضافه شدن لایه ارسال بشود')
            setOpen(true)
            setAlert('warning')
            return
        }
        if (activeStep===1 && !is_DataInformationImported){
            setMessage('لطقاً اطلاعات فرم را به طور کامل تکمیل کنید')
            setOpen(true)
            setAlert('warning')
            return
        }
        if (activeStep===2 && !is_mapDataInserted){
            setMessage('لطقاً اطلاعات فرم را به طور کامل تکمیل کنید')
            setOpen(true)
            setAlert('warning')
            return
        }
        if (activeStep===2 && is_mapDataInserted && insertmap){
            console.log('ok e')
            DrawMap_api(insertmap.id)
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        
        if (activeStep===1){
            dispatch({type:LAYER_IMPOERT_FAIL})
            dispatch({type:GET_WMSCapabilities_RESET})       
            setMessage('با بازگشت به مرحله قبل شما باید مجدد لایه مکانی را وارد کنید چنانچه اشتباهی رخ داده است می توانید لایه مکانی را از لایه های سطوح سیستم اضافه بکنید')
            setOpen(true)
            setAlert('info')
        }  
      }; 
    const handleReset = () => {
        setActiveStep(0);
      };   
    
    return (
        <Box flex className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                    <Typography>{getStepContent(index)}</Typography>
                    <div className={classes.actionsContainer}>
                        <div>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.button}
                            style = {{marginRight:'0.25rem'}}
                        >
                            <Typography>حذف و بازگشت به مرحله قبلی</Typography>
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                            style={{textAlign:'right'}}
                            // disabled={validation === false}
                        >
                            {activeStep === steps.length - 1 ?<Typography>ترسیم نقشه</Typography> : <Typography>بعدی</Typography>}
                        </Button>
                        </div>
                    </div>
                    </StepContent>
                </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>فرایند اضافه کردن نقشه به پایان رسیده استت آیا مایل هستید  مجدد متحان کنید؟</Typography>
                <Button onClick={handleReset} className={classes.button}>
                    شروع 
                </Button>
                </Paper>
            )}
            <Snackbar open={open} autoHideDuration={30000} onClose={handleClose} >
                            <Alert onClose={handleClose} severity={alert}>
                              <Typography>{message}</Typography>
                            </Alert>
            </Snackbar> 
        </Box>
    )
}

export default Draw_map