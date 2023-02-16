import {
  BrowserRouter,
  Navigate,
  redirect,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Home } from "./Component/Home.js";
import Login from "./Component/Login.js";
import { Register } from "./Component/Register.js";
import { Main } from "./Component/Main.js";
import { Viewlist } from "./Component/Viewlist.js";
import { Dashboard } from "./Component/Dashboard.js";
import { Createnew } from "./Component/Createnew.js";
import { Prosnalpage } from "./Component/Prosnalpage.js";
import { Result } from "./Component/Result.js";
import { Editpenquire } from "./Component/Editpenquire.js";
import { Account } from "./Component/Account.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { Changepassword } from "./Component/Changepassword.js";
import { Forgetpassword } from "./Component/Forgetpassword.js";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [user, setuser] = useState();
  const getacc = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      await axios.post("/api/auth/me", { token }).then((res) => {
        console.log(res);
        setuser(res.data.user);
      });
    } catch (error) {
      localStorage.removeItem("token");
      redirect("/");
      console.log(error);
    }
  };

  console.log(user);
  useEffect(() => {
    getacc();
  }, []);
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/main"
              element={
                <Protectedroute>
                  <Main />
                </Protectedroute>
              }
            >
              <Route path="" element={<Dashboard />}>
                {" "}
              </Route>
              <Route path="viewlist" element={<Viewlist />}></Route>
              <Route path="createnew" element={<Createnew />}></Route>
              <Route path="Prosnalpage/:id" element={<Prosnalpage />}></Route>
              <Route
                path="Prosnalpage/edit/:id"
                element={<Editpenquire />}
              ></Route>
              <Route path="account" element={<Account />}></Route>
              <Route
                path="change-password"
                element={<Changepassword />}
              ></Route>
            </Route>
            <Route path="/result/:id" element={<Result />} />
            <Route path="/password/reset/:token" element={<Forgetpassword />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
      </div>
    </>
  );
}

export default App;

export function Protectedroute(props) {
  const token = JSON.parse(localStorage.getItem("token"));

  if (!token) {
    return <Navigate to="/login" />;
  } else {
    return props.children;
  }
}
