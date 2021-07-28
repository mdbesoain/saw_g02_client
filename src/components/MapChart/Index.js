import React from 'react';

import {MapContainer, TileLayer} from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import CustomMarker from './CustomMarker';



export default function MapChart(props) {

    const position = [-34.9780,-71.25];
 

    const markers = () =>{
          return (<MarkerClusterGroup>
            {
                props.airports.map( (airport, key) =>{
                  return <CustomMarker  airport={airport} key={key} clickFunction={props.clickFunction}/>
                })
            }
            </MarkerClusterGroup>
          )
        }
    
    return (
      <MapContainer
          center={position}
          zoom= {2}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "80vh" }}
          preferCanvas={true}
          >
          <TileLayer
          url="https://api.mapbox.com/styles/v1/mdbesoain/ckrm7z4gp1xx117pi7rmpexua/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWRiZXNvYWluIiwiYSI6ImNrcm03eDQ0OTdyZXozMWwzc3BiZXJrNjkifQ.PnonQavauOJ7keXNqoA_EA"
          attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>"
        />
          {markers()}
      </MapContainer>
    )
}
