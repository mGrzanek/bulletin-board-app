import { Form, Button, Col } from "react-bootstrap";

const SearchForm = () => {
    return(
        <Form as={Col} className="mx-auto d-md-flex justify-content-center align-items-center p-2 col-10 col-md-6 ">
            <Form.Control type="text" placeholder="Title" className="m-2"/>
            <Button variant="outline-warning" className=" text-uppercase fw-bold m-2">
                Search
            </Button>
        </Form>
    )
}

export default SearchForm;