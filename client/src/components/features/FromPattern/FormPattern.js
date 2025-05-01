import { Button, Form } from "react-bootstrap";
import AlertMessage from "../../common/AlertMessage/AlertMessage";
import Loader from "../../common/Loader/Loader";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { getUser } from "../../../redux/userReducer";
import { useNavigate } from "react-router-dom";
import { getStatus } from "../../../redux/statusReducer";

const FormPattern = ({action, formTitle, actionTxt, ...props}) => {
    const navigate = useNavigate();
    const user = useSelector(getUser);
    const actionStatus = useSelector(getStatus);
    
    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState(props.title || ''); 
    const [price, setPrice] = useState(props.price || ''); 
    const [published] = useState(props.publicationDate ? new Date(props.publicationDate) : new Date()); 
    const [location, setLocation] = useState(props.location || ''); 
    const [author] = useState(user._id);
    const [image, setImage] = useState(props.image || null); 
    const [content, setContent] = useState(props.content || '');
    const [statusForm, setStatusForm] = useState(null);
    const [imageError, setImageError] = useState(false);
   

   useEffect(() => {
    setStatusForm(actionStatus);
   }, [actionStatus]);

   useEffect(() => {
    if(price < 0) setPrice(0);
   }, [price]);

    const handleSubmit = e => {
        e.preventDefault();
        setValidated(true);
        if (title && author && content && location && price) {
            if(title.length >= 10 && title.length <= 50 && content.length > 20 && content.length < 1000 
                && location.length > 3 && location.length < 30 && price >= 0 && !isNaN(price)){
                const formData = new FormData();
                formData.append("title", title);
                formData.append("price", price.toString());
                formData.append("location", location);
                formData.append("author", author);
                formData.append("publicationDate", published.toISOString());
                formData.append("content", content);
                if(!image && !props.image) {
                    setImageError(true)
                    setStatusForm("clientError");
                } else  {
                    setImageError(false);
                    formData.append("image", image || props.image);
                    action(formData);
                    navigate("/");
                } 
            } else setStatusForm("clientError")   ;
        } else {
          setStatusForm("clientError");
        }
    };
    
    if(!user) navigate("/");
    else return(
        <Form className="col-12 col-sm-8 col-md-4 mx-auto" noValidate onSubmit={handleSubmit}>
            {statusForm === "loading" && <Loader />}
            {statusForm === "clientError" && <AlertMessage variant="danger" alertTitle="No enough data" alertContent="You have to fill all the fields" />}
            {statusForm === 'serverError' && <AlertMessage variant="danger" alertTitle="Something went wrong..." alertContent="Unexpected error... Please try again." />}
            <h2 className="my-4 text-warning">{formTitle}</h2>
            <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title: </Form.Label>
                <Form.Control type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} isInvalid={validated && (title.length < 10 || title.length > 50) } required />
                <Form.Control.Feedback type="invalid">
                    Title must be between 10 and 50 characters long.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="col-4 mb-3" controlId="formPrice">
                <Form.Label>Price: </Form.Label>
                <Form.Control type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} isInvalid={validated && !price } required />
                <Form.Control.Feedback type="invalid">
                    Price is required.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLocation">
                <Form.Label>Location: </Form.Label>
                <Form.Control type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} isInvalid={validated && (location.length < 3 || location.length > 30) } required />
                <Form.Control.Feedback type="invalid">
                    Location must be between 3 and 30 characters long.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Image: </Form.Label>
                <Form.Control type="file" onChange={e => setImage(e.target.files[0])} />
                {imageError && <Form.Text className="text-danger">
                    Image is required.
                </Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formContent">
                <Form.Label>Content: </Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Main content..." value={content} onChange={e => setContent(e.target.value)} isInvalid={validated && (content.length < 20 || content.length > 1000) } required />
                <Form.Control.Feedback type="invalid">
                    Content must be between 20 and 1000 characters long.
                </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="outline-warning">{actionTxt}</Button>
        </Form>
    );
}

FormPattern.propTypes = {
    action: PropTypes.func.isRequired,
    actionTxt: PropTypes.string.isRequired,
    title: PropTypes.string,
    price: PropTypes.number,
    location: PropTypes.string,
    published: PropTypes.object,
    image: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(File), 
    ]),
    content: PropTypes.string
}

export default FormPattern;