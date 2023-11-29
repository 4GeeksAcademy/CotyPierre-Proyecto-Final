import React from "react";
//import injectContext from "./store/appContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Usuario } from "./pages/usuario.jsx";
import { Crear_usuario } from "./pages/crear_usuario.jsx";
import { Modificar_usuario } from "./pages/modificar_usuario.jsx";

import { User_registration } from "./pages/user_registration.jsx";
import { User_login } from "./pages/user_login.jsx";

import { Catalogo } from "./pages/catalogo.jsx";
import { Crear_catalogo } from "./pages/crear_catalogo.jsx";
import { Modificar_catalogo } from "./pages/modificar_catalogo.jsx";

import { Procedimientos } from "./pages/procedimientos.jsx";
import { Crear_procedimientos } from "./pages/crear_procedimientos.jsx";
import { Modificar_procedimientos } from "./pages/modificar_procedimientos.jsx";

import { Home } from "./pages/home";
import { SubCatalogo } from "./pages/sub_catalogos.jsx";

import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <BrowserRouter basename={basename}>
            <ScrollToTop>
                <Navbar />
                <Routes>
                    <Route element={<User_registration />} path="/user_registration" />
                    <Route element={<User_login />} path="/user_login" />
                    <Route element={<Usuario />} path="/usuario" />
                    <Route element={<Crear_usuario />} path="/crear_usuario" />
                    <Route element={<Modificar_usuario />} path="/modificar_usuario/:theid" />
                    <Route element={<Modificar_procedimientos />} path="/modificar_procedimientos/:theid" />
                    <Route element={<Crear_procedimientos />} path="/crear_procedimientos" />
                    <Route element={<Procedimientos />} path="/procedimientos" />
                    <Route element={<Modificar_catalogo />} path="/modificar_catalogo/:theid" />
                    <Route element={<Crear_catalogo />} path="/crear_catalogo" />
                    <Route element={<Catalogo />} path="/catalogo" />
                    <Route element={<Home />} path="/" />
                    <Route element={<Demo />} path="/demo" />
                    <Route element={<Single />} path="/single/:theid" />
                    <Route element={<SubCatalogo />} path="/subcatalogo/:option" />
                </Routes>
                <Footer />
            </ScrollToTop>
        </BrowserRouter>
    );
};

export default injectContext(Layout);
