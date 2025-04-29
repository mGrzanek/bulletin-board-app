import { Spinner } from "react-bootstrap";

const Loader = () => {
    return(
        <Spinner className="d-block mx-auto" animation="border" variant="warning" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
}

export default Loader;