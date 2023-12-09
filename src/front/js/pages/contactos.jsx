import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Contactos = () => {
    const { store, actions } = useContext(Context);

    const [filter, setFilter] = useState("");

    const { theid } = useParams();

    return (
        <div className="container d-flex gap-3 flex-wrap justify-content-center py-2">
            {store.usuario
                .filter((item) => item.rol == "Enfermero" && item.is_active)
                .map((item) => (
                    <Link to={`/ver_contacto/${item.id}`} className="card p-0 m-0 text-dark text-center" style={{ width: '18rem', textDecoration: "none" }}>
                        <img style={{ height: "15rem", width: "auto" }} className="card-img-top" src={item.photo} alt="Sin imagen del procedimiento" />
                        <div class="card-body d-flex flex-column justify-content-between">
                            <h4 class="card-title text-primary">{item.name}</h4>
                            <h5 class="card-title">{item.professional_grade}</h5>
                            <p class="card-text text-truncate">{item.workplace}</p>
                        </div>
                    </Link>
                ))}
        </div>
    );
};
