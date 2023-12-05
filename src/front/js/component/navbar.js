import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary px-2">
			{store.rol != "" && (
				<Link to={"/"} className="navbar-brand">{store.rol}</Link>
			)}
			{store.rol === "" && (
				<Link to={"/"} className="navbar-brand">Publicación de Procedimientos</Link>
			)}

			<a className="navbar-brand" href="#"></a>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNavDropdown">
				<ul className="navbar-nav">
					<li className="nav-item active">
						<Link className="nav-link" to={"/"}>Inicio</Link>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">Contactos</a>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to={"/user_login"}>Login</Link>
					</li>
					{store.rol === "Administrador" && (
						<li className="nav-item">
							<Link className="nav-link" to={"/procedimientos"}>Gestionar Procedimientos</Link>
						</li>
					)}
					{store.rol === "Administrador" && (
						<li className="nav-item">
							<Link className="nav-link" to={"/usuario"}>Gestionar Usuarios</Link>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
};
