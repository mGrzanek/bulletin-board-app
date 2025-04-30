import { Form, Button } from "react-bootstrap";
import Loader from "../../common/Loader/Loader";
import { getUser } from "../../../redux/userReducer";
import { useSelector } from "react-redux";
import { useState } from "react";
import { API_URL } from "../../../config";
import AlertMessage from "../../common/AlertMessage/AlertMessage";
import { useNavigate, Navigate } from "react-router-dom";

const JoinForm = () => {
    const navigate = useNavigate();
    const user = useSelector(getUser);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('login', login);
        fd.append('password', password);
        fd.append('phone', phone);
        fd.append('avatar', avatar);
        const options = {
            method: "POST",
            body: fd
        };
        setStatus("loading");
        fetch(`${API_URL}/auth/register`, options)
            .then(res => {
                if(res.status === 201) {
                    setStatus("success");
                    navigate("/");
                }
                else if(res.status === 400) setStatus("clientError");
                else if(res.status === 409) setStatus("loginError");
                else setStatus("serverError");
            });
    };
    
    if(user) return <Navigate to="/" />;
    else return(
        <Form className="col-12 col-sm-8 col-md-4 mx-auto" onSubmit={handleSubmit}>
            {status === "success" && <AlertMessage variant="success" alertTitle="Success!" alertContent="Your article has been successfully added." />}
            {status === "loginError" && <AlertMessage variant="warning" alertTitle="Login is already in use" alertContent="You have to use other login." />}
            {status === "clientError" && <AlertMessage variant="danger" alertTitle="No enough data" alertContent="You have to fill all the fields." />}
            {status === "serverError" && <AlertMessage variant="danger" alertTitle="Something went wrong..." alertContent="Unexpected error... Please try again." />}
            {status === "loading" && <Loader />}
            <h2 className="my-4 text-warning">Sign up</h2>
            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Login: </Form.Label>
                <Form.Control type="text" placeholder="Login" value={login} onChange={e => setLogin(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone: </Form.Label>
                <Form.Control type="tel" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formAvatar" className="mb-3">
                <Form.Label>Avatar: </Form.Label>
                <Form.Control type="file" onChange={e => setAvatar(e.target.files[0])} />
            </Form.Group>
            <Button type="submit" variant="outline-warning">Join</Button>
        </Form>
    );
}

export default JoinForm;