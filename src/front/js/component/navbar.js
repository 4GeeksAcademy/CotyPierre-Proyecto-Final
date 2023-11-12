import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
			<div>
          		{store.auth == false ? null : 
           		 <button className="btn btn-primary">estas logueado</button>
          		}
       		 </div>
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<Link to="/catalogo">
					<span className="btn btn-primary">Catalogo</span>
				</Link>
				<Link to="/procedimientos">
					<span className="btn btn-primary">Procedimientos</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
