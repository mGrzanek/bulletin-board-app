import { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import { logOut } from "../../../redux/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import Loader from "../../common/Loader/Loader";
import { getUser } from "../../../redux/userReducer";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(getUser);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const options = {
            method: "DELETE",
            credentials: "include"
        }
        setStatus("loading");
        fetch(`${API_URL}/auth/logout`, options)
            .then(() => {
            dispatch(logOut());
            setStatus(null);
            navigate("/");
        });
    }, [dispatch]);

    if(!user) return <Navigate to="/" />
    else return status === "loading" ? <Loader /> : null;
};

export default Logout;