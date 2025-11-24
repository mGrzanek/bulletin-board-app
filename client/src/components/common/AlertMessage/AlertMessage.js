import { Alert, Col } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus, getStatus } from "../../../redux/statusReducer";

const AlertMessage = ({variant, alertTitle, alertContent}) => {
    const [show, setShow] = useState(true);
    const status = useSelector(getStatus);
    const dispatch = useDispatch();

    const closeAlert = () => {
        setShow(false);
        if(status !== "offline") dispatch(updateStatus(null));
    };

    if(show) { 
        return (
            <Col className="d-flex justify-content-center">
                <Alert className="position-fixed top-10 z-2" variant={variant} onClose={closeAlert} dismissible>
                    <Alert.Heading>{alertTitle}</Alert.Heading>
                    <p>{alertContent}</p>
                </Alert>
            </Col>
        );
    }
}

export default AlertMessage;