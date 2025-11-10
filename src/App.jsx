import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import LoginPage from "./pages/auth/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages";
import ProtectedRoute from "./context/ProtectedRoute";
import AboutPage from "./pages/about/AboutPage";
import ListContact from "./pages/contacts/ListContact";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>

        <Route path="/" element={<ProtectedRoute></ProtectedRoute>}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ListContact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
