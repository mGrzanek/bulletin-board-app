import { getAllAds } from "../../../redux/adsReducer";
import { useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import AdItem from "../../views/AdItem/AdItem";

const Ads = () => {
    const ads = useSelector(getAllAds);
    
    const sortedAds = [...ads].sort((a, b) => {
        const dateA = new Date(a.publicationDate);
        const dateB = new Date(b.publicationDate);
        return dateB - dateA;
    });
    return(
        <>
            <Row className="d-flex py-4">
                {sortedAds.map(ad => (
                    <AdItem key={ad._id} {...ad} />
                ))}
                {sortedAds.length === 0 && <p className="text-center mt-2 mb-5 py-5">No ads found...</p>}
            </Row>
        </>
    );
}

export default Ads;