import Loader from "../../common/Loader/Loader";
import SearchForm from "../../features/SearchForm/SearchForm";
import Ads from "../../features/Ads/Ads";
import { getStatus } from "../../../redux/statusReducer";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Home = () => {
    const actionStatus = useSelector(getStatus);
     const [statusForm, setStatusForm] = useState(null);

     useEffect(() => {
        setStatusForm(actionStatus);
    }, [actionStatus]);

    return(
        <div className="py-4">
            {statusForm === "loading" && <Loader />}
            {statusForm !== "loading" &&<SearchForm />}
            {statusForm !== "loading" && <Ads />}
        </div>
    );
};

export default Home;