import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getStatus, updateStatus } from "../../../redux/statusReducer";
import Loader from "../../common/Loader/Loader";
import { API_URL } from "../../../config";
import AlertMessage from "../../common/AlertMessage/AlertMessage";
import { fetchUser } from "../../../redux/userReducer";
import { getUser } from "../../../redux/userReducer";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from "react-router-dom";

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const actionStatus = useSelector(getStatus);
    const user = useSelector(getUser);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null);
    const [validated, setValidated] = useState(false);

     useEffect(() => {
            setStatus(actionStatus);
        }, [actionStatus]);

    const handleSubmit = e => {
        e.preventDefault();
        setValidated(true);
        if(login && password) {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({ login, password })
            };
            dispatch(updateStatus("loading"));
            fetch(`${API_URL}/auth/login`, options)
                .then(res => {
                    if(res.status === 200) { 
                        dispatch(updateStatus("success"));
                        dispatch(fetchUser());
                        navigate("/")
                    }
                    else if(res.status === 400) dispatch(updateStatus("clientError"));
                    else dispatch(updateStatus("serverError"));
                })
                .catch(err => dispatch(updateStatus("serverError")));
        }
    };

    if(user) return <Navigate to="/" />;
    else return(
        <Form className="col-12 col-sm-8 col-md-4 mx-auto py-2" noValidate onSubmit={handleSubmit}>
            {status === "success" && <AlertMessage variant="success" alertTitle="Success!" alertContent="You have been successfully logged in!" />}
            {status === "loginError" && <AlertMessage variant="warning" alertTitle="Login is already in use" alertContent="You have to use other login." />}
            {status === "clientError" && <AlertMessage variant="danger" alertTitle="Incorrect data" alertContent="Login or password are incorrect..." />}
            {status === "serverError" && <AlertMessage variant="danger" alertTitle="Something went wrong..." alertContent="Unexpected error... Please try again." />}
            {status === "loading" && <Loader />}
            <h2 className="my-4 text-warning">Sign in</h2>
            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Login: </Form.Label>
                <Form.Control type="text" placeholder="Login" value={login} onChange={e => setLogin(e.target.value)} isInvalid={validated && !login} required />
                <Form.Control.Feedback type="invalid">
                    Login required.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} isInvalid={validated && !password} required />
                <Form.Control.Feedback type="invalid">
                    Password required.
                </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="outline-warning">Sign in</Button>
        </Form>
    );
}

export default LoginForm;