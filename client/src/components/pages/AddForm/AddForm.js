import FormPattern from "../../features/FromPattern/FormPattern";
import { addAdRequest } from "../../../redux/adsReducer";
import { useDispatch } from "react-redux";

const AddForm = () => {
    const dispatch = useDispatch();
    const add = newAd => {
        return dispatch(addAdRequest(newAd));
    }
    return(
        <FormPattern formTitle="Add new article" actionTxt="Add" action={add} />
    );
}

export default AddForm;