import React , {useEffect}from 'react'
import Topnav from '../containers/topnavbar/Topnav'
import Rightsidebar from '../containers/sidebar/Rightsidebar'
import Footer from '../containers/footer/Footer'
import Maincontainer from '../main/Maincontainer'
import useStyles from './style'
import {Box} from '@material-ui/core'
import {connect} from 'react-redux'
import {USER_LOADED_REQUEST,CHECK_AUTHENTICATED_WATCH} from '../../redux/Authentication/types'
import {useSelector,useDispatch} from 'react-redux'
import { BrowserRouter, Switch , Route , Redirect } from 'react-router-dom';


const Applayout = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    useEffect( () => {
        dispatch({type:USER_LOADED_REQUEST})
        }, [])
    const is_authenticated = useSelector(state => state.auth.isAuthenticated)
    console.log(props)
    if  (is_authenticated == false){
            console.log(props.is_authenticated);
            return <Redirect to = {'login/'} />
        }
    return (
        <Box className={classes.app_container} flex>
            <Topnav></Topnav>
            <Rightsidebar  ></Rightsidebar>
            <Maincontainer >
                {props.children}
            </Maincontainer>   
            {/* <Footer></Footer> */}
        </Box>
    )
    }

export default Applayout
