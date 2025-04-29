import { Button, Form } from "react-bootstrap";
import AlertMessage from "../../common/AlertMessage/AlertMessage";
import Loader from "../../common/Loader/Loader";
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';
import { useState } from "react";
import { useSelector } from 'react-redux';
import { getUser } from "../../../redux/userReducer";
import { useNavigate } from "react-router-dom";


const FormPattern = ({action, formTitle, actionTxt, ...props}) => {
    const navigate = useNavigate();
    const user = useSelector(getUser);
    
    const [title, setTitle] = useState('' || props.title);
    const [price, setPrice] = useState('' || props.price);
    const [published, setPublished] = useState(props.publicationDate ? new Date(props.publicationDate) : new Date());
    const [location, setLocation] = useState('' || props.location);
    const [author] = useState(user._id);
    const [image, setImage] = useState(null);
    const [content, setContent] = useState('' || props.content);
    const [status, setStatus] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
      
        if (title && author && content && location && price) {
          const formData = new FormData();
          formData.append("title", title);
          formData.append("price", price.toString());
          formData.append("location", location);
          formData.append("author", author);
          formData.append("publicationDate", published.toISOString());
          formData.append("content", content);
      
          if (image || props.image) {
            formData.append("image", image || props.image);
            setStatus("loading");
      
            action(formData).then(res => {
              if (res.status === 200) {
                setStatus("success");
                navigate("/");
              } else if (res.status === 400) setStatus("clientError");
              else setStatus("serverError");
            });
          } else {
            setStatus("clientError");
          }
        } else {
          setStatus("clientError");
        }
    };
    
    if(!user) navigate("/");
    else return(
        <Form className="col-12 col-sm-8 col-md-4 mx-auto" onSubmit={handleSubmit}>
            {status === "loading" && <Loader />}
            {status === 'success' && <AlertMessage variant="success" alertTitle="Success!" alertContent="Your article successfully added!" />}
            {status === "clientError" && <AlertMessage variant="danger" alertTitle="No enough data" alertContent="You have to fill all the fields" />}
            {status === 'serverError' && <AlertMessage variant="danger" alertTitle="Something went wrong..." alertContent="Unexpected error... Please try again." />}
            <h2 className="my-4 text-warning">{formTitle}</h2>
            <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title: </Form.Label>
                <Form.Control type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPublished">
                <Form.Label>Published: </Form.Label>
                <div>
                    <DatePicker selected={published} onChange={(date) => setPublished(date)} required />
                </div>
            </Form.Group>
            <Form.Group className="col-4 mb-3" controlId="formPrice">
                <Form.Label>Price: </Form.Label>
                <Form.Control type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLocation">
                <Form.Label>Location: </Form.Label>
                <Form.Control type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Image: </Form.Label>
                <Form.Control type="file" onChange={e => setImage(e.target.files[0])} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formContent">
                <Form.Label>Content: </Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="Main content..." value={content} onChange={e => setContent(e.target.value)} required />
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