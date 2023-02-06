import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./Component/Home";
import Login from "./Component/Login";
import { Register } from "./Component/Register";
import { Main} from "./Component/Main";
import React, {useState } from "react";

function App() {
  const [auth, setAuth] = useState();

  const baseurl = "http://localhost:5000";
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Protectedroute><Main/></Protectedroute>} />
        </Routes>
        
      </BrowserRouter>
    </div>
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
