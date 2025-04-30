import { getAllAds } from "../../../redux/adsReducer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import AdItem from "../../views/AdItem/AdItem";
import AlertMessage from "../../common/AlertMessage/AlertMessage";
import { getStatus } from "../../../redux/statusReducer";

const Ads = () => {
    const ads = useSelector(getAllAds);
    const [statusForm, setStatusForm] = useState(null);
    const actionStatus = useSelector(getStatus);

    useEffect(() => {
        setStatusForm(actionStatus);
        console.log(statusForm);
    }, [actionStatus]);
    

    const sortedAds = [...ads].sort((a, b) => {
        const dateA = new Date(a.publicationDate);
        const dateB = new Date(b.publicationDate);
        return dateB - dateA;
    });
    return(
        <>
            {statusForm === 'success' && <Col xs={4} className="mx-auto"><AlertMessage className="" variant="success" alertTitle="Success!" alertContent="Your article successfully added!" /></Col>}
            <Row className="d-flex py-4">
                {sortedAds.map(ad => (
                    <AdItem key={ad._id} {...ad} />
                ))}
                {sortedAds.length === 0 && <p className="py-5">No ads...</p>}
            </Row>
        </>
    );
}

export default Ads;