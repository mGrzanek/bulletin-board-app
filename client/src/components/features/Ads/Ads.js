import { getAllAds } from "../../../redux/adsReducer";
import { useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import AdItem from "../../views/AdItem/AdItem";

const Ads = () => {
    const ads = useSelector(getAllAds);
    return(
        <Row className="d-flex py-4">
            {ads.map(ad => (
                <AdItem key={ad._id} {...ad} />
            ))}
            {ads.length === 0 && <p className="py-5">No ads...</p>}
        </Row>
    );
}

export default Ads;