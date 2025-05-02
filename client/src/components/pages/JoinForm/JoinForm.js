import { Form, Button } from "react-bootstrap";
import Loader from "../../common/Loader/Loader";
import { getUser } from "../../../redux/userReducer";
import { useSelector, useDispatch } from "react-redux";
import { updateStatus, getStatus } from "../../../redux/statusReducer";
import { useState, useEffect } from "react";
import { API_URL } from "../../../config";
import AlertMessage from "../../common/AlertMessage/AlertMessage";
import { useNavigate, Navigate } from "react-router-dom";

const JoinForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const actionStatus = useSelector(getStatus);
    const user = useSelector(getUser);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState(null);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        setStatus(actionStatus);
    }, [actionStatus]);

    const handleSubmit = e => {
        e.preventDefault();
        setValidated(true);
        if(login && password && avatar && phone){
            const avatarExt = avatar.name.split('.').pop().toLowerCase();
            if(login.length >= 3 && login.length <= 20 && phone.length >= 9 && phone.length <= 16) {
                if (['jpg', 'jpeg', 'png', 'gif'].includes(avatarExt)) {
                    const formData = new FormData();
                    formData.append('login', login);
                    formData.append('password', password);
                    formData.append('phone', phone);
                    formData.append('avatar', avatar);
                    const options = {
                        method: "POST",
                        body: formData
                    };
                    dispatch(updateStatus("loading"));
                    fetch(`${API_URL}/auth/register`, options)
                        .then(res => {
                            if(res.status === 201) {
                                dispatch(updateStatus("success"));
                                navigate("/");
                            }
                            else if(res.status === 400) dispatch(updateStatus("clientError"));
                            else if(res.status === 409) dispatch(updateStatus("loginError"));
                            else setStatus("serverError");
                        });
                } else dispatch(updateStatus("clientError"));
            } else dispatch(updateStatus("clientError"));
        } else dispatch(updateStatus("clientError"));
    };
    
    if(user) return <Navigate to="/" />;
    else return(
        <Form className="col-12 col-sm-8 col-md-4 mx-auto" noValidate onSubmit={handleSubmit}>
            {status === "success" && <AlertMessage variant="success" alertTitle="Success!" alertContent="Your article has been successfully added." />}
            {status === "loginError" && <AlertMessage variant="warning" alertTitle="Login is already in use" alertContent="You have to use other login." />}
            {status === "clientError" && <AlertMessage variant="danger" alertTitle="No enough data" alertContent="You have to fill all the fields." />}
            {status === "serverError" && <AlertMessage variant="danger" alertTitle="Something went wrong..." alertContent="Unexpected error... Please try again." />}
            {status === "loading" && <Loader />}
            <h2 className="my-4 text-warning">Sign up</h2>
            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Login: </Form.Label>
                <Form.Control type="text" placeholder="Login" value={login} onChange={e => setLogin(e.target.value)} isInvalid={validated && (login.length < 3 || login.length > 20) } required />
                <Form.Control.Feedback type="invalid">
                    Login must be between 3 and 20 characters long.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password"  placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} isInvalid={validated && (password.length < 10 || password.length > 20) } required />
                <Form.Control.Feedback type="invalid">
                    Password must be between 10 and 20 characters long.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone: </Form.Label>
                <Form.Control type="tel" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} isInvalid={validated && (!/^\d{9,16}$/.test(phone))} required />
                <Form.Control.Feedback type="invalid">
                    Phone must be between 9 and 16 digits long, digits only.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formAvatar" className="mb-3">
                <Form.Label>Avatar: </Form.Label>
                <Form.Control type="file" accept=".jpg,.jpeg,.png,.gif" onChange={e => setAvatar(e.target.files[0])} isInvalid={validated && !avatar} required />
                <Form.Control.Feedback type="invalid">
                    Only .jpeg, .jpg, .png and .gif files are accepted. Less than 1MB.
                </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="outline-warning">Join</Button>
        </Form>
    );
}

export default JoinForm;