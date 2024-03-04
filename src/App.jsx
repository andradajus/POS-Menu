import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./client/Menu";
import Layout from "./client/Layout";
import "./App.css";
import { toast, Toaster } from "sonner";

function App() {

  const addAlert = (type, message) => {
    toast(message, {
      type,
    });
  };

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="*" element={<Menu addAlert={addAlert} />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
