import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ButtonBase, Divider, Grid } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import { blue } from '@material-ui/core/colors';
import BoundrayDetails_Map from '../Maps/GeospatialDetails_Map/BoundrayDetails_Map';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth:'100%',
      border:'1px solid grey',
    },
    Header:{
      textAlign:'center'
    },
    media: {
      height: 0,
      paddingTop: '70.25%',
      border:'0.25px solid black' ,
      margin:'0.5rem'
    },
    cardContentText:{
        textAlign:'right',
        direction:'rtl'
    },
    CardActions:{
        textAlign:'right',
        direction:'rtl',
        margin:'0.5rem',
        display:'flex'
    },
  }));
const Map_card = (props) => {
  const classes = useStyles();
  console.log(props)
//   const reader = new FileReader();
//   const [inputImage,setinputImage] = useState(null)
//   reader.readAsDataURL(props.image)
//   reader.onload = e => {
//   console.log(reader.result);
//   setinputImage(reader.result)
//         };   
  return (
            <Card className={classes.root}>
            <CardHeader
                className={classes.Header}
                // avatar={
                //     <Typography>اضافه شده توسط : سحاب مومنی</Typography>
                // }
                // action={
                // <IconButton aria-label="settings">
                //     <MoreVertIcon />
                // </IconButton>
                // }
                title={<Typography>{props.title}</Typography>}
                // subheader={<Typography>تاریخ وقوع: 4-07-1400</Typography>}
            />
            <CardMedia
                className={classes.media}
                // image={props.image}
                image="/images/floodmap.jpg"
                title={props.title}
            />
            <CardContent>
                <Typography  component="p" className={classes.cardContentText} >
                {props.description}
                </Typography>
            </CardContent>
            {/* <Divider style={{margin:'0.5rem'}}></Divider> */}
            <CardActions className={classes.CardActions}>
                <Grid container direction='row' spacing={1} >
                        <Grid xs={12} sm={3} item wrap='wrap'>
                            <div >
                                <Typography  className={classes.cardContentText} >
                                    تاریخ وقوع: {props.date}
                                </Typography>
                            </div>
                            <div >
                                <Typography   className={classes.cardContentText} >
                                    نام مخاطره: {props.disasterName}
                                </Typography>
                            </div>
                            <div >
                                <Typography  className={classes.cardContentText}>اضافه شده توسط : {props.author}</Typography>
                            </div>                       
                        </Grid>   
                        <Grid xs={12} sm={9} item >     
                                {/* <BoundrayDetails_Map/> */}
                                <div style={{width:'100%',height:'300px',border:'1px solid black'}}>
                                    <BoundrayDetails_Map/>
                                </div>
                        </Grid>                   
                                  
                </Grid>                
            </CardActions>
            <Divider/>
            <CardActions className={classes.CardActions} > 

                                <ButtonBase style={{flexBasis:'50%'}}>
                                            <Typography>دانلود تصویر نقشه</Typography>                                
                                            <GetAppIcon style={{ color: blue[500] }} />                                            
                                </ButtonBase>

                                <ButtonBase style={{flexBasis:'50%'}}>
                                            
                                            <Typography>دانلود فایل رستری نقشه</Typography>
                                            <GetAppIcon style={{ color: blue[500] }} />
                                            
                                </ButtonBase>   

            </CardActions>

            </Card>
    )
}

export default Map_card