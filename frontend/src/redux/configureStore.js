import {createStore,combineReducers,applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas'
import {initState as SideMenuInitState , rootReducer as SideMenuReducer}  from './SidebarMenu/reducers'
import {initState as AuthInitState , rootReducer as AuthReducer}  from './Authentication/reducers'
import {initState as ImpoertMapInitState , rootReducer as ImportMapReducer}  from './ImportMap/reducers'
import {initState as WebGISInitState , rootReducer as WebGISReducer}  from './WebGIS/reducers'
import {initState as DrawMapInitState , rootReducer as DrawMapReducer}  from './DrawMap/reducers'
// const Middleware = [thunk]
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const ConfigStore = ()=>{
    const store = createStore(combineReducers({
        sidemenu:SideMenuReducer,
        auth:AuthReducer,
        import_map:ImportMapReducer,
        webgis:WebGISReducer,
        draw_map:DrawMapReducer,
    }),
    {
        sidemenu:SideMenuInitState,
        auth:AuthInitState,
        import_map:ImpoertMapInitState,
        webgis:WebGISInitState,
        draw_map:DrawMapInitState,
    },
    composeWithDevTools(applyMiddleware(...middlewares)) 
    ) 
    sagaMiddleware.run(rootSaga);   
    return store
}

export default ConfigStore