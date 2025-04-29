import { useEffect } from "react";
import { API_URL } from "../../../config";
import { logOut } from "../../../redux/userReducer";
import { useDispatch } from "react-redux";

const Logout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const options = {
            method: "DELETE",
            credentials: "include"
        }
        fetch(`${API_URL}/auth/logout`, options)
            .then(() => {
            dispatch(logOut())
        });
    }, [dispatch]);
    
    return null;
};

export default Logout;