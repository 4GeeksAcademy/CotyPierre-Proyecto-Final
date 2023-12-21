import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const SubCatalogo = () => {
    const { store, actions } = useContext(Context);

    const { option } = useParams();
    const [cirugia, setCirugia] = useState(false);
    const [curaciones, setCuraciones] = useState(false);
    const [procedimientos, setProcedimientos] = useState(false);
    const [varios, setVarios] = useState(false);

    const [images, setImages] = useState(null);

    useEffect(() => {
        let search = "";
        if (option === 'cirugia') {
            setCirugia(true);
            search = "surgery"
        } else if (option === 'curaciones') {
            search = "healing"
            setCuraciones(true);
        } else if (option === 'procedimientos') {
            search = "hospital procedure"
            setProcedimientos(true);
        } else if (option === 'varios') {
            search = "hospital"
            setVarios(true);
        }


        const fetchImages = async (search) => {
            try {
              const fetchedImages = await actions.getImagesHome(search);
              setImages(fetchedImages);
            } catch (error) {
              console.error("Error fetching images:", error);
            }
        };

        fetchImages(search);

    }, [option]);


    return (
        <div className="container d-flex gap-3 flex-wrap justify-content-center py-2">
            {cirugia && (
                <>
                    <Link to={"/procedimiento/0"} className="card p-0 m-0" style={{ width: '18rem' }}>
                    {images && (
					<img className="card-img-top img-card" src={images.results[0].urls.full} alt="Card image cap" />
				)}                        <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Cirugía Laparoscopica</h4>
                        </div>
                    </Link>
                    <Link to={"/procedimiento/1"} className="card p-0 m-0" style={{ width: '18rem' }}>
                    {images && (
					<img className="card-img-top img-card" src={images.results[1].urls.full} alt="Card image cap" />
				)}                        <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Cirugía Lavado quirúrgico abdominal</h4>
                        </div>
                    </Link>
                    <Link to={"/procedimiento/2"} className="card p-0 m-0" style={{ width: '18rem' }}>
                    {images && (
					<img className="card-img-top img-card" src={images.results[2].urls.full} alt="Card image cap" />
				)}                        <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Cirugía apendicectomía</h4>
                        </div>
                    </Link>
                </>
            )}
            {curaciones && (
                <>
                    <Link to={"/procedimiento/3"} className="card p-0 m-0" style={{ width: '18rem' }}>
                    {images && (
					<img className="card-img-top img-card" src={images.results[0].urls.full} alt="Card image cap" />
				)}                        <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Curación herida simple</h4>
                        </div>
                    </Link>
                    <Link to={"/procedimiento/4"} className="card p-0 m-0" style={{ width: '18rem' }}>
                    {images && (
					<img className="card-img-top img-card" src={images.results[1].urls.full} alt="Card image cap" />
				)}                        <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Curación herida quirúrgica</h4>
                        </div>
                    </Link>
                    <Link to={"/procedimiento/5"} className="card p-0 m-0" style={{ width: '18rem' }}>
                    {images && (
					<img className="card-img-top img-card" src={images.results[2].urls.full} alt="Card image cap" />
				)}                        <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Curación Ulcera por presión Grado 1</h4>
                        </div>
                    </Link>
                </>
            )}
            {procedimientos && (
                <>
                    <Link to={"/procedimiento/6"} className="card p-0 m-0" style={{ width: '18rem' }}>
                    {images && (
					<img className="card-img-top img-card" src={images.results[0].urls.full} alt="Card image cap" />
				)}                        <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Canalización Vía periféricas</h4>
                        </div>
                    </Link>
                    <Link to={"/procedimiento/7"} className="card p-0 m-0" style={{ width: '18rem' }}>
                    {images && (
					<img className="card-img-top img-card" src={images.results[1].urls.full} alt="Card image cap" />
				)}                        <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Canalización sonda vesical</h4>
                        </div>
                    </Link>
                    <Link to={"/procedimiento/8"} className="card p-0 m-0" style={{ width: '18rem' }}>
                    {images && (
					<img className="card-img-top img-card" src={images.results[2].urls.full} alt="Card image cap" />
				)}                        <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Canalización sonda naso-gástrica</h4>
                        </div>
                    </Link>
                </>
            )}
            {varios && (
                <>
                    <Link to={"/procedimiento/9"} className="card p-0 m-0" style={{ width: '18rem' }}>
                    {images && (
					<img className="card-img-top img-card" src={images.results[0].urls.full} alt="Card image cap" />
				)}                        <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Cambios de posición</h4>
                        </div>
                    </Link>
                    <Link to={"/procedimiento/10"} className="card p-0 m-0" style={{ width: '18rem' }}>
                    {images && (
					<img className="card-img-top img-card" src={images.results[1].urls.full} alt="Card image cap" />
				)}                        <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Alimentación por sonda</h4>
                        </div>
                    </Link>
                    <Link to={"/procedimiento/11"} className="card p-0 m-0" style={{ width: '18rem' }}>
                        {images && (
                            <img className="card-img-top img-card" src={images.results[2].urls.full} alt="Card image cap" />
                        )}                        
                            <div className="card-body d-flex align-items-end justify-content-center text-center">
                            <h4 className="card-title">Administración de medicamentos</h4>
                        </div>
                    </Link>
                </>
            )}
        </div>
    );
};
