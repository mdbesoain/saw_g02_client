import React , { useState }from 'react';
import ReactDOM from "react-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CustomTabs from 'components/CustomTabs/CustomTabs';


export default function CustomModal(props) {


    const [modal, setModal] = useState(true);
    const toggle = () => {
        setModal(!modal);
    };
     const handleClosing = () =>{
        ReactDOM.render(
            <></>,
            document.getElementById("modal")
          );  
    }
     

    return ( 

        <Modal isOpen={modal} toggle={toggle} onClosed={handleClosing}>
        <ModalHeader toggle={toggle}>{props.airport.name}</ModalHeader>
        <ModalBody>
        <CustomTabs airport={props.airport} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Mas Detalles</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cerrar</Button>
        </ModalFooter>
        </Modal>  
         
        
        )
    
}
 