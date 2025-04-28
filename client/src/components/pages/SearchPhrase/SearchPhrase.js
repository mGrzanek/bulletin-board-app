import { useParams } from "react-router-dom";
import AdItem from "../../views/AdItem/AdItem";
import { getAllAds } from "../../../redux/adsReducer";
import { useSelector } from "react-redux";
import { Row } from "react-bootstrap";

const SearchPhrase = () => {
    const {searchPhrase} = useParams();
    const ads = useSelector(getAllAds);
    const regex = new RegExp(searchPhrase, 'i');
    const filteredAds = ads.filter(ad => regex.test(ad.title));

    return(
        <>
            <h2 className="text-center text-warning pt-4 pb-2">Search results: </h2>
            <Row className="d-flex pt-4">
                {filteredAds.map(ad => <AdItem key={ad._id} {...ad} />)}
                {filteredAds.length === 0 && <p className="text-center">Not found articles...</p>}
            </Row>
        </>
    );
}

export default SearchPhrase;