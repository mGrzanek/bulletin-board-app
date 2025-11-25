import { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import { logOut } from "../../../redux/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import Loader from "../../common/Loader/Loader";
import { getUser } from "../../../redux/userReducer";
import { getStatus, updateStatus } from "../../../redux/statusReducer";
import AlertMessage from "../../common/AlertMessage/AlertMessage";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(getUser);
    const status = useSelector(getStatus);

    useEffect(() => {
        const options = {
            method: "DELETE",
            credentials: "include"
        }
        if(status !== "offline") {
            dispatch(updateStatus("loading"));
            fetch(`${API_URL}/auth/logout`, options)
                .then(() => {
                dispatch(logOut());
                dispatch(updateStatus("success"));
                navigate("/");
            });
        } else setTimeout(() => {
            return navigate("/")
        }, 2000) ;
    }, [dispatch]);

    if(!user) return <Navigate to="/" />
    else return (
        <>
            {status === "loading" && <Loader /> }
            {status === "offline" && <AlertMessage variant="danger" alertTitle="Offine" alertContent="Action available only online" />}
        </>
    )
};

export default Logout;