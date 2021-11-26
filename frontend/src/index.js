import React ,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import configStore from './redux/configureStore'
import './assest/css/bootstrap.min.css'
import './assest/css/bootstrap.rtl.only.min.css'
import './assest/css/app-rtl.css'
ReactDOM.render(
  
  <Provider store={configStore()}>
   
        <App />
      
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

