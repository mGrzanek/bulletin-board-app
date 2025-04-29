import { Form, Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import { API_URL } from "../../../config";
import AlertMessage from "../../common/AlertMessage/AlertMessage";
import { fetchUser } from "../../../redux/userReducer";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({ login, password })
        };
        setStatus("loading");
        fetch(`${API_URL}/auth/login`, options)
            .then(res => {
                if(res.status === 200) { 
                    setStatus("success");
                    dispatch(fetchUser());
                    navigate("/")
                }
                else if(res.status === 400) setStatus("clientError");
                else setStatus("serverError");
            })
            .catch(err => setStatus("serverError"));
    };

    return(
        <Form className="col-12 col-sm-8 col-md-4 mx-auto py-2" onSubmit={handleSubmit}>
            {status === "success" && <AlertMessage variant="success" alertTitle="Success!" alertContent="You have been successfully logged in!" />}
            {status === "loginError" && <AlertMessage variant="warning" alertTitle="Login is already in use" alertContent="You have to use other login." />}
            {status === "clientError" && <AlertMessage variant="danger" alertTitle="Incorrect data" alertContent="Login or password are incorrect..." />}
            {status === "serverError" && <AlertMessage variant="danger" alertTitle="Something went wrong..." alertContent="Unexpected error... Please try again." />}
            {status === "loading" && <Spinner className="d-block mx-auto" animation="border" variant="warning" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>}
            <h2 className="my-4 text-warning">Sign in</h2>
            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Login: </Form.Label>
                <Form.Control type="text" placeholder="Login" value={login} onChange={e => setLogin(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button type="submit" variant="outline-warning">Sign in</Button>
        </Form>
    );
}

export default LoginForm;