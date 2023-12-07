import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const VerProcedimiento = () => {
    const { store, actions } = useContext(Context);
    const { theid } = useParams();

    const [idProcedimiento, setIdProcedimiento] = useState(theid);
    const [procedimiento, setProcedimiento] = useState(null);
    const [filter, setFilter] = useState("");

    const [name, setName] = useState("");
    const [video, setVideo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [photo, setPhoto] = useState(null);
    const [enlace, setEnlace] = useState("");
    const [archivo, setArchivo] = useState(null);
    const [category, setCategory] = useState("");
    const [subCategory, setSubcategory] = useState("");

    const descargarArchivo = async (id) => {
        const nuevaVentana = window.open(actions.apiDownloadArchivo(id));
    }

    useEffect(() => {
        const findProc = store.procedimientos.filter(item => item.id === Number(theid))[0];
        setName(findProc.name);
        setVideo(findProc.video);
        setPhoto(findProc.photo);
        setDescripcion(findProc.descripcion);
        setEnlace(findProc.link);
        setCategory(findProc.category);
        setSubcategory(findProc.subCategory);
        setArchivo(findProc.archive);
    }, []);

    return (
        <div className="container d-flex gap-3 flex-wrap justify-content-center py-2 w-100">
            <h1 className="display-3">{name}</h1>
            <div className="row w-100">
                <div className="col-md-4 col-sm-12 my-1">
                    <img className="rounded" style={{ maxWidth: "100%", height: "auto" }} src={photo} alt="" />
                </div>
                <div className="col-md-8 col-sm-12 my-1">
                    <h3>{category}</h3>
                    <h4>{subCategory}</h4>
                    <hr />
                    <p>{descripcion}</p>
                    {enlace != null && enlace != "" && (
                        <a href={enlace}>Enlace del procedimiento</a>
                    )}
                    {archivo && (
                        <>
                            <hr />
                            <button onClick={() => descargarArchivo(theid)} className="btn btn-primary">Descargar Archivo <i class="fa-solid fa-download"></i></button>
                        </>
                    )}
                </div>
            </div>
            {video != null && video != "" && (
                <div className="d-flex flex-column align-items-center w-100 text-center">
                    <h3 className="display-5">Video del procedimiento</h3>
                    <a href={video} target="_blank">¿No puedes ver el vídeo?</a>
                    <iframe width="840" height="472" src={video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            )}
        </div>
    );
};
