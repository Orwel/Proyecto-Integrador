import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./header";
import SignUp from './SignUp';
import Login from './Login';
import './App.css';
import Body from "./body";
import Footer from "./footer";
import Detail from "./components/detail";
import { routes } from "./utils/router";
import Panel from "./Panel";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={routes.home} element={<Body />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/panel" element={<Panel />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
