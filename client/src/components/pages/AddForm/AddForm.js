import FormPattern from "../../features/FromPattern/FormPattern";
import { addAdRequest } from "../../../redux/adsReducer";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/userReducer";
import { Navigate } from "react-router-dom";

const AddForm = () => {
    const dispatch = useDispatch();
    const add = newAd => {
        return dispatch(addAdRequest(newAd));
    }
    const user = useSelector(getUser);
    if(!user) return <Navigate to="/" />;
    else return(
        <FormPattern formTitle="Add new article" actionTxt="Add" action={add} />
    );
}

export default AddForm;