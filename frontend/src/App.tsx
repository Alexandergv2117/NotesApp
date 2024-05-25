import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<h1>Hola</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
