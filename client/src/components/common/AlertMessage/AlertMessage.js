import { Alert } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateStatus } from "../../../redux/statusReducer";

const AlertMessage = ({variant, alertTitle, alertContent}) => {
    const [show, setShow] = useState(true);
    const dispatch = useDispatch();

    const closeAlert = () => {
        setShow(false);
        dispatch(updateStatus(null));
    };

    if(show) { 
        return (
        <Alert className="position-fixed w-25 top-20 z-2" variant={variant} onClose={closeAlert} dismissible>
            <Alert.Heading>{alertTitle}</Alert.Heading>
            <p>{alertContent}</p>
        </Alert>
        );
    }
}

export default AlertMessage;