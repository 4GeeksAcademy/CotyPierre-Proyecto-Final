import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			{/* <h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p> */}
			<Link to="/catalogo">
				<button>categorias</button>
      		</Link>
			<Link to="/usuario">
				<button>Usuario</button>
      		</Link>
			<Link to="/user_registration">
				<button>Registro</button>
      		</Link>
			  <Link to="/user_login">
				<button>Login</button>
      		</Link>
		</div>
	);
};
