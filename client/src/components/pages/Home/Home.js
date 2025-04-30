import Loader from "../../common/Loader/Loader";
import SearchForm from "../../features/SearchForm/SearchForm";
import Ads from "../../features/Ads/Ads";
import { getStatus } from "../../../redux/statusReducer";
import { useSelector } from "react-redux";

const Home = () => {
    const pending = useSelector(getStatus);

    return(
        <div className="py-4">
            {pending === "loading" && <Loader />}
            {!pending &&<SearchForm />}
            {!pending && <Ads />}
        </div>
    );
};

export default Home;