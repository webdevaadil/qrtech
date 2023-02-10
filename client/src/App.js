import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./Component/Home.js";
import Login from "./Component/Login.js";
import { Register } from "./Component/Register.js";
import { Main } from "./Component/Main.js";
import { Viewlist } from "./Component/Viewlist.js";
import { Dashboard } from "./Component/Dashboard.js";
import {Createnew} from "./Component/Createnew.js";
import { Prosnalpage } from "./Component/Prosnalpage.js";
import { Result } from "./Component/Result.js";

function App() {
  return (
    <>
        <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Protectedroute><Main /></Protectedroute>}>
            <Route path="" element={<Dashboard />}> </Route>
            <Route path="viewlist" element={<Viewlist />}></Route>
            <Route path="createnew" element={<Createnew />}></Route>
            <Route path="Prosnalpage/:id" element={<Prosnalpage />}></Route>
          </Route>
            <Route path="/result/:id" element={<Result />}></Route>
        </Routes>
      </BrowserRouter>
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