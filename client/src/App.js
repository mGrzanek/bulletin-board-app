import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import NotFound from "./components/pages/NotFound/NotFound";
import SingleAd from "./components/pages/SingleAd/SingleAd";
import SearchPhrase from "./components/pages/SearchPhrase/SearchPhrase";
import AddForm from "./components/pages/AddForm/AddForm";
import EditForm from "./components/pages/EditForm/EditForm";
import JoinForm from "./components/pages/JoinForm/JoinForm";
import LoginForm from "./components/pages/LoginForm/LoginForm";
import Header from "./components/views/Header/Header";

const App = () => {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ads/:id" element={<SingleAd />} />
        <Route path="/ads/search/:searchPhrase" element={<SearchPhrase />} />
        <Route path="/ads/add" element={<AddForm />} />        
        <Route path="/ads/edit/:id" element={<EditForm />} />
        <Route path="/register" element={<JoinForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
};

export default App;
