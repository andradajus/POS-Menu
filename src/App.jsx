import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./client/Menu";
import Layout from "./client/Layout";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/Menu" element={<Menu />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
