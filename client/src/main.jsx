import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "./context/Auth.jsx";
import AppDataContext from "./context/AppDataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <AppDataContext>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </AppDataContext>
    </AuthProvider>
  </BrowserRouter>
);
