import { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import PropTypes from 'prop-types';

const ModalPage = ({action, buttonName, content}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="outline-danger" className="m-1" onClick={handleShow}>
                {buttonName}
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>{content}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={action}>
                        {buttonName}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

ModalPage.propTypes = {
    action: PropTypes.func.isRequired,
    buttonName: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
}

export default ModalPage;