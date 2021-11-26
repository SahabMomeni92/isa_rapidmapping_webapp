import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontFamily:'Yekan'
  },
}));

export default function SignUp() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          صفحه ثبت نام
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CssTextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label={<Typography>نام*</Typography>}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CssTextField
                variant="outlined"
                
                fullWidth
                id="lastName"
                label={<Typography>نام خانوادگی*</Typography>}
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                variant="outlined"
                fullWidth
                id="email"
                label={<Typography>آدرس ایمیل*</Typography>}
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                variant="outlined"
                fullWidth
                name="password"
                label={<Typography>رمز عبور*</Typography>}
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
             ثبت اطلاعات
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                اکانت دارید؟ وارد بشوید
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}