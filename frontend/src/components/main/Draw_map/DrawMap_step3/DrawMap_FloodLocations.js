import {Box, Grid, TextField,Typography,TextareaAutosize,Button } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import React , {useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles'
import Alert from '@material-ui/lab/Alert';
import DrawMapLocations_map from '../../../Maps/DrawMapLocations_map/DrawMapLocations_map';
import { InsertDrawMap_api } from '../../../../api/api_drawMap';
import { DrawMap_INSERT_SUCCESS, DrawMap_INSERT_FAIL } from '../../../../redux/DrawMap/types';
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
const DrawMap_FloodLocations = (props) => {
  
    
    const classes = useStyles()
    const dispatch = useDispatch()
    const map_image = React.useRef()
    const inputFile = React.useRef()
    const [fileName,setfileName] = React.useState('انتخاب فایل نقشه');
    const [inputImage,setinputImage] = useState(undefined);
    const [imageUpload,setImageUpload] = useState(false) 
    const [alert,setAlert] = React.useState('info');
    const [alertVariant,setAlertVariant] = React.useState('outlined');
    const [message, setMessage] = useState("لطفاً فرم را با دقت تکمیل کنید");  
    const mapDate_ref = React.useRef()
    // import map state
    const [map_title,setMap_title] = React.useState(''); 
    const [map_totalCity,setMap_totalCity] = React.useState(''); 
    const [map_totalVilage,setMap_totalVilage] = React.useState(''); 
    const [map_totalHamlet,setMap_totalHamlet] = React.useState(''); 
    const [map_description,setMap_description] =  React.useState(''); 
    const [pop,setPop] =  React.useState(''); 
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const layer_informations = useSelector(state => state.import_map.layer_informations) 
    const drawMap_data = useSelector(state => state.draw_map.DataInformation) 
    const handleTitleChange = (e)=>{
      
      setMap_title(e.target.value)}
    
    const handleTotalCityChange = (e)=>{
        
        setMap_totalCity(e.target.value)}  
    const handleTotalVilageChange = (e)=>{
        
        setMap_totalVilage(e.target.value)}        
    const handleTotalHamletChange = (e)=>{
        
        setMap_totalHamlet(e.target.value)}        
    const handlePopChange = (e)=>{

        setPop(e.target.value)}  
    const handleDescriptionChange = (e)=>{
      setMap_description(e.target.value)
    }   
    const handleMapUpload = (e)=>{      
      setMessage('لطفاً چند لخظه منتظر بمانید');
      // const formData = new FormData();
      // formData.append('tiff_file',layer_informations.layer_id)
      // formData.append('disaster',layer_informations.disaster_id)
      // formData.append('sat',drawMap_data.LayerSat)
      // formData.append('disaster_date',drawMap_data.DisasterDate)
      // formData.append('proccess_date',drawMap_data.ProccessDate)
      // formData.append('image_date',drawMap_data.ImageDate)
      // formData.append('title',map_title)
      // formData.append('total_city',map_totalCity)
      // formData.append('total_vilage',map_totalVilage)
      // formData.append('total_hamlet',map_totalHamlet)
      // formData.append('total_pop',pop)
      // formData.append('description',map_description)
      // formData.append('system_name',map_description)
      // console.log(formData)
      const formData = {'tiff_file':layer_informations.layer_id,
                  'disaster':layer_informations.disaster_id,
                  'sat':drawMap_data.LayerSat,
                  'disaster_date':drawMap_data.DisasterDate,
                  'proccess_date':drawMap_data.ProccessDate,
                  'image_date':drawMap_data.ImageDate,
                  'title':map_title,
                  'total_city':map_totalVilage,
                  'total_vilage':map_totalVilage,
                  'total_hamlet':map_totalHamlet,
                  'total_pop':pop,
                  'description':map_description,
                  'system_name':`drawMap_${layer_informations.system_name}`
                  }
      InsertDrawMap_api(formData)
      .then(resp=>{
          dispatch({type:DrawMap_INSERT_SUCCESS,payload:resp.data})
          setMessage('اطلاعات با موفقیت وارد سرور شد برای ترسیم نقشه به مرحله بعدی بروید');
          setAlert('success')
          setAlertVariant('filled')
      })
      .catch(err=>{
          dispatch({type:DrawMap_INSERT_FAIL})
          console.log(err)
          setMessage('فرایند اضافه کردن اطلاعات موفقیت آمیز نبود');
          setAlert('error')
          setAlertVariant('filled')
      })
      }
    return (
        <Box className={classes.layerInfo}>
            <Grid container direction='row-reverse' spacing={1} >
                    <Grid xs={12} sm={5} item >   
                      <div className={classes.mapInfo_container}>
                            <Grid xs={12} sm={12} className={classes.formControl}>
                                <Typography className={classes.formLable}>منطقه درگیر سیلاب  </Typography>
                            </Grid>
                            <Grid xs={12} sm={12} className={classes.formControl}>
                                <StyledTextField 
                                    helperText= "مانند: مانند شهرستان کهنوج در استان کرمان"
                                    autoComplete="fname"                           
                                    name="location"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    onChange={e=>handleTitleChange(e)}
                                    id="location"         />
                            </Grid>
                            <Grid xs={12} sm={12} className={classes.formControl}>
                                <Typography className={classes.formLable}>تعداد مناطق شهری درگیر سیلاب  </Typography>
                            </Grid>
                            <Grid xs={12} sm={12} className={classes.formControl}>
                                <StyledTextField 
                                    
                                    autoComplete="fname"                           
                                    name="location"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    onChange={e=>handleTotalCityChange(e)}
                                    id="location"         />
                            </Grid>
                            <Grid xs={12} sm={12} className={classes.formControl}>
                                <Typography className={classes.formLable}>تعداد مناطق روستایی درگیر سیلاب  </Typography>
                            </Grid>
                            <Grid xs={12} sm={12} className={classes.formControl}>
                                <StyledTextField 
                                    
                                    autoComplete="fname"                           
                                    name="location"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    onChange={e=>handleTotalVilageChange(e)}
                                    id="location"         />
                            </Grid>
                            <Grid xs={12} sm={12} className={classes.formControl}>
                                <Typography className={classes.formLable}>تعداد دهکده های  درگیر سیلاب  </Typography>
                            </Grid>
                            <Grid xs={12} sm={12} className={classes.formControl}>
                                <StyledTextField 
                                    
                                    autoComplete="fname"                           
                                    name="location"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    onChange={e=>handleTotalHamletChange(e)}
                                    id="location"         />
                            </Grid>
                            <Grid xs={12} sm={12} className={classes.formControl}>
                                <Typography className={classes.formLable}>تخمین میزان جمعیت درگیر سیلاب</Typography>
                            </Grid>
                            <Grid xs={12} sm={12} className={classes.formControl}>
                                <StyledTextField 
                                    
                                    autoComplete="fname"                           
                                    name="location"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    onChange={e=>handlePopChange(e)}
                                    id="location"         />
                            </Grid>
                            <Grid xs={12} sm={12} className={classes.formControl}>
                                <Typography className={classes.formLable}>توضیحات نقشه</Typography>
                            </Grid>
                            <Grid xs={12} sm={12} className={classes.formControl}>
                            <TextareaAutosize
                                aria-label="textarea"
                                minRows={2}
                                required
                                placeholder="برای مثال: این نقشه پهنه های سیلابی شهرستان های توابع کهنوج در استان کرمان را نشان می دهد که در تاریخ 4 مهر 1400 به وقوع پیوسته است. بر اساس این سیلاب 5 شهرستان و 3 روستا را درگیر کرده است و به جاده های مواصلاتی شهرستان کهنوج آسیب رسانتدخه استو."
                                onChange={e=>handleDescriptionChange(e)}
                                style={{ width: '100%', direction:'rtl' }}
                            />
                            
                            </Grid> 
                      </div>
                    </Grid>    
                    <Grid xs={12} sm={7} item >   
                      <Box className={classes.mapInfo_container} display='flex' flexDirection='column'>
                          <DrawMapLocations_map style={{flexBasis:'100%'}}/>
                      </Box>
                    </Grid>   
                    <Grid xs={12} sm={12} item >   
                        <Box style={{display:'flex',border:'1px solid black'}}>
                              <div  className={classes.dot_Containter}>
                                <Typography className={classes.dot_paragraph}>مناطق شهری</Typography>
                                <span style={{backgroundColor:'red'}} className={classes.dot}/>
                              </div>
                              <div  className={classes.dot_Containter}>
                                <Typography className={classes.dot_paragraph}>مناطق روستایی</Typography>
                                <span style={{backgroundColor:'green'}} className={classes.dot}/>
                              </div>
                              <div  className={classes.dot_Containter}>
                                <Typography className={classes.dot_paragraph}> دهکده ها</Typography>
                                <span style={{backgroundColor:'white'}} className={classes.dot}/>
                              </div>
                              <div className={classes.dot_Containter}>
                                  <Typography className={classes.dot_paragraph}>راهنما:</Typography>
                              </div>
                        </Box> 
                    </Grid>
                    <Grid xs={12} sm={12} item>        
                            <Alert variant={alertVariant}  severity={alert} >
                              <Typography>{message}</Typography>
                            </Alert>  
                        </Grid>  
                    <Grid xs={12} sm={12} item>        
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.mapUpload_Btn}
                                onClick = {event=>handleMapUpload(event)}
                            >
                                آپلود نقشه
                            </Button>  
                        </Grid>
                          
                                                                   
            </Grid>         
        </Box>
    )
}


export default DrawMap_FloodLocations