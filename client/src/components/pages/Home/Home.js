import Loader from "../../common/Loader/Loader";
import SearchForm from "../../features/SearchForm/SearchForm";
import Ads from "../../features/Ads/Ads";
import { getStatus } from "../../../redux/statusReducer";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import AlertMessage from "../../common/AlertMessage/AlertMessage";

const Home = () => {
    const actionStatus = useSelector(getStatus);
    const [statusForm, setStatusForm] = useState(null);

     useEffect(() => {
        setStatusForm(actionStatus);
    }, [actionStatus]);

    return(
        <div className="py-4">
            {statusForm === 'success' && <AlertMessage variant="success" alertTitle="Success!" alertContent="The process successful!" />}
            {statusForm === "loading" && <Loader />}
            {statusForm !== "loading" &&<SearchForm />}
            {statusForm !== "loading" && <Ads />}
        </div>
    );
};

export default Home;