import React from 'react';
import { Marker, Popup} from 'react-leaflet'



export default function CustomMarker(props) {

    const handleClick = () =>{
        console.log( "click on " +props.airport.name);
        //TODO: API WIKIDATA ENTIDAD
    }
    return (
        <Marker eventHandlers={{click: handleClick}} position={[props.airport.latitude, props.airport.longitude]} key={props.airport.id}>
            <Popup >
                {props.airport.name}
            </Popup>
          </Marker>
    )


}
