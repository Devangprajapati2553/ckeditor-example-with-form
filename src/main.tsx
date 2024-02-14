import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Test from "./Form/Form.tsx";
import Content from "./Form/Content.tsx";
import Form1 from "./Form/Form1.tsx";
import MainPage from "./Form/MainPage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />}></Route>
      <Route path="/form" element={<Test />}></Route>
      <Route path="/content" element={<Content />}></Route>
      <Route path="/form1" element={<Form1 />}></Route>
      <Route path="/main" element={<MainPage />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
