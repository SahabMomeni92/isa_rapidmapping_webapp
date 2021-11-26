import React from 'react';
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
import { ButtonBase, Divider } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import { blue } from '@material-ui/core/colors';
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
        disply:'flex',
        margin:'0.5rem'
    },
  }));
const Map_card = () => {
    const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
                title={<Typography>نقشه سیلاب شهرستان کهنوج در استان کرمان در تاریخ 4 مهر 1400</Typography>}
                // subheader={<Typography>تاریخ وقوع: 4-07-1400</Typography>}
            />
            <CardMedia
                className={classes.media}
                image="/images/floodmap.jpg"
                title="Paella dish"
            />
            <CardContent>
                <Typography  component="p" className={classes.cardContentText} >
                در مهر ماه سال 1400 بارش های رگباری ایران وجب وقوع سیلاب گسترده در سطح کشور شد. این نقشه ،سیلاب شهرستان کهنوج در استان کرمان به تاریخ 4 مهر 1400 را نشان می دهد بر اساس اطلاعات آماری در این سیلاب 3 خانه تخریب و 3 کیلومتر از راه های مواصلاتی به زیر آب فرو رفته اند.
                </Typography>
            </CardContent>
            {/* <Divider style={{margin:'0.5rem'}}></Divider> */}
            <CardActions className={classes.CardActions}>
                <div style={{flexBasis:'33.33%'}}>
                    <Typography  className={classes.cardContentText} >
                        تاریخ وقوع: 4 مهر 1400
                    </Typography>
                </div>
                <div style={{flexBasis:'33.33%'}}>
                    <Typography   className={classes.cardContentText} >
                        نام مخاطره: سیلاب
                    </Typography>
                </div>
                <div style={{flexBasis:'33.33%'}}>
                    <Typography color="textSecondary"  className={classes.cardContentText}>اضافه شده توسط : سحاب مومنی</Typography>
                </div>       
            </CardActions>
            <Divider style={{margin:'0.5rem'}}></Divider>
            <CardActions className={classes.CardActions}>
                <ButtonBase style={{flexBasis:'50%'}}>
                    <Typography>دانلود تصویر نقشه</Typography>
                    <IconButton aria-label="add to favorites">
                    <GetAppIcon style={{ color: blue[500] }} />
                    </IconButton>
                </ButtonBase>
                <ButtonBase style={{flexBasis:'50%'}}>
                    <IconButton aria-label="share">
                    <Typography>دانلود فایل رستری نقشه</Typography>
                    <GetAppIcon style={{ color: blue[500] }} />
                    </IconButton>
                </ButtonBase>
            </CardActions>
      
            {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                    minutes.
                </Typography>
                <Typography paragraph>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                    heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                    browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                    and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                    pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                </Typography>
                <Typography paragraph>
                    Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                    without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                    medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                    again without stirring, until mussels have opened and rice is just tender, 5 to 7
                    minutes more. (Discard any mussels that don’t open.)
                </Typography>
                <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                </Typography>
                </CardContent>
            </Collapse> */}
            </Card>
    )
}

export default Map_card
