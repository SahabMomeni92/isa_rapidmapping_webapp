import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme=>(
    {
        layerInfo:{
            // background:'red',
            width:'100%',
            // height:'400px',
            // margin:'0.5rem'
        },
        root:{
            width:'100%',
            // direction:'rtl !important',
            margin:'0.5rem'
        },
        formControl: {
            margin:'0.5rem',
          },  
        formLable:{
            direction:'rtl',
            color:'black',
            fontSize:'1rem',
            fontWeight:'bold',
            marginTop:'1rem'
        },
        LayerInfo_Map:{
            width:'100%',
            height:'500px'
        },
        mapInfo_container:{
            border:'1px solid black',
            borderRadius:'1rem',
            height:'100%',
        },
        DatePickerContainer:{
            width:'100%',
            // background:'red'
        },
        DatePicker:{
            width:'100% !important',
            height:theme.overrides.MuiTextField.root.height,
            textAlign:'right'
        },
        ImageInput:{
            width:'100%',

        },
        formButton:{
            width:'100%',
            border:'1px solid black'
        },
        mapUpload_Btn:{
            width:'100%',
            fontFamily:'yekan',
            margin:'1rem 0'
        }
    }
))

export default useStyles