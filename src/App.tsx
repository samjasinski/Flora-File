import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import NavBar from "./components/nav/NavBar";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Display from "./pages/Display";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Protected from "./auth/Protected";
import { useEffect, useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        if (userData.token) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setIsAuth(false);
      }
    } else {
      setIsAuth(false);
    }
  }, [location]);

  return (
    <>
      <Header />
      {isAuth && <NavBar />}
      <Routes>
        <Route element={<Protected />}>
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/display" element={<Display />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>

        <Route
          path="/login"
          element={isAuth ? <Navigate to="/home" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuth ? <Navigate to="/home" replace /> : <Register />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
