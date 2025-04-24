import { Card, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { IMG_URL } from "../../../config";

const AdItem = ({ _id, title, image, location }) => {
    return(
        <Col xs={12} md={6} lg={4} className="pt-4">
            <Card className="shadow border-warning-subtle rounded">
                <Card.Body>
                <Card.Img variant="top" src={IMG_URL + image} />
                <Card.Title className="text-warning pt-2">{title}</Card.Title>
                <Card.Text><b>Location: </b> {location}</Card.Text>
                <Button variant="outline-dark" className=" text-uppercase fw-bold" as={NavLink} to={`/ads/${_id}`}>
                    Read more
                </Button>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default AdItem;