import { Alert } from "react-bootstrap";
import { useState } from "react";

const AlertMessage = ({variant, alertTitle, alertContent, action}) => {
    const [show, setShow] = useState(true);
    if(show) { 
        return (
        <Alert className="position-fixed top-20 z-2" variant={variant} onClose={action} dismissible>
            <Alert.Heading>{alertTitle}</Alert.Heading>
            <p>{alertContent}</p>
        </Alert>
        );
    }
}

export default AlertMessage;