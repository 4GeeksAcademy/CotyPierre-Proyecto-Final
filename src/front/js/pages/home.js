import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container d-flex gap-3 flex-wrap justify-content-center py-2">
			<Link to={"/subcatalogo/cirugia"} className="card p-0 m-0 d-flex flex-column justify-content-between" style={{ width: '18rem' }}>
				<img className="card-img-top" src="https://cnnespanol.cnn.com/wp-content/uploads/2023/01/230110214153-ranking-operaciones-pba-full-169.jpeg?quality=100&strip=info" alt="Card image cap" />
				<div className="card-body d-flex align-items-end justify-content-center text-center">
					<h4 className="card-title">Cirugías</h4>
				</div>
			</Link>
			<Link to={"/subcatalogo/curaciones"} className="card p-0 m-0" style={{ width: '18rem' }}>
				<img className="card-img-top" src="https://www.totalcare.com.co/fotospages/mac_curacion_de_heridas_1556920290.png" alt="Card image cap" />
				<div className="card-body d-flex align-items-end justify-content-center text-center">
					<h4 className="card-title">Curaciones</h4>
				</div>
			</Link>
			<Link to={"/subcatalogo/procedimientos"} className="card p-0 m-0" style={{ width: '18rem' }}>
				<img className="card-img-top" src="https://statics-diariomedico.uecdn.es/cms/styles/landscape_xl/azblob/2017/11/24/la-consulta-1.jpg.webp?itok=PD4EMzja" alt="Card image cap" />
				<div className="card-body d-flex align-items-end justify-content-center text-center">
					<h4 className="card-title">Procedimientos invasivos</h4>
				</div>
			</Link>
			<Link to={"/subcatalogo/varios"} className="card p-0 m-0" style={{ width: '18rem' }}>
				<img className="card-img-top" src="https://cardiohealth.com.mx/wp-content/uploads/2018/02/img-gallery-20.jpg" alt="Card image cap" />
				<div className="card-body d-flex align-items-end justify-content-center text-center">
					<h4 className="card-title">Categorías varios</h4>
				</div>
			</Link>
		</div>
	);
};
