import { getAdById } from '../../../redux/adsReducer';
import { useSelector, useDispatch } from 'react-redux';
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
    if(!adToEdit) return<Navigate to="/" />;
    else return(
        <FormPattern formTitle="Edit ad" actionTxt="Edit" {...adToEdit} action={edit} oldImage={adToEdit.image} />
    );
}

export default EditForm;