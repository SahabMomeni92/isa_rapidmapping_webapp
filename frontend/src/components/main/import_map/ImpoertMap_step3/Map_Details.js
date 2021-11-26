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
import Map_card from '../../../cards/Map_card';
import BoundrayDetails_Map from '../../../Maps/GeospatialDetails_Map/BoundrayDetails_Map';
import RasterDetails_Map from '../../../Maps/GeospatialDetails_Map/RasterDetails_Map';

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
const Map_Details = (props) => {
    const dispatch = useDispatch()
    const map_image = React.useRef()
    const inputFile = React.useRef()
    const [fileName,setfileName] = React.useState('انتخاب فایل نقشه');
    const [inputImage,setinputImage] = useState(undefined);
    const [imageUpload,setImageUpload] = useState(false) 
    const [alert,setAlert] = React.useState('info');
    const [alertVariant,setAlertVariant] = React.useState('outlined');
    const [message, setMessage] = useState("لطفاً یک فایل رستر معتبر وارد کنید");  
    const mapDate_ref = React.useRef()
    // import map state
    const [map_title,setMap_title] = React.useState(''); 
    const [map_date,setMap_date] = React.useState(''); 
    const [map_description,setMap_description] =  React.useState(''); 
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    
    // console.log(props);
    const handleSelectFile = (event) => {
      console.log(fileName)
      let file_name = event.target.value
      // console.log(file_name)
      var filename = file_name.replace(/^.*[\\\/]/, '')
      setfileName(filename)
      
      setSelectedFiles(event.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload = e => {
        console.log(reader.result);
        setinputImage(reader.result)
        setImageUpload(true)
        }; 
      };
    const handleDateChange = (e)=>{
        if(e.mounth){
            console.log(`${e.year}-${e.mounth.number}-${e.day}`)
            setMap_date(`${e.year}-${e.mounth.number}-${e.day}`)
        }     

    };
    const handleTitleChange = (e)=>{
        console.log(e.target.value);
        setMap_title(e.target.value)
    };
    const handleDescriptionChange = (e)=>{
        console.log(e.target.value);
        setMap_description(e.target.value)
    };
    const classes = useStyles()
    const layer_informations = useSelector(state => state.import_map.layer_informations) 
    const user = useSelector(state => state.auth.user)
    const handleMapUpload = (e)=>{      
        const formData = new FormData();
        formData.append('disaster',layer_informations.disaster_id)
        formData.append('title',map_title)
        formData.append('author',`${user.first_name} ${user.last_name}`)
        formData.append('date',mapDate_ref.current.children[0].value.replace("/", "-").replace("/","-"))
        formData.append('description',map_description)
        formData.append('tiff_file',layer_informations.layer_id)
        formData.append('img_file',selectedFiles)
        importMap_api(formData)
        .then(resp=>{
            dispatch({type:MAP_IMPORT_SUCCESS,payload:resp.data.id})
            setMessage('نقشه با موفقیت اضافه شد');
            setAlert('success')
            setAlertVariant('filled')
        })
        .catch(err=>{
            dispatch({type:MAP_IMPORT_FAIL})
            console.log(err)
            setMessage('فرایند اضافه کردن نقشه موفقیت آمیز نبود');
            setAlert('error')
            setAlertVariant('filled')
        })
    }
    if(imageUpload){
        console.log(inputImage);
    }
    return (
        <Box className={classes.layerInfo}>
            <Grid container direction='row-reverse' spacing={1} >
                    <Grid xs={12} sm={6} item >
                            <Map_card/>
                    </Grid>  
                    <Grid xs={12} sm={6} item container direction='row-reverse' spacing={1}>
                        <Grid xs={12} sm={12} item style={{marginRight:'0.5rem'}}>
                                <BoundrayDetails_Map/>
                        </Grid>      
                        <Grid xs={12} sm={12} item style={{marginRight:'0.5rem'}}>
                                <RasterDetails_Map/>
                        </Grid>  
                    </Grid>                                              
            </Grid>         
        </Box>
    )
}


export default Map_Details

