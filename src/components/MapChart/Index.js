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
                  return <CustomMarker  airport={airport} key={key}/>
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
          style={{ width: "100%", height: "100vh" }}
          preferCanvas={true}
          >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers()}
      </MapContainer>
    )
}
