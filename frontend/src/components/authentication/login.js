import React , {useState,useEffect} from 'react';
import {Link  , Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import * as actions from '../../redux/Authentication/types'
import {login_api} from '../../api/api_authentication'

const CssTextField = withStyles({
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

const useStyles = makeStyles((theme) => ({
    container:{
    background:theme.palette.primary.main
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border:'1px solid black',
    padding:'1rem'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontFamily:'Yekan'
  },
  formErrorMessage:{
    fontFamily:'Yekan',
    marginRight: theme.spacing(3, 0, 2),
    color:'red',

  }
}));

const SignIn = (props)=> {
  
  const classes = useStyles();
  const [formErrorMessage,setformErrorMessage] = useState(null)
  const [formData, setformData] = useState({email:null,password:null})
  const {email,password} = formData
  const handleChange = (e)=>{
    setformData({...formData,[e.target.name]:e.target.value})
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    if (formData.email === null && formData.password === null){
      setformErrorMessage('ایمیل و رمز عبور اجاری است.')
      return
    }
    if (formData.email === null ){
      setformErrorMessage('ایمیل  اجاری است.')
      return
    }
    if (formData.password === null ){
      setformErrorMessage('رمز عبور اجاری است.')
      return
    }
    else{
       props.register(formData)
    }
  }
  if (props.is_athenticated){    
    return (<Redirect to={'/'}/>)
  }  
  return (
    <Container component="main" maxWidth="xs" >
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          صفحه ورود
        </Typography>
        <form className={classes.form} noValidate>
          <CssTextField 
            variant="outlined"
            margin="normal"           
            fullWidth
            id="email"
            label={<Typography > آدرس ایمیل *</Typography>}
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event)=>handleChange(event)}
          />
          <CssTextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label={<Typography> رمز عبور *</Typography>}
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            onChange={(event)=>handleChange(event)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="secondary"  />}
            label={<Typography>مرا به خاطر بسپار</Typography>}
          />
          <Typography className={classes.formErrorMessage}>{formErrorMessage}</Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {event=>handleSubmit(event)}
          >
            ورود
          </Button>   
          <Grid container>
            <Grid item xs>
              <Link to={'/reset-password'} variant="body2" color='inherit' style={{textDecoration:'none'}}>
                فراموشی رمز عبور
              </Link>
            </Grid>
            <Grid item>
              <Link to={'/signup'} variant="body2" color='inherit' style={{textDecoration:'none'}}> 
                {"ایجاد اکانت"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
  }

const mapDispatchToProps = dispatch => {
  return {
    remindMeStatus: () => dispatch({type:actions.REMIND_ME,payload:false}),
    register:       (formData) => dispatch({type:actions.LOGIN_REQUEST,payload:formData})
}}

const mapStateToProps = state=>{
    return {
    is_athenticated:state.auth.isAuthenticated  
}}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn)