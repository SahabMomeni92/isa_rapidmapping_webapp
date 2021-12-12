import {Box, Grid, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import React , {useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles'
import { GET_IMPORTEDMAPDETAIS_WATCH } from '../../../../redux/ImportMap/types';
import Map_card from '../../../cards/Map_card';

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
    
    const classes = useStyles()
   
    const importedMap_id = useSelector(state => state.import_map.importedMap_id) 
    const importedMapDetails = useSelector(state => state.import_map.importedMapDetails) 
    useEffect(() => {
      if(importedMap_id){
        dispatch({type:GET_IMPORTEDMAPDETAIS_WATCH,payload:importedMap_id})
      } 
    }, [importedMap_id])
    return (
        <Box className={classes.layerInfo}>
            <Grid container direction='row-reverse' spacing={1} >
                    <Grid xs={12} sm={12} item >
                          {!importedMapDetails ? <div/>:
                          <Map_card
                          title={importedMapDetails.title}
                          description = {importedMapDetails.description}
                          image = {importedMapDetails.img_file}
                          date = {importedMapDetails.date}
                          author = {importedMapDetails.author}
                          // disasterName = {importedMapDetails.disaster}
                          disasterName ='سیلاب'                         
                          />
                          }      
                    </Grid>                                                
            </Grid>         
        </Box>
    )
}


export default Map_Details