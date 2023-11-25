import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary px-2">
			<Link to={"/"} className="navbar-brand">Gestor de procedimientos</Link>
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
						<a className="nav-link" href="#">Login</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};
