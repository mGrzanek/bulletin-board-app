import { useEffect } from "react";
import { fetchAds } from "./redux/adsReducer";
import { fetchUser } from "./redux/userReducer";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Header from "./components/views/Header/Header";
import Home from "./components/pages/Home/Home";
import NotFound from "./components/pages/NotFound/NotFound";
import SingleAd from "./components/pages/SingleAd/SingleAd";
import SearchPhrase from "./components/pages/SearchPhrase/SearchPhrase";
import AddForm from "./components/pages/AddForm/AddForm";
import EditForm from "./components/pages/EditForm/EditForm";
import JoinForm from "./components/pages/JoinForm/JoinForm";
import LoginForm from "./components/pages/LoginForm/LoginForm";
import Logout from "./components/pages/Logout/Logout";
import Footer from "./components/views/Footer/Footer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchAds()); 
  }, [dispatch]);
  return (
    <>
      <Header />
      <Container className="pt-3 pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ads/:id" element={<SingleAd />} />
          <Route path="/ads/search/:searchPhrase" element={<SearchPhrase />} />
          <Route path="/ads/add" element={<AddForm />} />        
          <Route path="/ads/edit/:id" element={<EditForm />} />
          <Route path="/register" element={<JoinForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/auth/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
};

export default App;
