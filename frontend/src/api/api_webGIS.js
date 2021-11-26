import axios from 'axios'
import WMSCapabilities from 'ol/format/WMSCapabilities';
const geoserver_base_url = process.env.REACT_APP_GEOSERVER_BASE_URL


export const getWMS_BoundingBox = async(workspaceName,LayerName)=>{
    console.log(workspaceName)
    console.log(LayerName)
    const parser = new WMSCapabilities()
    const response = await axios.get(`${geoserver_base_url}wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities`)
    .then(resp=>{
        console.log(resp)
        var result = parser.read(resp.data);
        console.log(result)
        console.log(result.Capability.Layer.Layer)
        console.log(result.Capability.Layer)
        var extent = result.Capability.Layer.Layer.find(l => l.Name === `${workspaceName}:${LayerName}`).EX_GeographicBoundingBox;
        console.log(extent)
        return extent
    })
    .catch(err=>err)
    console.log(response)    
    return response
}

