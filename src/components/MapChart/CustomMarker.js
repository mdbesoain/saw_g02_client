import React from 'react';
import Marker from 'react-leaflet-enhanced-marker'
import CustomModal from 'components/CustomModal/Index';
//import { UserContext } from "../../contexts/User"
import ReactDOM from "react-dom";
import img from '../../assets/location.svg';
export default function CustomMarker(props) {
    //const [ dispatch ] = React.useContext(UserContext)

    const handleClick = () =>{
        console.log(props.airport);
        ReactDOM.render(
            <CustomModal airport={props.airport} open={true}/>,
            document.getElementById("modal")
          );   
    }

    return (
        <Marker eventHandlers={{ click:  handleClick }} position={[props.airport.latitude, props.airport.longitude]} key={props.airport.id} style={{height:'25', width:'25'}} icon={<img src={img} style={{width:'25'}} />} />
    )


}
