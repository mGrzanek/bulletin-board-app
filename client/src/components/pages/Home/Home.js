import SearchForm from "../../features/SearchForm/SearchForm";
import Ads from "../../features/Ads/Ads";

const Home = () => {
    return(
        <div className="py-4">
            <SearchForm />
            <Ads />
        </div>
    );
};

export default Home;