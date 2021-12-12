import Applayout from './components/layouts/Applayout'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import { BrowserRouter, Switch , Route , Router } from 'react-router-dom';
import SignIn from './components/authentication/login'
import SignUp from './components/authentication/signup'
import Activate from './components/authentication/Activate'
import ResetPassword from './components/authentication/ResetPassword'
import ResetPasswordConfirm from './components/authentication/ResetPassword'
import React , {useEffect} from 'react'
import {CHECK_AUTHENTICATED_WATCH,USER_LOADED_REQUEST} from './redux/Authentication/types'
import {useSelector,useDispatch} from 'react-redux'
import {createBrowserHistory } from 'history';
import BlankPage from './components/main/BlankPage';
import Import_map from './components/main/import_map/Import_map';
import Draw_map from './components/main/Draw_map/Draw_map';

 
function App() {
  const history = createBrowserHistory(); 
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({type:CHECK_AUTHENTICATED_WATCH})
  }, [])


  return (
    <ThemeProvider theme={theme}>
        <div>
          <BrowserRouter>     
              <Switch>
                <Route path= '/import_map' exact>
                  <Applayout><Import_map page_name='افزودن نقشه'/></Applayout>
                </Route>
                <Route path= '/draw_map' exact>
                  <Applayout><Draw_map page_name='ترسیم نقشه'/></Applayout>
                </Route>
                <Route path= '/' exact>
                  <Applayout><BlankPage page_name='خانه'/></Applayout>
                </Route>
                <Route path='/login' exact  component={SignIn}></Route>        
                <Route path='/signup' exact component={SignUp}></Route> 
                <Route path='/activate/:uid/:token' exact component={Activate}></Route> 
                <Route path='/reset-password' exact component={ResetPassword}></Route> 
                <Route path='/password/reset_confirm/:uid/:token' exact component={ResetPasswordConfirm}></Route> 
              </Switch>                            
          </BrowserRouter>         
        </div>
    </ThemeProvider> 
  );
}

export default App


