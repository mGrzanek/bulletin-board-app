import { Form, Button, Col } from "react-bootstrap";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const SearchForm = () => {
    const [wantedTitle, setWantedTitle] = useState('');

    return(
        <Form as={Col} className="mx-auto d-flex flex-column flex-sm-row justify-content-center align-items-center p-2 col-10 col-md-6 ">
            <Form.Control type="text" placeholder="Search by title..." className="m-2" value={wantedTitle} onChange={e => setWantedTitle(e.target.value)}/>
            <Button as={NavLink} to={`/ads/search/${wantedTitle}`} variant="outline-warning" className=" text-uppercase fw-bold m-2">
                Search
            </Button>
        </Form>
    )
}

export default SearchForm;