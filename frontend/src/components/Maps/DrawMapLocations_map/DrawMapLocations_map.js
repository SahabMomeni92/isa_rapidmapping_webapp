import React, { useState, useRef, useEffect } from 'react';
import layer from 'ol/layer'
import Map from 'ol/Map'
import View from 'ol/View'
import OSM ,{ATTRIBUTION} from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import Projection from 'ol/proj/Projection'
import useStyles from './styles'
import BingMaps from 'ol/source/BingMaps';
import TileWMS from 'ol/source/TileWMS';
import {useDispatch, useSelector} from 'react-redux'
import ImageWMS from 'ol/source/ImageWMS';
import ImageLayer from 'ol/layer/Image';
import {FullScreen,OverviewMap, defaults as defaultControls} from 'ol/control';
import { GET_WMSCapabilities_RESET, GET_WMSCapabilities_WATCH } from '../../../redux/WebGIS/types';
import {getCenter} from 'ol/extent'
import ZoomToExtent from 'ol/control/ZoomToExtent';
import { Box } from '@material-ui/core';




const DrawMapLocations_map = (props) => {
    const dispatch = useDispatch()
    const geoserver_base_url = process.env.REACT_APP_GEOSERVER_BASE_URL
    const classes = useStyles()
    const [ map, setMap ] = useState()
    const [ featuresLayer, setFeaturesLayer ] = useState()
    const [ selectedCoord , setSelectedCoord ] = useState()
    const mapElement = React.useRef()
    const layer_infromations = useSelector(state => state.import_map.layer_informations)
    const layer_extent = useSelector(state => state.webgis.WMS_boundingBox)
    const [isExtentLoaded,setIsExtentLoaded] = useState(false)

    useEffect(() => {
      dispatch({type:GET_WMSCapabilities_WATCH,payload:[layer_infromations.workspace_name,layer_infromations.system_name]})     
      setIsExtentLoaded(true)
    }, [])
    useEffect( () => {  
      // create and add vector source layer
      const initalFeaturesLayer = new ImageLayer({
        source: new ImageWMS()
      })
      // create map
      if(isExtentLoaded && layer_extent){
        const initialMap = new Map({
          target: mapElement.current,
          layers : [
            new TileLayer({
              visible:false,
              source: new XYZ({
                url: 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}'
              })
            }),
            new TileLayer({
              preload: Infinity,
              visible:true,
              source: new BingMaps({
                key: 'ArZfElosT3_4dDa3poGyONziO_X6_-qzrADW7lU3Rn3-3_t1a6PPyJgMX-pBF4CJ',
                imagerySet: 'Aerial',
                // use maxZoom 19 to see stretched tiles instead of the BingMaps
                // "no photos at this zoom level" tiles
                // maxZoom: 19
              }),
            }),
            new TileLayer({
              source: new TileWMS({
                url:`${geoserver_base_url}wms`,
                // params: {'LAYERS':`${layer_infromations.workspace_name}:${layer_infromations.system_name}`,'STYLES ':'flood_layer',
                // },
                params: {'LAYERS':`${layer_infromations.workspace_name}:${layer_infromations.system_name}`,'STYLES':'	flood_style'
                },
                serverType: 'geoserver',
                // Countries have transparency, so do not fade tiles:
                transition: 0,
                crossOrigin:'anonymous',
                projection:'EPSG:4326'
  
              }),
              extent:layer_extent
            }),
            new TileLayer({
              source: new TileWMS({
                url:`${geoserver_base_url}wms`,
                // params: {'LAYERS':`${layer_infromations.workspace_name}:${layer_infromations.system_name}`,'STYLES ':'flood_layer',
                // },
                params: {'LAYERS':'	basic_layers:gis_osm_places_free_1'
                },
                serverType: 'geoserver',
                // Countries have transparency, so do not fade tiles:
                transition: 0,
                crossOrigin:'anonymous',
                projection:'EPSG:4326'
  
              }),
              extent:layer_extent
            })
          ],
          view: new View({
            center: getCenter(layer_extent),
            // zoom:   ZoomToExtent(layer_extent),
            zoom:12,
            projection:'EPSG:4326'
          }),
          // controls: defaultControls().extend([
          //   new OverviewMap({
          //     source: 'fullscreen',
          //   })]),
          projection: new Projection("EPSG:4326"),
          // controls: defaultControls().extend([
          //   new ZoomToExtent({
          //     extent:layer_extent,
          //   }),
          // ]),
         controls:[]

        })
        initialMap.getView().fit(layer_extent)
        // save map and vector layer references to state
        console.log(initialMap);
        setMap(initialMap)
        setFeaturesLayer(initalFeaturesLayer)
      }
      
  
    },[layer_extent])
    return (
        
        <div ref={mapElement} className = {classes.mapContainer}>
            
        </div>
          )
}

export default DrawMapLocations_map
