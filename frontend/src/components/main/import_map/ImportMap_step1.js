import React ,{useState,useEffect} from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box ,Typography,Button, Grid , ListItem } from '@material-ui/core';
import useStyles from './styles'
import {DropzoneDialog} from 'material-ui-dropzone'
import {DropzoneArea} from 'material-ui-dropzone'
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import UploadFilesService from '../../../api/api_importGeospatialFiles'
import PropTypes from 'prop-types';
import {useSelector,useDispatch} from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {LAYER_IMPOERT_SUCCESS,LAYER_IMPOERT_FAIL, GET_DISASTER_LIST, GET_DISASTER_WATCH} from '../../../redux/ImportMap/types'
import { GET_WMSCapabilities_RESET } from '../../../redux/WebGIS/types';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center" >
      <Box width="100%" mr={1} >
        <LinearProgress variant="determinate" color="secondary" {...props} />
      </Box>
      <Box minWidth={35}> 
        <Typography variant="body2" color="textSecondary" >{`${Math.round(
          props.value/100*props.fileSize*100
        )/100}/${Math.round(props.fileSize*100)/100}mb`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const StyledTextField = withStyles({
    root: {
      
      '& label.Mui-focused': {
        color: 'green',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'red',
        },
        '&:hover fieldset': {
          borderColor: 'black',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'black',
        },
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
const Import_Layer = () =>{
    const dispatch = useDispatch()
    
    const classes = useStyles()
    const [radiovalue, setRadiovalue] = React.useState('select');
    const [age, setAge] = React.useState('');
    const [message, setMessage] = useState("لطفاً یک فایل رستر معتبر وارد کنید");  
    const [open, setOpen] = React.useState(false);
    const [alert,setAlert] = React.useState('info');
    const [alertVariant,setAlertVariant] = React.useState('outlined');
    useEffect( () => {      
      dispatch({type:GET_DISASTER_WATCH})   
    },[])
    const handleChange = (event) => {
        setRadiovalue(event.target.value);
        if (event.target.value === 'select'){
          setMessage('لطفاً یکی از فایل های سیستم را انتخاب کنید')
          setAlert('info')
          setAlertVariant('outlined')
        }
        else{
          setMessage('لطفاً یک فایل رستر معتبر برای مخاطره طبیعی وارد کنید')
          setAlert('info')
          setAlertVariant('outlined')
        }
      };
    const handleSelectChange = (event) => {
        const name = event.target.name;
        setState({
          ...state,
          [name]: event.target.value,
        })  }
    const handleSelectLayerChange = (event) => {
        setAge(event.target.value);
      };  
  
    const [state, setState] = React.useState({
        disaster: '',
        name: 'hai',
      });

    const SelectLayer = () => {

        return (
            
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple" ><Typography>لایه های سیستمی</Typography></InputLabel>
                <Select
                native
                value={state.age}
                onChange={handleSelectChange}
                label= 'aaaaaaaaaaaaa'
                inputProps={{
                    name: 'age',
                    id: 'outlined-age-native-simple',
                }}
                >
                <option aria-label="None" value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
                </Select>
            </FormControl>
            
        )
    }
    const ImportLayer = (props)=>{
        const [fileName,setfileName] = React.useState('لطفاً یک فایل انتخاب کنید');
        const [selectedFiles, setSelectedFiles] = useState(undefined);
        const [currentFile, setCurrentFile] = useState(undefined);
        const [progress, setProgress] = useState(0);
          
        const [fileSize,setfileSize]  = useState(0);
        
        
        // const [fileInfos, setFileInfos] = useState([]);  
        // const [isError,setisError] = useState(false) 
        
        // console.log(props);
        const handleSelectFile = (event) => {
          console.log(fileName)
          let file_name = event.target.value
          // console.log(file_name)
          var filename = file_name.replace(/^.*[\\\/]/, '')
          setfileName(filename)
          setSelectedFiles(event.target.files[0]);
          console.log(event.target.files[0].size/1024/1024)
          setfileSize(event.target.files[0].size/1024/1024)
          };
        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
            setOpen(false);}  
        const upload = () => {   
            console.log(props);
            if (selectedFiles === undefined){
              setMessage('ابتدا یک فایل انتخاب کنید')
              setAlert('warning')
              setAlertVariant('filled')
              return
            }
            if (!props.disaster || !props.layer_name){
              setMessage('وارد کردن نام لایه و مخاطره طبیعی الزامی است')
              setAlert('warning')
              setAlertVariant('filled')
              return
            }
            setCurrentFile(selectedFiles[0])
            setProgress(0);

            const formData = new FormData();
            formData.append('file',selectedFiles)
            formData.append('name',props.layer_name)
            formData.append('file_type','raster')
            formData.append('workspace',props.disaster)
            
            console.log(formData)  
            UploadFilesService.upload(formData, (event) => {
              setProgress(Math.round((100 * event.loaded) / event.total));
            })
              .then((response) => {
                console.log(response)
                dispatch({type:LAYER_IMPOERT_SUCCESS,payload:{layer_name:props.layer_name,
                          layer_id:response.data.id,disaster:props.disaster,
                          disaster_id:props.disaster_id,
                          disaster_name:props.disaster_name,
                          workspace_name:props.workspaceName,
                          system_name:response.data.system_name}})
                setMessage(response.data.message);
                setAlert('success')
                setOpen(true)  
                
                setAlertVariant('filled')         
                return response.data.id
              })
              .catch((e) => {
                setProgress(0);
                console.log(e.response);
                dispatch({type:LAYER_IMPOERT_FAIL})              
                {
                  try{
                    if('name' in e.response.data){
                      setMessage(e.response.data.name[0]);
                    }
                  }
                  catch{
                    setMessage('خطای سرور')
                  }  
                }              
                setAlert('error')
                setAlertVariant('filled')
                setOpen(true)
                setCurrentFile(undefined);
              });
        
            setSelectedFiles(undefined);
          };  
        // useEffect(() => {
        //   UploadFilesService.getFiles().then((response) => {
        //       setFileInfos(response.data);
        //     });
        //   }, []);   
        return (           
            <FormControl className={classes.formControl}>  
                     <Grid container direction='row-reverse'>
                        <Grid xs={12} sm={6} >
                              <input
                                accept="image/tiff"
                                style={{ display: 'none' }}
                                id="raised-button-file"
                                multiple
                                type="file"
                                onChange={e=>handleSelectFile(e)}
                                />
                                
                                <label htmlFor="raised-button-file" style={{width:'90%'}}>
                                    <Button variant="raised" component="span" className={classes.formButton} >
                                    <Typography>انتخاب فایل</Typography>
                                    </Button>
                                </label>
                        </Grid>
                        <Grid xs={12} sm={6}>
                              <Button variant="raised"
                               onClick = {upload}
                               component="span"
                               className={classes.formButton}
                              >
                              <Typography>آپلود</Typography>
                              </Button>
                        </Grid>
                     </Grid>
                                         
                      
                     <Grid container direction='row-reverse'>
                        <Grid xs={12} sm={6} >
                            {fileName}
                        </Grid>
                        
                        <Grid xs={12} sm={6} >
                            <LinearProgressWithLabel value={progress} fileSize={fileSize}/>
                        </Grid> 
                        
                        {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                            <Alert  onClose={handleClose} severity={alert}>
                              <Typography>{message}</Typography>
                            </Alert>
                        </Snackbar>                       */}
                     </Grid>                               
            </FormControl>     
            
        )
    }
    const [LayerName , setLayerName] = useState(null)
    const [Disaster  , setDisaster] = useState({})
    const handleLayerNameChange = (e)=>{
      setLayerName(e.target.value)
    }
    const handleDisasterChange = (event) => {
      let id = event.target.value
      console.log(id);
      console.log(disaster_list)
      const name = event.target.name;
      for(var i=0;i<disaster_list.length;i++){
        console.log(disaster_list[i].id)
        console.log(id)
        if(disaster_list[i].id==id){

          setDisaster(
            {
              workspace:disaster_list[i].workspace,
              name:disaster_list[i].name,
              workspaceName:`${disaster_list[i].abbreviation}_layers`,
              disaster_id:id
            }
          )
        }
      }
      
      setState({
        ...state,
        [name]: event.target.value,
      })  }
    const disaster_list = useSelector(state => state.import_map.disaster_list)
    const SelectDisaster = ()=>{     
      console.log(Disaster.workspace);
      console.log(disaster_list)
      return (
        <div>
              <FormControl variant="outlined" className={classes.SelectDisaster}>        
                <InputLabel htmlFor="outlined-age-native-simple" ><Typography>مخاطره طبیعی</Typography></InputLabel>
                <Select
                native
                value={state.disaster}
                onChange={handleDisasterChange}
                label= 'aaaaaaaaaaaaa'
                className={classes.selectFont}
                inputProps={{
                    name: 'disaster',
                    id: 'outlined-age-native-simple',
                }}
                >
                <option aria-label="None" value="" />
                {disaster_list.map(
                  (item)=>{
                    return (
                      <option value={item.id}
                        className={classes.selectFont}>{item.name}</option>
                    )
                  }
                )}
                </Select>
              </FormControl>
        </div>      
      )
    }  
    return ( 
            <form className={classes.form} noValidate>
                <Grid container spacing={2} direction='row-reverse' className={classes.formContainer}>
                    <Grid xs={12} sm={1} className={classes.formContainer}>
                        <Typography className={classes.formLable}>نام نقشه</Typography>
                    </Grid>
                    <Grid xs={12} sm={11} className={classes.formContainer}>
                        {radiovalue === 'select' ? <DisabledTextField
                            defaultValue='some default value'
                            disabled
                            autoComplete="fname"                           
                            name="firstName"
                            variant="outlined"
                            fullWidth
                            id="firstName"         /> : <StyledTextField
                            autoComplete="fname"                           
                            name="firstName"
                            variant="outlined"
                            fullWidth
                            id="firstName"  
                            value = {LayerName}
                            onChange = {e=>handleLayerNameChange(e)}               
                          />  }
                        
                    </Grid>
                    {/* DisabledSelectForm */}
                    <Grid xs={12} sm={1} className={classes.formContainer}>
                        <Typography className={classes.formLable}>نام نقشه</Typography>
                    </Grid>
                    <Grid xs={12} sm={11} className={classes.formContainer}>
                        <Box >
                          {radiovalue === 'select' ? <DisabledTextField
                            defaultValue='some default value'
                            disabled
                            autoComplete="fname"                           
                            name="firstName"
                            variant="outlined"
                            fullWidth
                            id="firstName"         /> : <SelectDisaster /> }
                        </Box>  
                      
                    </Grid>               
                    <Grid xs={12} sm={1}  className={classes.formContainerRadiobottomLable}>                             
                        <Typography className={classes.formLable}>نام نقشه</Typography>
                    </Grid>
                    <Grid xs={12} sm={2} className={classes.formContainerRadiobottom}>
                        <RadioGroup className={classes.FormRadioBottom}  aria-label="gender" name="gender1" value={radiovalue} onChange={handleChange}>
                                    <FormControlLabel value="select" control={<Radio />} label="انتخاب از سطوح سیستم" />
                                    <FormControlLabel value="import" control={<Radio />} label="اضافه کردن لایه مکانی" />
                        </RadioGroup>
                    </Grid>      
                    <Grid xs={12} sm={9} className={classes.formContainerRadiobottom}>    
                        <Box >
                          {radiovalue === 'select' ? <SelectLayer/> : <ImportLayer layer_name={LayerName}
                           disaster={Disaster.workspace} 
                           disaster_name = {Disaster.name}
                           disaster_id = {Disaster.disaster_id}
                           workspaceName= {Disaster.workspaceName} />
                            }
                        </Box>     
                    </Grid>   
                    <Grid xs={12} sm={12} className={classes.formContainerRadiobottom}>
                            <Alert variant={alertVariant}  severity={alert}>
                              <Typography>{message}</Typography>
                            </Alert>                
                    </Grid>                                              
                </Grid>         
            </form>
    )
}


export default Import_Layer
