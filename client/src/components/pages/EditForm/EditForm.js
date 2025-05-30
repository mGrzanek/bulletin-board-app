import { getAdById } from '../../../redux/adsReducer';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../../redux/userReducer';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import FormPattern from './../../features/FromPattern/FormPattern';
import { editAdRequest } from '../../../redux/adsReducer';

const EditForm = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const adToEdit = useSelector(state => getAdById(state, id));
    const edit = adToEdit => {
        return dispatch(editAdRequest(adToEdit, id));
    };
    const user = useSelector(getUser);

    if(!adToEdit || !user) return <Navigate to="/" />;
    else return <FormPattern formTitle="Edit article" actionTxt="Edit" {...adToEdit} action={edit} oldImage={adToEdit.image} />;
}

export default EditForm;