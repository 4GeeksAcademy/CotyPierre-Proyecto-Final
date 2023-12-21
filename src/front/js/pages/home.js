import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [images, setImages] = useState(null);

	useEffect(() => {
		const fetchImages = async () => {
		  try {
			const fetchedImages = await actions.getImagesHome("Enfermeria");
			setImages(fetchedImages);
		  } catch (error) {
			console.error("Error fetching images:", error);
		  }
		};
	
		fetchImages();
	  }, [actions]);

	return (
		<div className="container d-flex gap-3 flex-wrap justify-content-center py-2">
			<Link to={"/subcatalogo/cirugia"} className="card p-0 m-0 d-flex flex-column justify-content-between" style={{ width: '18rem' }}>
				{images && (
					<img className="card-img-top img-card" src={images.results[0].urls.full} alt="Card image cap" />
				)}
				<div className="card-body d-flex align-items-end justify-content-center text-center">
					<h4 className="card-title">Cirugías</h4>
				</div>
			</Link>
			<Link to={"/subcatalogo/curaciones"} className="card p-0 m-0" style={{ width: '18rem' }}>
				{images && (
					<img className="card-img-top img-card" src={images.results[1].urls.full} alt="Card image cap" />
				)}				<div className="card-body d-flex align-items-end justify-content-center text-center">
					<h4 className="card-title">Curaciones</h4>
				</div>
			</Link>
			<Link to={"/subcatalogo/procedimientos"} className="card p-0 m-0" style={{ width: '18rem' }}>
				{images && (
					<img className="card-img-top img-card" src={images.results[2].urls.full} alt="Card image cap" />
				)}				<div className="card-body d-flex align-items-end justify-content-center text-center">
					<h4 className="card-title">Procedimientos invasivos</h4>
				</div>
			</Link>
			<Link to={"/subcatalogo/varios"} className="card p-0 m-0" style={{ width: '18rem' }}>
				{images && (
					<img className="card-img-top img-card" src={images.results[3].urls.full} alt="Card image cap" />
				)}				
				<div className="card-body d-flex align-items-end justify-content-center text-center">
				<h4 className="card-title">Categorías varios</h4>
				</div>
			</Link>
		</div>
	);
};
