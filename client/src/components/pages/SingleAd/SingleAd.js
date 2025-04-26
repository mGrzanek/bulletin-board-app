import { Card, Col, Row, Image, Button } from "react-bootstrap";
import { useParams, Navigate, NavLink } from "react-router-dom";
import { getAdById } from "../../../redux/adsReducer";
import { useDispatch, useSelector } from "react-redux";
import { IMG_URL } from "../../../config";
import styles from './SingleAd.module.scss';
import clsx from 'clsx';

const SingleAd = () => {
    const {id} = useParams();
    //const dispatch = useDispatch();
    const ad = useSelector(state => getAdById(state, id));
    const published = ad.publicationDate.slice(0, 10);

    if(!ad) return <Navigate to="/" />
    else return(
        <Card className="col-12 col-sm-10 col-md-7 m-4 p-3 p-md-4 mx-auto shadow border-warning-subtle rounded">
            <Card.Body>
                <Card.Img src={IMG_URL + ad.image}/>
                <Card.Title className="text-warning pt-2">{ad.title}</Card.Title>
                <Card.Text className="mb-0"><b>Price: </b> {ad.price}$</Card.Text>
                <Card.Text className="mb-0"><b>Location: </b> {ad.location}</Card.Text>
                <Card.Text><b>Published: </b> {published}</Card.Text>
                <Card.Text className={styles.txt}> {ad.content}</Card.Text>
                <Card.Text>
                    <Row className=" d-flex justify-content-start align-items-center"> 
                        <Image className={styles.authorImg} src={IMG_URL + ad.author.avatar} roundedCircle />
                        <Col xs={4} className={clsx(styles.txt, "d-flex flex-column align-items-start text-muted")}>
                            <div>{ad.author.login}</div>
                            <div>{ad.author.phone}</div>
                        </Col>
                        <Col xs={4} className="d-flex flex-column flex-sm-row justify-content-end align-items-center">
                            <Button as={NavLink} to={`/ads/edit/${id}`} variant="outline-info" size="sm" className="m-1 px-3">Edit</Button>
                            <Button variant="outline-danger" size="sm" className="m-1 px-1">Remove</Button>
                        </Col>
                    </Row>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default SingleAd;