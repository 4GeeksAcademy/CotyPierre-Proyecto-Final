import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const ListaProcedimiento = () => {
    const { store, actions } = useContext(Context);

    const [filter, setFilter] = useState("");

    const { theid } = useParams();

    let listOptions = [
        "Cirugía Laparoscopica",
        "Cirugía Lavado quirúrgico abdominal",
        "Cirugía apendicectomía",
        "Curación herida simple",
        "Curación herida quirúrgica",
        "Curación Ulcera por presión Grado 1",
        "Canalización Vía periféricas",
        "Canalización sonda vesical",
        "Canalización sonda naso-gástrica",
        "Cambios de posición",
        "Alimentación por sonda",
        "Administración de medicamentos",
    ];

    useEffect(() => {
        setFilter(listOptions[theid]);
        console.log(store.procedimientos);
    }
        , []);

    return (
        <div className="container d-flex gap-3 flex-wrap justify-content-center py-2">
            {store.procedimientos
                .filter((item) => item.subCategory == filter)
                .map((item) => (
                    <Link to={`/ver_procedimiento/${item.id}`} className="card p-0 m-0 text-dark text-center" style={{ width: '18rem', textDecoration: "none" }}>
                        <img style={{ height: "15rem", width: "auto" }} className="card-img-top" src={item.photo} alt="Sin imagen del procedimiento" />
                        <div class="card-body d-flex flex-column justify-content-between">
                            <h5 class="card-title">{item.name}</h5>
                            <p class="card-text text-truncate">{item.descripcion}</p>
                        </div>
                    </Link>
                ))}
        </div>
    );
};
