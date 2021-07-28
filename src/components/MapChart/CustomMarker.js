import React from 'react';
import Marker from 'react-leaflet-enhanced-marker'
import {Tooltip} from 'react-leaflet'

//import CustomModal from 'components/CustomModal/Index';
//import { UserContext } from "../../contexts/User"
//import ReactDOM from "react-dom";
import img from '../../assets/location.svg';
export default function CustomMarker(props) {
    //const [ dispatch ] = React.useContext(UserContext)

    
    const handleClick = () =>{
        let win = window.open("/entity/"+props.airport.iata, "_blank");
        win.focus();
    }

    return (
        <Marker  eventHandlers= {{click: handleClick}} position={[props.airport.latitude, props.airport.longitude]} key={props.airport.id} style={{height:'50', width:'25'}} icon={<img src={img} style={{width:'25'}} />} >
            <Tooltip><h6>{props.airport.name}, {props.airport.countryName}</h6> <br/> <small>Haz click para ver mas información</small></Tooltip>
        </Marker>
    )


}
