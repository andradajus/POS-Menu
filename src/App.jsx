import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./client/Home";
import Menu from "./client/Menu";
import POS from "./client/POS";
import Layout from "./client/Layout";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Menu" element={<Menu />} />
            <Route path="/POS" element={<POS />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
