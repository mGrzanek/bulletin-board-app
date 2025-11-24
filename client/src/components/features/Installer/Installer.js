import { useEffect, useState } from "react";
import ModalPage from "../../common/ModalPage/ModalPage";

const Installer = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showAndroid, setShowAndroid] = useState(false);
  const [showIOS, setShowIOS] = useState(false);

  const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;

  useEffect(() => {
    if (isIOS && !isStandalone) {
      setShowIOS(true);
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowAndroid(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, [isIOS, isStandalone]);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    setShowAndroid(false);
  };

  return (
    <>
      {showAndroid && (
        <ModalPage
          autoShow
          hideTrigger
          buttonName="Install"
          content="You can install this app for faster access and offline use."
          action={installApp}
        />
      )}

      {showIOS && (
        <ModalPage
          autoShow
          hideTrigger
          buttonName="OK"
          content="On iPhone / iPad: Tap Share → Add to Home Screen → Confirm"
          action={() => setShowIOS(false)}
        />
      )}
    </>
  );
};

export default Installer;
