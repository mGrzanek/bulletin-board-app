import { Card, Col, Button } from "react-bootstrap";
import clsx from 'clsx';
import styles from './AdItem.module.scss';
import { NavLink } from "react-router-dom";
import { IMG_URL } from "../../../config";

const AdItem = ({ _id, title, image, location }) => {
    return(
        <Col xs={12} md={6} lg={4} className="pt-4">
            <Card className={clsx(styles.card, "p-3 shadow border-warning-subtle rounded")}>
                <Card.Body>
                <Card.Img variant="top" src={IMG_URL + image} className={styles.cardImage} />
                <Card.Title className={clsx(styles.cardTitle, "text-warning py-2")}>{title}</Card.Title>
                <Card.Text className="py-1"><b>Location: </b> {location}</Card.Text>
                <Button variant="outline-warning"  size="sm" className=" text-lowercase fw-bold" as={NavLink} to={`/ads/${_id}`}>
                    Read more
                </Button>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default AdItem;