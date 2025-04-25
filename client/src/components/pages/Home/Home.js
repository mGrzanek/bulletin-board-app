import Search from "../../views/Search/Search";
import Ads from "../../features/Ads/Ads";

const Home = () => {
    return(
        <div className="py-5">
            <Search />
            <Ads />
        </div>
    );
};

export default Home;