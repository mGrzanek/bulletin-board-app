import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAds, updateAds } from "./redux/adsReducer";
import { fetchUser, updateUser } from "./redux/userReducer";
import { updateStatus } from "./redux/statusReducer";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";
import Home from "./components/pages/Home/Home";
import SingleAd from "./components/pages/SingleAd/SingleAd";
import SearchPhrase from "./components/pages/SearchPhrase/SearchPhrase";
import AddForm from "./components/pages/AddForm/AddForm";
import EditForm from "./components/pages/EditForm/EditForm";
import JoinForm from "./components/pages/JoinForm/JoinForm";
import LoginForm from "./components/pages/LoginForm/LoginForm";
import Logout from "./components/pages/Logout/Logout";
import NotFound from "./components/pages/NotFound/NotFound";
import Installer from "./components/features/Installer/Installer";

const App = () => {
  const dispatch = useDispatch();

  const isReallyOnline = async () => {
    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1500);

      const res = await fetch("/manifest.json", {
        method: "HEAD",
        cache: "no-cache",
        signal: controller.signal,
      });

      return res.ok;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const init = async () => {
      const online = await isReallyOnline();

      if (!online) {
        dispatch(updateStatus("offline"));

        const cachedUser = localStorage.getItem("user");
        const cachedAds = localStorage.getItem("ads");

        if (cachedUser) dispatch(updateUser(JSON.parse(cachedUser)));
        if (cachedAds) dispatch(updateAds(JSON.parse(cachedAds)));

        return;
      }

      dispatch(updateStatus(null));
      await dispatch(fetchUser());
      await dispatch(fetchAds());
    };

    init();

    const handleOnline = async () => {
      const online = await isReallyOnline();
      if (!online) return;

      dispatch(updateStatus(null));
      await dispatch(fetchUser());
      await dispatch(fetchAds());
    };

    const handleOffline = () => {
      dispatch(updateStatus("offline"));
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
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
      <Installer />
    </>
  );
};

export default App;
