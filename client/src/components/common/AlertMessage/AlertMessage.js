import { Alert } from "react-bootstrap";

const AlertMessage = ({variant, alertTitle, alertContent, action}) => {
    return (
    <Alert className="position-fixed top-20 z-2" variant={variant} onClose={action} dismissible>
        <Alert.Heading>{alertTitle}</Alert.Heading>
        <p>{alertContent}</p>
    </Alert>
    );
}

export default AlertMessage;